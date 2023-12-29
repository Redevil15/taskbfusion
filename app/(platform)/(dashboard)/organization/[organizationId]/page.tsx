import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";


const OrganizationIdPage = () => {


  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit" className="ml-1">
          Submit
        </Button>
      </form>
    </div>
  )
};

export default OrganizationIdPage