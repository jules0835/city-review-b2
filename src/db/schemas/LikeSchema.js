import { Schema } from "mongoose"

export const likeSchema = new Schema({
  locationId: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

likeSchema.index({ locationId: 1, userId: 1 }, { unique: true })
