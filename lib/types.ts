import { z } from "zod";

const InputSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, { message: "The password is too short" })
    .max(100),
});

type InputSchemaType = z.infer<typeof InputSchema>;

export { InputSchema };
export type { InputSchemaType };
