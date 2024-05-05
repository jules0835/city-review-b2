/* eslint-disable no-underscore-dangle */
import { NextResponse } from "next/server"
import { mwdb } from "@/api/mwdb"
import { updateLocation, deleteLocation } from "@/db/crud/locationCrud"

export async function POST(request) {
  await mwdb()
  const data = await request.json()
  const locationId = data._id
  const location = await updateLocation(locationId, data)

  if (location) {
    return NextResponse.json(
      { message: "Location updated", location },
      { status: 200 }
    )
  }

  return NextResponse.json({ error: "notfound" }, { status: 404 })
}

export async function DELETE(request, { params }) {
  await mwdb()
  const { locationId } = params

  await deleteLocation(locationId)

  return NextResponse.json({ message: "Location deleted" }, { status: 200 })
}
