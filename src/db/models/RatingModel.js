import mongoose from "mongoose"
import { ratingSchema } from "@/db/schemas/RatingSchema"

export const RatingModel =
  mongoose.models.Rating || mongoose.model("Rating", ratingSchema)
