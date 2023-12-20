import { OrganizationSwitcher, auth } from "@clerk/nextjs";

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  return (
    <div>
      Organization page
    </div>
  )
};

export default OrganizationIdPage