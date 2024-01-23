"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

interface SuscriptionButtonProps {
  isPro: boolean
}

export const SuscriptionButton = ({
  isPro
}: SuscriptionButtonProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = UseAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error)
    }
  });

  const onClick = () => {
    if (isPro) {
      execute({})
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={onClick}
    >
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  )
}