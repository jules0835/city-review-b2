/* eslint-disable no-underscore-dangle */
import ImagesCarousel from "@/components/animations/ImagesCarousel"
import LikeBtn from "@/components/buttons/LikeBtn"
import { useTranslations } from "next-intl"
import { Restaurant, Park, LocalBar, Museum, Star } from "@mui/icons-material"
import Link from "next/link"

// eslint-disable-next-line max-lines-per-function
const LocationDisplay = ({
  location,
  setLikeInLocations,
  canNotClickRedirect,
}) => {
  const t = useTranslations("Locations.structureOptions")

  return (
    <div>
      {location && (
        <div className="flex flex-col">
          <div className="relative">
            <ImagesCarousel
              images={location.pictures}
              path={`/images/locations/`}
              divStyles="sm:w-60 sm:h-60 lg:w-72 lg:h-72 2xl:w-80 2xl:h-80 w-48 h-48 md:w-52 md:h-52"
              title={location.structure}
              link={canNotClickRedirect ? "" : `/locations/${location._id}`}
            />
            <div className="absolute top-0 left-0 py-2 px-4 m-2 bg-white rounded-full flex items-center">
              {location.structure === "Restaurant" && <Restaurant />}
              {location.structure === "Park" && <Park />}
              {location.structure === "Bar" && <LocalBar />}
              {location.structure === "Museum" && <Museum />}

              <p className="ml-3">{t(location.structure.toLowerCase())}</p>
            </div>
            <LikeBtn
              isLiked={location.isLikedByUser}
              locationId={location._id.toString()}
              setLikeInLocations={setLikeInLocations}
              position="absolute top-0 right-0"
            />
          </div>
          <div className="mt-2">
            <Link
              href={canNotClickRedirect ? "" : `/locations/${location._id}`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-800">
                  {location.name.length > 30
                    ? `${location.name.substring(0, 20)}...`
                    : location.name}
                </p>
                {location.averageRating > 0 && (
                  <div className="flex items-center">
                    <p>{location.averageRating.toFixed(1)}</p>
                    <Star className="text-yellow-500" />
                  </div>
                )}
              </div>
              <div className="flex items-center font-semibold">
                <p>
                  {location.address.city.length > 30
                    ? `${location.address.city.substring(0, 30)}...`
                    : location.address.city}
                </p>
                <p className="mr-1">,</p>
                <p>
                  {location.address.country.length > 20
                    ? `${location.address.country.substring(0, 30)}...`
                    : location.address.country}
                </p>
              </div>
              <div className="flex items-center">
                <p>
                  {!location.isFree &&
                    location.priceRange &&
                    "$".repeat(location.priceRange)}
                </p>
                <p>{location.isFree && "Free"}</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationDisplay
