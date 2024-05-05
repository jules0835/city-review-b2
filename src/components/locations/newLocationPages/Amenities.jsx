import { locationAmenities } from "@/assets/constants/locations"
import GridSelector from "@/components/buttons/GridSelector"
import { useTranslations } from "next-intl"

const Amenities = ({ formik }) => {
  const t = useTranslations("NewLocation.amenities")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <GridSelector
        grid={locationAmenities}
        selected={formik.values.amenities}
        handleSelect={(selectedAmenity) => {
          const amenities = [...formik.values.amenities]
          const index = amenities.indexOf(selectedAmenity)

          if (index > -1) {
            amenities.splice(index, 1)
          } else {
            amenities.push(selectedAmenity)
          }

          formik.setFieldValue("amenities", amenities)
        }}
      />
    </div>
  )
}

export default Amenities
