import { Schema, z } from "zod"

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
};

export type ActionState<TInput, TOuput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOuput;
};

export const CreateSafeAction = <TInput, TOuput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOuput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOuput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
      }
    }

    return handler(validationResult.data)
  }
};