/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-binary-expression */
"use client"
import Image from "next/image"
import { useQueryState } from "nuqs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const PATH_IMAGES = `/images/locations/`
const ImageDisplay = ({ locationImages, returnUrl }) => {
  const router = useRouter()
  const [imageId] = useQueryState("imageId")

  useEffect(() => {
    if (
      isNaN(imageId) ||
      !imageId === undefined ||
      imageId >= locationImages.length
    ) {
      router.push(returnUrl)
    }
  }, [imageId, locationImages])

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={PATH_IMAGES + locationImages[imageId]}
          alt="location image"
          width={800}
          height={600}
        />
      </div>
    </div>
  )
}

export default ImageDisplay
