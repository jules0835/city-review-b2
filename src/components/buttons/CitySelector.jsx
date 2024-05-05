import { useState, useEffect } from "react"
import axios from "axios"
import { useTranslations } from "next-intl"
import ComboBox from "./ComboBox"

const CitySelector = ({ changeCity, styles, country, city }) => {
  const t = useTranslations("Auth.signup")
  const [cities, setCities] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`/api/countries/country/cities?name=${query}&country=${country}`)
        .then((response) => {
          setCities(response.data || [])
        })
        .catch(() => {
          setCities([])
        })
    }
  }, [query, country])

  useEffect(() => {
    setCities([])
    setQuery("")
  }, [country])

  return (
    <div className={styles.fixedTop}>
      <ComboBox
        items={cities.map((cityM) => cityM)}
        selectedItem={city}
        onChange={changeCity}
        placeholder={t("selectCity")}
        disabled={country <= 0}
        styles={styles}
        query={query}
        setQuery={setQuery}
      />
    </div>
  )
}

export default CitySelector
