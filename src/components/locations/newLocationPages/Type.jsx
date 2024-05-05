import GridSelector from "@/components/buttons/GridSelector"
import {
  locationType,
  artisticPeriods,
  artTypes,
  starRestaurant,
  parkIsPublic,
} from "@/assets/constants/locations"
import { useTranslations } from "next-intl"
import React from "react"

// eslint-disable-next-line max-lines-per-function
const Type = ({ formik }) => {
  const t = useTranslations("NewLocation.type")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <GridSelector
        grid={
          locationType.find(
            (item) => formik.values.structure === Object.keys(item)[0]
          )?.[
            Object.keys(
              locationType.find(
                (item) => formik.values.structure === Object.keys(item)[0]
              )
            )[0]
          ] || []
        }
        selected={formik.values.type.typeName}
        handleSelect={(newType) => {
          formik.setFieldValue("type.typeName", newType)
        }}
      />

      {formik.values.structure === "Museum" &&
        formik.values.type.typeName === "Art" && (
          <div className="mt-8 space-y-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {t("artisticPeriod")}
            </h1>
            <GridSelector
              grid={artisticPeriods}
              selected={formik.values.type.artisticPeriod}
              handleSelect={(newArtisticPeriod) => {
                formik.setFieldValue("type.artisticPeriod", newArtisticPeriod)
              }}
            />
          </div>
        )}

      {formik.values.structure === "Museum" &&
        formik.values.type.typeName === "Art" && (
          <div className="mt-8 space-y-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {t("artType")}
            </h1>

            <GridSelector
              grid={artTypes}
              selected={formik.values.type.artType}
              handleSelect={(newArtType) => {
                formik.setFieldValue("type.artType", newArtType)
              }}
            />
          </div>
        )}

      {formik.values.structure === "Restaurant" &&
        formik.values.type.typeName === "Gourmet" && (
          <div className="mt-8 space-y-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {t("starRestaurant")}
            </h1>
            <GridSelector
              grid={starRestaurant}
              selected={formik.values.type.stars}
              handleSelect={(stars) => {
                formik.setFieldValue("type.stars", stars)
              }}
            />
          </div>
        )}
      {formik.values.structure === "Park" && (
        <div className="mt-8 space-y-8">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {t("parkType")}
          </h1>
          <GridSelector
            grid={parkIsPublic}
            selected={formik.values.type.isPublic}
            handleSelect={(newParkType) => {
              formik.setFieldValue("type.isPublic", newParkType)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Type
