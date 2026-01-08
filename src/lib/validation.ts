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

export const serviceRequestSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z
    .string()
    .min(7)
    .max(30)
    .regex(/^\+?[0-9\s().-]{7,}$/, "Invalid phone number"),
  service: z.string().min(2).max(120),
  otherService: z.string().max(500).optional().default(""),
  zipcode: z.string().min(3).max(20),
  referralSource: z.string().min(2).max(120),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  message: z.string().min(10).max(2000),
});
