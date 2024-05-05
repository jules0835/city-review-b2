import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { findLocation } from "@/db/crud/locationCrud"
import { getServerSession } from "next-auth"
import Location from "@/components/locations/display/location/Location"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("location")

  return {
    title: translation.title,
  }
}
const LocationPage = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const location = await findLocation(
    {
      _id: params.locationid,
    },
    session?.user?.userId
  )

  return (
    <div className="mt-5 md:mx-10 mx-2">
      {location && <Location location={location} />}
    </div>
  )
}

export default LocationPage
