import { auth } from "@clerk/nextjs";
import { db } from "./db";

const DAY_IN_MS =  84_400_000;

export const checkSuscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false
  }

  const orgSuscription = await db.orgSuscription.findUnique({
    where: {
      orgId
    },
    select: {
      stripeSuscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true
    },
  });

  if (!orgSuscription) {
    return false
  }

  const isValid = 
    orgSuscription.stripePriceId &&
    orgSuscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  
  return !!isValid; 
}