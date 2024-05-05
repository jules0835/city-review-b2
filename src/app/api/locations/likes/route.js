import { NextResponse } from "next/server"
import { newLike, deleteLike } from "@/db/crud/likeCrud"

export async function POST(request) {
  const { locationId, userId } = await request.json()

  if (!locationId || !userId) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    const like = await newLike(locationId, userId)

    if (like === "already_exists") {
      return NextResponse.json(
        { success: false, message: "Like already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE(request) {
  const { locationId, userId } = await request.json()

  if (!locationId || !userId) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    await deleteLike(locationId, userId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
