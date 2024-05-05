import { NextResponse } from "next/server"
import { existingUsername } from "@/db/crud/userCrud"
import { mwdb } from "@/api/mwdb"

export async function GET(request) {
  await mwdb()
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "No username provided" })
  }

  if (await existingUsername(username)) {
    return NextResponse.json({ usernameTaken: true })
  }

  return NextResponse.json({ usernameTaken: false })
}
