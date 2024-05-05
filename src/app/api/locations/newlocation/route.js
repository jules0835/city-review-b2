/* eslint-disable no-underscore-dangle */
import { NextResponse } from "next/server"
import { mwdb } from "@/api/mwdb"
import { newLocation } from "@/db/crud/locationCrud"

export async function POST(request) {
  await mwdb()
  const data = await request.json()
  const location = await newLocation(data)

  return NextResponse.json({
    message: "Location created",
    locationId: location._id,
  })
}
