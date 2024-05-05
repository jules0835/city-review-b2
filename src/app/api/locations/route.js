import { NextResponse } from "next/server"
import { getLocationsWithQuery } from "@/db/crud/locationCrud"

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const limit = searchParams.get("limit")
  const page = searchParams.get("page")
  const userId = searchParams.get("userId")
  const searchOptions = {}

  if (searchParams.get("name")) {
    searchOptions.name = searchParams.get("name")
  }

  if (searchParams.get("structure")) {
    searchOptions.structure = searchParams.get("structure")
  }

  const index = page ? (page - 1) * limit : 0
  const locations = await getLocationsWithQuery(
    limit,
    index,
    userId,
    searchOptions
  )

  return NextResponse.json({ locations })
}
