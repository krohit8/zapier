import { z } from "zod"

export const singUpSchema= z.object({
    password: z.string().min(6),
    username: z.string().min(6),
    name: z.string()
})
export const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const zapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
     actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
     }))
})