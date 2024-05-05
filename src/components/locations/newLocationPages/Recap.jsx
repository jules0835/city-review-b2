/* eslint-disable max-lines-per-function */
import LocationDisplay from "@/components/locations/display/list/LocationDisplay"
import { useTranslations } from "next-intl"
import { locationAmenities } from "@/assets/constants/locations"

export const getAmenityInfos = (amenityName) => {
  const amenity = locationAmenities.find(
    (amenityF) => amenityF.name === amenityName
  )

  return amenity
}
const Recap = ({ formik }) => {
  const tl = useTranslations()
  const t = useTranslations("Locations")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("newLocation.recap")}
      </h1>
      <div className="bg-white p-5 shadow-md rounded-lg md:flex md:space-x-16">
        <div className="p-4 z-auto">
          <p className="text-xl font-semibold mb-4">
            {t("newLocation.recapDisplay")}
          </p>
          <div className="bg-gray-200 p-4 rounded-lg">
            <LocationDisplay location={formik.values} canNotClickRedirect />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">name</h2>
            <p className="mb-4">{formik.values.name}</p>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="mb-4">{formik.values.description}</p>
            <h2 className="text-xl font-bold mb-4">What is the location</h2>
            <p className="mb-4">{formik.values.structure}</p>
            <h2 className="text-xl font-bold mb-4">location type</h2>
            <p className="mb-4">{formik.values.type.typeName}</p>
            <h2 className="text-xl font-bold mb-4">Address</h2>
            <p>{formik.values.address.street}</p>
            <p>{formik.values.address.city}</p>
            <p>{formik.values.address.zipcode}</p>
            <p>{formik.values.address.country}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            {formik.values.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg m-1"
              >
                {getAmenityInfos(amenity).icon}
                <p>{tl(getAmenityInfos(amenity).translation)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Price</h2>
            <p className="mb-4">
              {formik.values.price ? `${formik.values.price}$` : "Free"}
            </p>
            {!formik.values.isFree && formik.values.priceRange > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Price Range</h2>
                <p>{"$".repeat(formik.values.priceRange)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recap
