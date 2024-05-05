import mongoose from "mongoose"
import { likeSchema } from "@/db/schemas/LikeSchema"

export const LikeModel =
  mongoose.models.Like || mongoose.model("Like", likeSchema)
