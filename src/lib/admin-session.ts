export const ADMIN_SESSION_COOKIE = "bh_admin_session";

type AdminSessionPayload = {
  iat: number;
};

function toBase64Url(base64: string) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(base64url: string) {
  const padded = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  return `${padded}${"=".repeat(padLength)}`;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function utf8ToBytes(value: string) {
  return new TextEncoder().encode(value);
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}

async function signHmacSha256(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    utf8ToBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, utf8ToBytes(message));
  return new Uint8Array(signature);
}

export async function createAdminSessionToken(options: {
  secret: string;
  issuedAtSeconds?: number;
}) {
  const issuedAtSeconds =
    options.issuedAtSeconds ?? Math.floor(Date.now() / 1000);

  const payload: AdminSessionPayload = { iat: issuedAtSeconds };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = toBase64Url(bytesToBase64(utf8ToBytes(payloadJson)));

  const signatureBytes = await signHmacSha256(options.secret, payloadB64);
  const signatureB64 = toBase64Url(bytesToBase64(signatureBytes));

  return `${payloadB64}.${signatureB64}`;
}

export async function verifyAdminSessionToken(options: {
  token: string | undefined;
  secret: string;
  maxAgeSeconds: number;
  nowSeconds?: number;
}) {
  if (!options.token) return false;

  const [payloadB64, signatureB64] = options.token.split(".");
  if (!payloadB64 || !signatureB64) return false;

  let payload: AdminSessionPayload;
  try {
    const payloadJson = new TextDecoder().decode(
      base64ToBytes(fromBase64Url(payloadB64)),
    );
    payload = JSON.parse(payloadJson) as AdminSessionPayload;
  } catch {
    return false;
  }

  if (!payload?.iat || typeof payload.iat !== "number") return false;

  const nowSeconds = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  if (payload.iat > nowSeconds + 60) return false;
  if (nowSeconds - payload.iat > options.maxAgeSeconds) return false;

  const expectedSignatureBytes = await signHmacSha256(options.secret, payloadB64);
  const providedSignatureBytes = base64ToBytes(fromBase64Url(signatureB64));

  return constantTimeEqual(expectedSignatureBytes, providedSignatureBytes);
}

export function getAdminSessionConfig() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;

  const maxAgeSeconds = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS ?? "0");
  const resolvedMaxAgeSeconds =
    Number.isFinite(maxAgeSeconds) && maxAgeSeconds > 0
      ? maxAgeSeconds
      : 60 * 60 * 24 * 30;

  return {
    secret,
    password,
    maxAgeSeconds: resolvedMaxAgeSeconds,
  };
}
