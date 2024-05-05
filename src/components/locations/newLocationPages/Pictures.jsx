/* eslint-disable max-lines-per-function */
"use client"

import axios from "axios"
import Image from "next/image"
import { FileUpload, Close } from "@mui/icons-material"
import { useTranslations } from "next-intl"

const Pictures = ({ formik }) => {
  const t = useTranslations("NewLocation.pictures")
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", e.target.files[0])

    try {
      const response = await axios.post("/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      formik.setFieldValue("pictures", [
        ...formik.values.pictures,
        response.data.imagePath,
      ])
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error uploading image:", error)
    }
  }
  const removeImage = (index) => () => {
    const newImages = formik.values.pictures.filter((_, i) => i !== index)
    formik.setFieldValue("pictures", newImages)
  }

  return (
    <div className="flex flex-col items-center border border-gray-200 px-10 py-20 rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      {formik.values.pictures.length < 5 && (
        <div>
          <div
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="cursor-pointer mb-4 p-5 rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <FileUpload fontSize="large" />
          </div>
          <input
            type="file"
            name="file"
            onChange={handleSubmit}
            className="hidden"
            accept="image/*"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {formik.values.pictures.map((image, index) => (
          <div key={index} className="relative">
            <div className="w-40 h-40">
              <Image
                src={`/images/locations/${image}`}
                alt="image"
                className="w-full h-full object-cover rounded-lg relative"
                fill
              />
            </div>
            <button
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
              onClick={removeImage(index)}
              type="button"
            >
              <Close fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pictures
