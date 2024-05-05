/* eslint-disable no-await-in-loop */
/* eslint-disable max-params */
import { RatingModel } from "@/db/models/RatingModel"
import { mwdb } from "@/api/mwdb"
import { getPublicUserInfos } from "@/db/crud/userCrud"

export const newRating = async (locationId, userId, rating, comment) => {
  await mwdb()

  return await RatingModel.create({ locationId, userId, rating, comment })
}

export const findRating = async (locationId, userId) => {
  await mwdb()

  try {
    return await RatingModel.findOne({
      locationId,
      userId,
    })
  } catch (error) {
    return null
  }
}

export const findRatings = async (locationId) => {
  await mwdb()

  try {
    return await RatingModel.find({
      locationId,
    })
  } catch (error) {
    return null
  }
}

export const deleteRating = async (RatingId) => {
  await mwdb()

  try {
    return await RatingModel.deleteOne({
      _id: RatingId,
    })
  } catch (error) {
    return null
  }
}

export const getAverageRating = async (locationId, noCount) => {
  await mwdb()

  try {
    const ratings = await RatingModel.find({
      locationId,
    })

    if (ratings.length === 0) {
      return null
    }

    let totalRating = 0
    for (let i = 0; i < ratings.length; i += 1) {
      totalRating += ratings[i].rating
    }
    const averageRating = totalRating / ratings.length

    if (noCount) {
      return averageRating
    }

    return {
      average: averageRating,
      count: ratings.length,
    }
  } catch (error) {
    return null
  }
}

export const commentsCount = async (locationId) => {
  await mwdb()

  try {
    return await RatingModel.countDocuments({
      locationId,
      comment: { $exists: true },
    })
  } catch (error) {
    return null
  }
}

export const getComments = async (locationId) => {
  await mwdb()

  try {
    let comments = await RatingModel.find({
      locationId,
    }).sort({ createdAt: -1 })

    comments = JSON.parse(JSON.stringify(comments))

    for (let i = 0; i < comments.length; i += 1) {
      const user = await getPublicUserInfos(comments[i].userId)
      comments[i].author = {}
      comments[i].author.username = user.username
      comments[i].author.profilePic = user.profilePic || "default-pp.jpg"
    }

    return comments
  } catch (error) {
    return null
  }
}
