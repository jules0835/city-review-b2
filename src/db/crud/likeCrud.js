import { LikeModel } from "@/db/models/LikeModel"
import { mwdb } from "@/api/mwdb"

export const newLike = async (locationId, userId) => {
  await mwdb()

  if (await findLike(locationId, userId)) {
    return "already_exists"
  }

  return await LikeModel.create({ locationId, userId })
}

export const findLike = async (locationId, userId) => {
  await mwdb()

  try {
    return await LikeModel.findOne({
      locationId,
      userId,
    })
  } catch (error) {
    return null
  }
}

export const findLikes = async (locationId) => {
  await mwdb()

  try {
    return await LikeModel.find({
      locationId,
    })
  } catch (error) {
    return null
  }
}

export const deleteLike = async (locationId, userId) => {
  await mwdb()

  if (!findLike(locationId, userId)) {
    return "does_not_exist"
  }

  try {
    return await LikeModel.deleteOne({
      locationId,
      userId,
    })
  } catch (error) {
    return null
  }
}

export const countLikes = async (locationId) => {
  await mwdb()

  try {
    return await LikeModel.countDocuments({
      locationId,
    })
  } catch (error) {
    return null
  }
}
