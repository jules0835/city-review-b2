import { useTranslations } from "next-intl"
import CountrySelector from "@/components/buttons/CountrySelector"
import CitySelector from "@/components/buttons/CitySelector"

const Address = ({ formik }) => {
  const t = useTranslations("NewLocation.address")

  return (
    <div>
      {formik && formik.values ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
          <CountrySelector
            changeCountry={(locale) =>
              formik.setFieldValue("address.country", locale)
            }
            country={formik.values.address.country}
            styles={"w-full border border-gray-200 p-4 rounded-lg mb-4"}
          />
          <input
            type="text"
            className="w-full border border-gray-200 p-4 rounded-lg mb-4"
            placeholder={t("street")}
            value={formik.values.address.street}
            onChange={formik.handleChange}
            name="address.street"
          />
          <CitySelector
            changeCity={(city) => formik.setFieldValue("address.city", city)}
            city={formik.values.address.city}
            country={formik.values.address.country}
            styles={"w-full border border-gray-200 p-4 rounded-lg mb-4"}
          />
          <input
            type="text"
            className="w-full border border-gray-200 p-4 rounded-lg mb-4"
            placeholder={t("zipcode")}
            value={formik.values.address.zipcode}
            onChange={formik.handleChange}
            name="address.zipcode"
          />
        </div>
      ) : null}
    </div>
  )
}

export default Address
