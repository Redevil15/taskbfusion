"use client"

import { Button } from "@/components/ui/button"
import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client"
import { FormInput } from "@/components/form/form-input";

interface BoardTitleFormProps {
  data: Board;
};

export const BoardTitleForm = ({
  data,
}: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    console.log('submitted', title)
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form ref={formRef} className="flex items-center gap-x-2" action={onSubmit}>
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }
  return (
    <Button
      onClick={enableEditing}
      className="text-lg font-bold h-auto w-auto p-1 px-2"
      variant="transparent"
    >
      {data.title}
    </Button>
  )
}