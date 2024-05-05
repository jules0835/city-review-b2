import { Schema } from "mongoose"

export const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  locationId: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
})
