/* eslint-disable max-lines-per-function */
"use client"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"

const Price = ({ formik }) => {
  const [isFree, setIsFree] = useState(formik.values.isFree)
  const t = useTranslations("NewLocation.price")

  useEffect(() => {
    formik.setFieldValue("isFree", isFree)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFree])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <div className="flex justify-center items-center mb-4">
        <button
          type="button"
          className={`p-4 rounded-lg mr-4 ${
            isFree ? "bg-gray-200 border border-black" : "bg-white"
          }`}
          onClick={() => setIsFree(true)}
        >
          {t("free")}
        </button>
        <button
          type="button"
          className={`p-4 rounded-lg ${
            !isFree ? "bg-gray-200 border border-black" : "bg-white"
          }`}
          onClick={() => setIsFree(false)}
        >
          {t("paid")}
        </button>
      </div>

      {isFree && (
        <div className="flex flex-col items-center">
          <MoneyOffIcon fontSize="large" />
          <h2 className="text-center text-xl">{t("freeLocation")}</h2>
        </div>
      )}

      {!isFree && (
        <div>
          <label htmlFor="priceRange">{t("priceRange")}</label>
          <select
            className="w-full border border-gray-200 p-4 rounded-lg mb-4"
            value={formik.values.priceRange}
            onChange={formik.handleChange}
            name="priceRange"
          >
            <option value={1}>$</option>
            <option value={2}>$$</option>
            <option value={3}>$$$</option>
            <option value={4}>$$$$</option>
            <option value={5}>$$$$$</option>
          </select>
          <div className="flex flex-col items-center">
            <h1>{t("exactPrice")}</h1>
            <label htmlFor="isExactPrice">Yes</label>
            <input
              type="checkbox"
              id="isExactPrice"
              name="isExactPrice"
              checked={formik.values.isExactPrice}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      )}
      {!isFree && formik.values.isExactPrice && (
        <div>
          <label htmlFor="price">{t("price")}</label>
          <input
            type="number"
            className="w-full border border-gray-200 p-4 rounded-lg mb-4"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            name="price"
          />
        </div>
      )}
    </div>
  )
}

export default Price
