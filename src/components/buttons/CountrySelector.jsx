import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import axios from "axios"

const CountrySelector = ({ changeCountry, styles, country }) => {
  const t = useTranslations("Auth.signup")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(`/api/countries`).then((response) => {
      setCountries(response.data || [])
    })
  }, [])

  return (
    <div className="flex gap-4">
      <select
        value={country}
        onChange={(e) => {
          changeCountry(e.target.value)
        }}
        className={styles}
      >
        <option value="">{t("selectCountry")}</option>
        {countries &&
          countries.map((countryM) => (
            <option key={countryM} value={countryM}>
              {countryM}
            </option>
          ))}
      </select>
    </div>
  )
}

export default CountrySelector
