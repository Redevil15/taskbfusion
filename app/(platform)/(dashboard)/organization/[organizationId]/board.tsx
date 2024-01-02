import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

interface BoardProps {
  title: string;
  id: string
}

export const Board = ({
  title,
  id
}: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)

  return (
    <form
      action={deleteBoardWithId}
      className="flex item-center gap-x-2"
    >
      <p>
        Board name: {title}
      </p>
      <Button
        variant="destructive"
        size="sm"

        type="submit"
      >
        Delete
      </Button>
    </form>
  )
}

