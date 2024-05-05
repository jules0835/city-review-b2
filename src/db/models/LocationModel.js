import mongoose from "mongoose"
import { locationSchema } from "@/db/schemas/locationSchema"

export const LocationModel =
  mongoose.models.Location || mongoose.model("Location", locationSchema)
