import { z } from "zod";

export const providerRegistrationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z
    .string()
    .min(7)
    .max(30)
    .regex(/^\+?[0-9\s().-]{7,}$/, "Invalid phone number"),
  city: z.string().min(2).max(80),
  services: z.array(z.string()).min(1).max(8),
  availability: z.string().max(500).optional().default(""),
});
