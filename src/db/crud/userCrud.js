import { UserModel } from "@/db/models/UserModel"

export const existingUsername = async (username) => {
  const existingUsernameRes = await UserModel.findOne({ username })

  return Boolean(existingUsernameRes)
}

export const existingEmail = async (email) => {
  const existingEmailRes = await UserModel.findOne({ email })

  return Boolean(existingEmailRes)
}

export const findUser = async (query) => {
  const user = await UserModel.findOne(query)

  return user
}

export const findUserSignUp = async (email) => {
  const user = await UserModel.findOne({ email })

  return user
}

export const createUser = async (user) => await UserModel.create(user)

export const getPublicUserInfos = async (userId) => {
  const userInfos = await UserModel.findById(userId, {
    username: 1,
    profilePic: 1,
    isAdmin: 1,
    isModerator: 1,
  })

  userInfos.profilePic ||= "default-pp.jpg"

  return userInfos
}
