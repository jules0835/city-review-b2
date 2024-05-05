import { NextResponse } from "next/server"
import { mwdb } from "@/api/mwdb"
import { newRating } from "@/db/crud/ratingCrud"
import { getPublicUserInfos } from "@/db/crud/userCrud"

export async function POST(request, { params }) {
  await mwdb()
  const { locationId } = params
  const data = await request.json()

  let newRatingRes = await newRating(
    locationId,
    data.userId,
    data.rating,
    data.comment
  )
  newRatingRes = JSON.parse(JSON.stringify(newRatingRes))
  const userInfos = await getPublicUserInfos(data.userId)
  newRatingRes.author = {}
  newRatingRes.author.username = userInfos.username
  newRatingRes.author.profilePic = userInfos.profilePic

  return NextResponse.json(
    {
      newRating: newRatingRes,
    },
    { status: 201 }
  )
}
