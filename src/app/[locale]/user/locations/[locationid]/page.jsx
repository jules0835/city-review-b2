/* eslint-disable no-underscore-dangle */
import Button from "@/components/buttons/Button"
import DeleteButton from "@/components/buttons/DeleteButton"
import Header from "@/components/header/Header"
import LocationDisplay from "@/components/locations/display/list/LocationDisplay"
import { findLocation } from "@/db/crud/locationCrud"
import { getTranslations } from "next-intl/server"

const LocationPageUser = async ({ params }) => {
  const location = await findLocation({ _id: params.locationid })
  const t = await getTranslations("Locations")

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center mt-5">
        {t("locationDetails")}
      </h1>
      {location.isActive ? (
        <div className="mb-5 mx-20 my-10">
          <LocationDisplay location={location} />
        </div>
      ) : (
        <div>
          <h1 className="text-center p-3 ">
            {t("locationNotActive")} {location._id}
          </h1>
        </div>
      )}
      <div className="flex justify-center pt-4 space-x-5">
        <Button withLink={`/user/locations/${location._id}/name`} isMain>
          {t("edit")}
        </Button>

        <DeleteButton locationId={location._id} />
      </div>
    </div>
  )
}

export default LocationPageUser
