"use server"

import { db } from "@/lib/db";

export async function create(formData: FormData) {
  const title = formData.get("title") as string;

  await db.board.create({
    data: {
      title
    }
  })

}