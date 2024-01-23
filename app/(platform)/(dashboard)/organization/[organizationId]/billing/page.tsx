import { checkSuscription } from "@/lib/suscription";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { SuscriptionButton } from "./_components/suscription-button";

const BillingPage = async () => {
  const isPro = await checkSuscription();

  return (
    <div className="w-full">
      <Info
        isPro={isPro}
      />
      <Separator className="my-2" />
      <SuscriptionButton
        isPro={isPro}
      />
    </div>
  )
}

export default BillingPage;