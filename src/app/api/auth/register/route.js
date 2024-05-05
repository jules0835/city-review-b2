import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { mwdb } from "@/api/mwdb"
import {
  findUserSignUp,
  existingUsername,
  createUser,
} from "@/db/crud/userCrud"

// eslint-disable-next-line max-lines-per-function
export async function POST(req) {
  await mwdb()

  const requestBody = await req.json()
  const {
    firstName,
    lastName,
    username,
    country,
    city,
    phone,
    email,
    password,
    zipCode,
  } = requestBody

  if (
    !firstName ||
    !lastName ||
    !username ||
    !country ||
    !city ||
    !phone ||
    !email ||
    !password ||
    !zipCode
  ) {
    return NextResponse.json(
      { error: "Please fill in all fields" },
      { status: 400 }
    )
  }

  try {
    const existingUser =
      (await findUserSignUp(email)) || (await existingUsername(username))

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists with this email or username",
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    await createUser({
      firstName,
      lastName,
      username,
      country,
      city,
      phone,
      email,
      password: hashedPassword,
      zipCode,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },

      { status: 500 }
    )
  }
}
