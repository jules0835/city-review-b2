import GridSelector from "@/components/buttons/GridSelector"
import { locationStructure } from "@/assets/constants/locations"
import React from "react"
import { useTranslations } from "next-intl"

const Structure = ({ formik }) => {
  const t = useTranslations("NewLocation.structure")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <GridSelector
        grid={locationStructure}
        selected={formik.values.structure}
        handleSelect={(newStructure) => {
          formik.setFieldValue("structure", newStructure)
        }}
      />
    </div>
  )
}

export default Structure
