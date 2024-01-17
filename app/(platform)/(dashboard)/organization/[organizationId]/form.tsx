"use client"

import { createBoard } from "@/actions/create-board"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { UseAction } from "@/hooks/use-action"
import { FormInput } from "@/components/form/form-input"

export const Form = () => {
  const { execute, fieldErrors } = UseAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS")
    },
    onError: (error) => {
      console.log(error, "ERROR")
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    console.log({ title })

    execute({ title });
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          label="Board title"
          id="title"
          errors={fieldErrors}
        />
      </div>

      <Button type="submit" className="ml-1">
        Submit
      </Button>
    </form>
  )
}
