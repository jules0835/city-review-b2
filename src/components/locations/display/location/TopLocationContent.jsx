/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import BigImagesCarousel from "@/components/animations/BigImagesCarousel"
import Image from "next/image"
import { locationStructure } from "@/assets/constants/locations"
import StarsDisplay from "@/components/ui/StarsDisplay"
import PriceRangeDisplay from "@/components/ui/PriceRangeDisplay"
import { useTranslations } from "next-intl"
import { getInfosForType } from "@/assets/functions/location"
import Button from "@/components/buttons/Button"

const TopLocationContent = ({ location, session }) => {
  const tl = useTranslations()
  const t = useTranslations("Locations")
  const locationTypeInfos = {
    icon: getInfosForType(location.structure, location.type.typeName, "icon"),
    name: getInfosForType(
      location.structure,
      location.type.typeName,
      "translation"
    ),
  }

  return (
    <div className="topContent sm:flex">
      <div className="pictures pb-10 md:pb-0 md:flex-grow md:pr-5">
        <BigImagesCarousel
          images={location.pictures}
          path={`/images/locations/`}
          divStyles="sm:w-60 sm:h-96 lg:w-72 lg:h-96 2xl:w-80 2xl:h-96 w-48 h-96 md:w-52 md:h-96"
          locationId={location._id}
        />
      </div>

      <div className="info  w:full md:ml-auto md:w-80 bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center  justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <Image
                src={`/images/profils/${location.author.profilePic}`}
                alt="author"
                className="rounded-full"
                width={50}
                height={50}
              />
            </div>
            <div>
              <p className="text-sm text-center">{t("share-by")}</p>
              <p className="font-bold text-center">
                {location.author.username}
              </p>
            </div>
          </div>

          <div className="flex flex-col ">
            {locationStructure.map((structure) => {
              if (structure.name === location.structure) {
                return (
                  <div key={structure.id} className="text-center">
                    {structure.icon}
                  </div>
                )
              }
            })}
            <p className="font-bold text-center">
              {t(`structureOptions.${location.structure.toLowerCase()}`)}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <StarsDisplay
            rating={location?.rating?.average || 0}
            ratingCount={location?.rating?.count || 0}
          />
        </div>
        <div className="flex justify-center space-x-5  mt-4">
          <div className="price text-center text-2xl">
            <p className="text-sm font-semibold">{t("price")}</p>
            <p className="font-semibold">
              {location.isFree
                ? t("free")
                : location.isExactPrice && `${location.price}$`}
            </p>
            <div className="flex justify-center mt-1">
              {!location.isFree && location.priceRange > 0 && (
                <PriceRangeDisplay priceRange={location.priceRange} />
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{t("type")}</p>
            <p>{locationTypeInfos.icon}</p>
            <p>{tl(locationTypeInfos.name)}</p>
          </div>
        </div>
        <div>
          {location.structure === "Restaurant" &&
            location.type.typeName === "Gourmet" &&
            location.type.stars > 0 && (
              <div className="flex flex-col justify-center items-center mt-4">
                <p>{t("starsRatingRestaurant")}</p>
                <StarsDisplay rating={location.type.stars} starsLength={3} />
              </div>
            )}
          {location.structure === "Museum" &&
            location.type.typeName === "Art" &&
            location.type.artisticPeriod &&
            location.type.artType && (
              <div className="flex flex-col justify-center items-center mt-4">
                <p className="text-sm font-semibold">{t("artisticPeriod")}</p>
                <p>{tl(location.type.artisticPeriod)}</p>
                <p className="text-sm font-semibold">{t("artType")}</p>
                <p>{tl(location.type.artType)}</p>
              </div>
            )}
          {location.structure === "Park" && (
            <div className="flex flex-col justify-center items-center mt-4">
              <p className="text-sm font-semibold">
                {location.structure.isPublic ? t("public") : t("private")}
              </p>
            </div>
          )}
        </div>
        <div className="pt-4">
          <p>{location.address.street}</p>
          <p>
            {location.address.zipcode}, {location.address.city}
          </p>
          <p>{location.address.country}</p>
        </div>
        <div className="flex flex-col">
          <div className="pt-4">
            <p>
              {t("created-at")} {location.createdAt.substring(0, 10)}
            </p>
            {location.lastUpdate !== location.createdAt && (
              <p>
                {t("updated-at")} {location.lastUpdate.substring(0, 10)}
              </p>
            )}
          </div>
          <div className="flex justify-between pt-4">
            <p>
              {location.likesCount} {t("likes")}
            </p>
            <p>
              {location.commentsCount} {t("comments.title")}
            </p>
          </div>
          {session?.user &&
            (session.user.userId === location.authorId ||
              session.user.isAdmin) && (
              <div className="flex justify-center pt-4 space-x-5">
                <Button
                  withLink={`/user/locations/${location._id}/name`}
                  isMain
                >
                  {t("edit")}
                </Button>

                <Button withLink={`/user/locations/${location._id}`}>
                  {t("delete")}
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default TopLocationContent
