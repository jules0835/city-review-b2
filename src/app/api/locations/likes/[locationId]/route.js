import { NextResponse } from "next/server"
import { findLikes } from "@/db/crud/likeCrud"

export async function GET({ params }) {
  const { locationId } = params

  if (!locationId) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    const likes = await findLikes(locationId)

    return NextResponse.json({ success: true, likes })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
