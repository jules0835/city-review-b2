"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material"
import Link from "next/link"

const ImagesCarousel = ({ images, path, divStyles, link }) => {
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
    <div className="relative">
      <Link href={link}>
        <div className={divStyles}>
          <Image
            src={`${path}${images[index]}`}
            alt="image"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        {images.length > 1 && (
          <div className="absolute top-0 left-0 p-2 flex w-full h-full justify-between items-center opacity-0 hover:opacity-100">
            <button
              onClick={previousImage}
              className="bg-white bg-opacity-60 text-black p-1 rounded-full hover:bg-opacity-90"
            >
              <ArrowCircleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white bg-opacity-60 text-black p-1 rounded-full hover:bg-opacity-90"
            >
              <ArrowCircleRight />
            </button>
          </div>
        )}
      </Link>
    </div>
  )
}

export default ImagesCarousel
