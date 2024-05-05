/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines-per-function */
"use client"
import { createContext, useContext, useEffect } from "react"
import { useFormik } from "formik"
import { validationSchemaLocation } from "@/constants"
import axios from "axios"
import { useRouter } from "next/navigation"

const LocationFormContext = createContext()
const LocationFormProvider = ({ children, location }) => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      address: {
        street: "",
        city: "",
        zipcode: "",
        country: "",
      },
      structure: "",
      type: {
        typeName: "",
        artisticPeriod: "",
        artType: "",
        isPublic: false,
        stars: "",
      },
      amenities: [],
      description: "",
      price: 0,
      priceRange: 1,
      isExactPrice: false,
      isFree: false,
      pictures: [],
    },
    validationSchema: validationSchemaLocation,
    onSubmit: async (values) => {
      values.isActive = true

      const response = await axios.post(
        `/api/locations/${location._id}`,
        values
      )

      if (response.status === 200) {
        router.push(`/locations/${location._id}`)
      }
    },
  })

  useEffect(() => {
    if (location) {
      const mergedValues = {
        ...formik.initialValues,
        ...location,
        address: {
          ...formik.initialValues.address,
          ...location.address,
        },
        type: {
          ...formik.initialValues.type,
          ...location.type,
        },
      }

      formik.setValues(mergedValues)
    }
  }, [location])

  return (
    <LocationFormContext.Provider value={{ formik }}>
      <form onSubmit={formik.handleSubmit}>{children}</form>
    </LocationFormContext.Provider>
  )
}
const useLocationForm = () => {
  const context = useContext(LocationFormContext)

  if (!context) {
    throw new Error(
      "useLocationForm must be used within a LocationFormProvider"
    )
  }

  return context
}

export { LocationFormProvider, useLocationForm }
