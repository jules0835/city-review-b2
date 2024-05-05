/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines-per-function */
import Header from "@/components/header/Header"
import { getServerSession } from "next-auth"
import { getTranslations } from "next-intl/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getLocationsWithQuery } from "@/db/crud/locationCrud"
import Image from "next/image"
import getTranslTitle from "@/assets/functions/getTranslTitle"

const PATH_IMAGES = `/images/locations/`
const INIT_LOCATIONS_LENGTH = 4
export const metadata = async () => {
  const translation = await getTranslTitle("home")

  return {
    title: translation.title,
  }
}
const Home = async () => {
  const t = await getTranslations("Home")
  const session = getServerSession(authOptions)
  const { locations } = await getLocationsWithQuery(
    INIT_LOCATIONS_LENGTH,
    0,
    session?.user?.userId
  )

  return (
    <main>
      <Header />

      <div className="flex flex-col items-center justify-center mt-10">
        <Image
          src="/logo-city-review.png"
          alt="Next.js Logo"
          width={100}
          height={100}
        />
        <h1 className="text-4xl text-center font-bold mt-5">{t("title")}</h1>
        <p className="text-xl text-center mt-5">{t("description")}</p>
        <p className="text-center mt-5 mx-16">{t("description2")}</p>
        {locations?.length > 0 && (
          <div className="bg-blue-300 w-screen md:w-full md:flex md:flex-col md:p-10 mt-20 space-y-10 bg-gradient-to-b from-blue-50 to-blue-500">
            <h1 className="text-xl font-bold text-center">
              {t("lastLocations")}
            </h1>
            {locations?.map((location, idLoc) => (
              <div
                key={location._id}
                className="md:flex text-center items-center space-x-10 justify-between md:ml-56 md:mr-56"
              >
                <div>
                  <div className="md:flex md:space-x-2 items-center">
                    <h1 className="text-4xl font-bold">{idLoc + 1}</h1>
                    <p className="text-3xl font-bold">-</p>
                    <h1 className="text-2xl font-bold">{location.name}</h1>
                  </div>
                  <h1 className="text-xl font-bold">{location.structure}</h1>
                  <h2 className="text-lg font-semibold">
                    {location.address.city.length > 30
                      ? `${location.address.city.substring(0, 20)}...`
                      : location.address.city}
                    {", "}
                    {location.address.country}
                  </h2>
                  <p>
                    {location.description.length > 100
                      ? `${location.description.substring(0, 100)}...`
                      : location.description}
                  </p>
                </div>
                <div className="w-80 h-80 relative">
                  <Image
                    src={PATH_IMAGES + location.pictures[0]}
                    alt="Location Image"
                    className="rounded-xl object-cover"
                    fill
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
