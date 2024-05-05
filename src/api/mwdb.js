import mongoose from "mongoose"

export const mwdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    /* Empty */
  }
}
