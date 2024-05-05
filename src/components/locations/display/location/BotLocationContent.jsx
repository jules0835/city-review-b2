/* eslint-disable no-underscore-dangle */
import { useTranslations } from "next-intl"
import { locationAmenities } from "@/assets/constants/locations"
import CommentsSection from "@/components/locations/display/location/CommentsSection"

export const getAmenityInfos = (amenityName) => {
  const amenity = locationAmenities.find(
    (amenityM) => amenityM.name === amenityName
  )

  return amenity
}
const BotLocationContent = ({ location, session }) => {
  const tl = useTranslations()
  const t = useTranslations("Locations")

  return (
    <div className="botContent mt-8">
      <div className="md:flex md:space-x-4  ">
        <div className="flex flex-col bg-white p-5 rounded-lg mt-4 shadow-md w-full">
          <h2 className="text-xl font-bold">{t("description")}</h2>
          <p className="mt-2">{location.description}</p>
        </div>
        {location.amenities.length > 0 && (
          <div className="flex flex-col bg-white p-5 rounded-lg mt-4 shadow-md w-full">
            <h2 className="text-xl font-bold text-center">
              {t("amenitiesDescription")}
            </h2>
            <div className="flex flex-wrap justify-center mt-2">
              {location.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg m-1"
                >
                  {getAmenityInfos(amenity).icon}
                  <p>{tl(getAmenityInfos(amenity).translation)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <CommentsSection
          locationId={location._id}
          initialComments={location.comments}
          session={session}
        />
      </div>
    </div>
  )
}

export default BotLocationContent
