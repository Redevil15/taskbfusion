import { Info } from "./_components/info";
import { useOrganization } from "@clerk/nextjs";

const OrganizationIdPage = async () => {

  return (
    <div className="w-full mb-20">
      <Info />
    </div>
  )
};

export default OrganizationIdPage