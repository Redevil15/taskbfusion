import { z } from "zod"

export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(3, {
    message: "Minimum length of 3 letters is required"
  }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required"
  }),
});