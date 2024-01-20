"use client"

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { UseAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const ListContainer = ({
  data,
  boardId
}: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  // Use action for order lists
  const { execute: executeUpdateListOrder } = UseAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered.")
    },
    onError: (error) => {
      toast.error(error)
    }
  });

  // Use actioon for order cards
  const { execute: executeUpdateCardOrder } = UseAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered.")
    },
    onError: (error) => {
      toast.error(error)
    }
  });



  useEffect(() => {
    setOrderedData(data)
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // If droped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    };

    // User moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData]

      // Source and destination list
      const sourceList = newOrderedData.find(list => list.id === source.droppableId);
      const destList = newOrderedData.find(list => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards
        });
        // Moving the card to another list
      } else {
        // Remove card from teh source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add the card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // Reorder cards
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Update the order for each card in the destinationList
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards
        })
      }
    }
  };


  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="lists"
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-fulll"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              )
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>

    </DragDropContext>
  )
}