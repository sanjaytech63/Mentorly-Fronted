import { z } from "zod";

const contactSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters long")
        .max(100, "Full name must not exceed 100 characters"),
    email: z.string().email("Invalid email address"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters long")
        .max(1000, "Message must not exceed 1000 characters"),
});

export default contactSchema;