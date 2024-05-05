/* eslint-disable max-lines-per-function */
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ImageSearch,
} from "@mui/icons-material"
import clsx from "clsx"
import Link from "next/link"

const BigImagesCarousel = ({ images, path, divStyles, locationId }) => {
  const [index, setIndex] = useState(0)
  const nextImage = (event) => {
    event.preventDefault()
    setIndex((index + 1) % images.length)
  }
  const previousImage = (event) => {
    event.preventDefault()
    setIndex((index - 1 + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative">
        <div className={divStyles}>
          <Link href={`/locations/${locationId}/image?imageId=${index}`}>
            <Image
              src={`${path}${images[index]}`}
              alt="image"
              className="rounded-xl object-cover"
              fill
            />
          </Link>
        </div>

        {images.length > 1 && (
          <div className="absolute top-0 left-0 p-2 flex w-full h-full justify-between items-center opacity-0 hover:opacity-100">
            <button
              onClick={previousImage}
              className="bg-white bg-opacity-60 text-black p-1 rounded-full hover:bg-opacity-90"
            >
              <ArrowCircleLeft />
            </button>
            <div className="text-2xl bg-white text-black p-2 rounded-full">
              <Link href={`/locations/${locationId}/image?imageId=${index}`}>
                <ImageSearch />
              </Link>
            </div>
            <button
              onClick={nextImage}
              className="bg-white bg-opacity-60 text-black p-1 rounded-full hover:bg-opacity-90"
            >
              <ArrowCircleRight />
            </button>
          </div>
        )}
      </div>
      <div className="imageSelector flex space-x-2 mt-3 justify-center">
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={"w-28 h-28 relative cursor-pointer rounded-xl"}
          >
            <Image
              src={`${path}${image}`}
              alt="image"
              className={clsx(
                "object-cover",
                i === index ? "border-2 border-blue-500" : ""
              )}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BigImagesCarousel
