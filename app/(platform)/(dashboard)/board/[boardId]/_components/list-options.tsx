"use client"

import { List } from "@prisma/client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface ListOptionsProps {
  data: List,
  onAddCard: () => void
}

export const ListOptions = ({
  data,
  onAddCard
}: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}