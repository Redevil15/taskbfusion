"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { forwardRef } from "react"

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
}, ref) => {

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        variant="ghost"
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  )
})

CardForm.displayName = "CardForm"