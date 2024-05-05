/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import { Schema } from "mongoose"

export const locationSchema = new Schema({
  name: {
    type: String,
    required: function () {
      return this.isActive === true
    },
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  lastUpdate: { type: Date, default: Date.now },
  description: {
    type: String,
    required: function () {
      return this.isActive === true
    },
  },
  pictures: [
    {
      type: String,
      required: function () {
        return this.isActive === true
      },
    },
  ],
  amenities: [
    {
      type: String,
      required: function () {
        return this.isActive === true
      },
    },
  ],
  priceRange: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    required: function () {
      return this.isActive === true && this.isFree === false
    },
  },
  price: {
    type: Number,
    required: function () {
      return this.isActive === true && this.isFree === false
    },
  },
  isExactPrice: {
    type: Boolean,
    required: function () {
      return this.isActive === true && this.isFree === false
    },
  },
  isFree: {
    type: Boolean,
    required: function () {
      return this.isActive === true
    },
  },
  structure: {
    type: String,
    required: function () {
      return this.isActive === true
    },
    enum: ["Park", "Bar", "Restaurant", "Museum"],
  },
  address: {
    street: {
      type: String,
      default: "",
      required: function () {
        return this.isActive === true
      },
    },
    city: {
      type: String,
      default: "",
      required: function () {
        return this.isActive === true
      },
    },
    zipcode: {
      type: String,
      default: "",
      required: function () {
        return this.isActive === true
      },
    },
    country: {
      type: String,
      default: "",
      required: function () {
        return this.isActive === true
      },
    },
  },
  type: {
    typeName: {
      type: String,
      required: function () {
        return this.isActive === true
      },
    },
    artisticPeriod: {
      type: String,
      required: function () {
        return this.type === "museum"
      },
    },
    artType: {
      type: String,
      required: function () {
        return this.type === "museum"
      },
    },
    isPublic: {
      type: Boolean,
      required: function () {
        return this.type === "park"
      },
    },
    stars: {
      type: Number,
      required: function () {
        return this.type === "restaurant"
      },
    },
  },
})
