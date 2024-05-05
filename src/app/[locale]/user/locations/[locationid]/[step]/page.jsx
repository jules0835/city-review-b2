"use client"
import Structure from "@/components/locations/newLocationPages/Structure"
import Address from "@/components/locations/newLocationPages/Address"
import Amenities from "@/components/locations/newLocationPages/Amenities"
import Description from "@/components/locations/newLocationPages/Description"
import Price from "@/components/locations/newLocationPages/Price"
import Recap from "@/components/locations/newLocationPages/Recap"
import Pictures from "@/components/locations/newLocationPages/Pictures"
import Type from "@/components/locations/newLocationPages/Type"
import { useLocationForm } from "@/context/LocationFormContext"
import Name from "@/components/locations/newLocationPages/Name"
import { useRouter } from "next/navigation"

const LocationStep = ({ params }) => {
  const { formik } = useLocationForm()
  const routeur = useRouter()

  return (
    <div
      className="flex flex-col items-center w-full h-full mb-36"
      key={params.step}
    >
      {(() => {
        switch (params.step) {
          case "name":
            return <Name formik={formik} />

          case "address":
            return <Address formik={formik} />

          case "amenities":
            return <Amenities formik={formik} />

          case "description":
            return <Description formik={formik} />

          case "price":
            return <Price formik={formik} />

          case "recap":
            return <Recap formik={formik} />

          case "structure":
            return <Structure formik={formik} />

          case "pictures":
            return <Pictures formik={formik} />

          case "type":
            return <Type formik={formik} />

          default:
            return routeur.push("/404")
        }
      })()}
    </div>
  )
}

export default LocationStep
