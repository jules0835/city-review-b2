/* eslint-disable no-underscore-dangle */
import { getUserLocationsLiked } from "@/db/crud/locationCrud"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Header from "@/components/header/Header"
import Button from "@/components/buttons/Button"
import { OpenInNew } from "@mui/icons-material"
import { getTranslations } from "next-intl/server"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("userLocationsLiked")

  return {
    title: translation.title,
  }
}
const locationsUser = async () => {
  const t = await getTranslations("Locations")
  const session = await getServerSession(authOptions)
  const locations = await getUserLocationsLiked(session?.user?.userId)

  return (
    <div>
      <Header />
      <div className="mt-10 space-y-2 mx-4 md:px-28">
        <h1 className="text-2xl font-bold">
          {t("yourlocationsliked")} {locations?.length} {t("locations")}
        </h1>
        {locations?.map((location, id) => (
          <div key={location._id}>
            <div className="flex items-center border border-gray-200 p-4 rounded-lg  bg-white">
              <div className="flex items-center space-x-2">
                <div>
                  <h1>{id + 1}</h1>
                </div>
                <p>-</p>
                <div>
                  {location.name ? (
                    <h1>{location.name}</h1>
                  ) : (
                    <h1>{location._id}</h1>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 ml-auto">
                <Button isMain withLink={`/locations/${location._id}`}>
                  <OpenInNew />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default locationsUser
