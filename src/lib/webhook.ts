const WEBHOOK_URL =
  "https://n8n.jhowl.com/webhook/2a55d28f-0635-46b5-878b-0b64f388d363";

type WebhookStatus = "success" | "error";

export async function sendWebhook(payload: {
  type: string;
  status: WebhookStatus;
  error?: string | null;
  data: Record<string, unknown>;
}) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://bhcooperative.com",
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (error) {
    console.error("Webhook delivery failed", error);
    return false;
  }
}
