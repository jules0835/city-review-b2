import { NextResponse } from "next/server"
import { mwdb } from "@/api/mwdb"
import { deleteRating } from "@/db/crud/ratingCrud"

export async function DELETE(request, { params }) {
  await mwdb()
  const { ratingId } = params

  try {
    await deleteRating(ratingId)

    return NextResponse.json({ message: "success" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }
}
