/* eslint-disable max-depth */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */
import { LocationModel } from "@/db/models/LocationModel"
import { mwdb } from "@/api/mwdb"
import { findLike, countLikes } from "@/db/crud/likeCrud"
import { getPublicUserInfos } from "@/db/crud/userCrud"
import {
  commentsCount,
  getAverageRating,
  getComments,
} from "@/db/crud/ratingCrud"

export const newLocation = async (location) =>
  await LocationModel.create(location)

export const findLocation = async (query, userId) => {
  await mwdb()

  try {
    let location = await LocationModel.findOne(query)
    location = JSON.parse(JSON.stringify(location))

    location.author = await getPublicUserInfos(location.authorId)
    location.likesCount = await countLikes(location._id)
    location.commentsCount = await commentsCount(location._id)
    location.rating = await getAverageRating(location._id)
    location.comments = (await getComments(location._id, 6, 0)) || []

    if (userId) {
      const like = await findLike(location._id, userId)

      if (like) {
        location.isLikedByUser = true
      }
    }

    return location
  } catch (error) {
    return null
  }
}

export const findLocations = async () => {
  await mwdb()

  return await LocationModel.find()
}

export const updateLocation = async (locationId, location) => {
  await mwdb()

  try {
    return await LocationModel.findByIdAndUpdate(locationId, location)
  } catch (error) {
    return null
  }
}

export const getLocationsWithQuery = async (
  limit,
  index,
  userId,
  searchOptions
) => {
  await mwdb()
  let moreIsAvailable = true

  try {
    let locations = await LocationModel.find({
      name: searchOptions?.name
        ? { $regex: searchOptions.name, $options: "i" }
        : { $exists: true },
      structure: searchOptions?.structure
        ? searchOptions.structure
        : { $exists: true },
      "type.typeName": searchOptions?.type
        ? searchOptions.type
        : { $exists: true },
      isFree: searchOptions?.free ? true : { $exists: true },
      "address.country": searchOptions?.country
        ? searchOptions.country
        : { $exists: true },
      "address.city": searchOptions?.city
        ? searchOptions.city
        : { $exists: true },
      isActive: true,
    })
      .sort({ _id: -1 })
      .limit(limit || 20)
      .skip(index || 0)

    locations = JSON.parse(JSON.stringify(locations))

    if (userId) {
      for (let i = 0; i < locations.length; i += 1) {
        const location = locations[i]
        const like = await findLike(location._id, userId)

        if (like) {
          const { ...rest } = location
          const updatedLocation = { ...rest, isLikedByUser: true }
          locations[i] = updatedLocation
        }
      }
    }

    for (let i = 0; i < locations.length; i += 1) {
      const location = locations[i]
      location.rating = {}
      const rating = await getAverageRating(location._id)
      location.averageRating = rating ? rating.average : 0
    }

    if (locations.length < limit) {
      moreIsAvailable = false
    }

    return { locations, moreIsAvailable }
  } catch (error) {
    return null
  }
}

export const deleteLocation = async (locationId) => {
  await mwdb()

  return await LocationModel.findByIdAndDelete(locationId)
}

export const getUserLocations = async (userId) => {
  await mwdb()

  try {
    let userLocations = await LocationModel.find({ authorId: userId }).sort({
      _id: -1,
    })
    userLocations = JSON.parse(JSON.stringify(userLocations))

    return userLocations
  } catch (error) {
    return null
  }
}

export const getUserLocationsLiked = async (userId) => {
  await mwdb()
  let locations = await LocationModel.find({ isActive: true })
  const userLikedLocations = []

  locations = JSON.parse(JSON.stringify(locations))

  for (let i = 0; i < locations.length; i += 1) {
    const location = locations[i]
    const like = await findLike(location._id, userId)

    if (like) {
      userLikedLocations.push(location)
    }
  }

  return userLikedLocations
}
