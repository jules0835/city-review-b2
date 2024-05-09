/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
"use client"

import { locationStructure, locationType } from "@/assets/constants/locations"
import {
  MoneyOff,
  Search,
  Delete,
  Public,
  LocationCity,
} from "@mui/icons-material"
import { useDebounce } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import clsx from "clsx"
import CountrySelector from "@/components/buttons/CountrySelector"
import CitySelector from "@/components/buttons/CitySelector"

// The SearchFiltersBar is not optimized for mobile devices
const SearchFiltersBar = () => {
  const t = useTranslations()
  const [search, setSearch] = useQueryState("search", { shallow: false })
  const [typeQuery, setTypeQuery] = useQueryState("type", { shallow: false })
  const [freeQuery, setFreeQuery] = useQueryState("free", { shallow: false })
  const [countryQuery, setCountryQuery] = useQueryState("country", {
    shallow: false,
  })
  const [structureQuery, setStructureQuery] = useQueryState("structure", {
    shallow: false,
  })
  const [cityQuery, setCityQuery] = useQueryState("city", { shallow: false })
  const [showCountryInput, setShowCountryInput] = useState(false)
  const [showCityInput, setShowCityInput] = useState(false)
  const [inputSearch, setInputSearch] = useState(search)
  const [nameTypes, setNameTypes] = useState([])
  const debouncedSearch = useDebounce(inputSearch, 500)
  let timeoutId = null
  let timeoutId2 = null

  useEffect(() => {
    const structureType = locationType.find((type) => type[structureQuery])
    setNameTypes(structureType ? structureType[structureQuery] : [])
  }, [structureQuery])

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    setTypeQuery(null)
  }, [structureQuery])

  useEffect(() => {
    setCityQuery(null)
  }, [countryQuery])

  return (
    <div className="p-4 md:flex items-center space-x-4">
      {structureQuery ||
      freeQuery ||
      typeQuery ||
      inputSearch ||
      countryQuery ? (
        <div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setStructureQuery(null)
              setTypeQuery(null)
              setFreeQuery(null)
              setInputSearch("")
              setCountryQuery("")
              setCityQuery("")
            }}
          >
            <Delete />
          </div>
        </div>
      ) : (
        <div className="flex items-center cursor-pointer">
          <Search />
        </div>
      )}

      <div className="md:flex md:space-x-4">
        <input
          type="text"
          name="search"
          placeholder={t("search")}
          value={inputSearch || ""}
          onChange={(e) => setInputSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl"
        />
        <div className="flex items-center space-x-7">
          <div className="flex items-center space-x-4">
            <div
              onMouseEnter={() => {
                setShowCountryInput(true)
                clearTimeout(timeoutId)
              }}
              onMouseLeave={() => {
                timeoutId = setTimeout(() => setShowCountryInput(false), 5000)
              }}
            >
              <div className={showCountryInput ? "block" : "hidden"}>
                <CountrySelector
                  styles="p-3 border border-gray-300 rounded-xl cursor-pointer"
                  country={countryQuery || ""}
                  changeCountry={(country) => setCountryQuery(country)}
                />
              </div>

              <div
                className={
                  showCountryInput
                    ? "hidden"
                    : "block" +
                      " p-3 border border-gray-300 rounded-xl cursor-pointer bg-white"
                }
              >
                <Public className="cursor-pointer" />
              </div>
            </div>
          </div>
          {countryQuery && (
            <div className="flex items-center ">
              <div
                onMouseEnter={() => {
                  setShowCityInput(true)
                  clearTimeout(timeoutId2)
                }}
                onMouseLeave={() => {
                  timeoutId2 = setTimeout(() => setShowCityInput(false), 5000)
                }}
                className="flex items-center "
              >
                <div className={showCityInput ? "block" : "hidden"}>
                  <CitySelector
                    styles="p-3 border border-gray-300 rounded-xl"
                    country={countryQuery || ""}
                    city={cityQuery || ""}
                    changeCity={(city) => setCityQuery(city)}
                  />
                </div>

                <div
                  className={
                    showCityInput
                      ? "hidden"
                      : "block" +
                        " p-3 border border-gray-300 rounded-xl cursor-pointer bg-white"
                  }
                >
                  <LocationCity className="cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block border-r-2 h-10 border-x-orange-500"></div>
      <div className="flex justify-between">
        <div className="flex items-center">
          {locationStructure?.map((structure) => (
            <div
              key={structure.id}
              className={clsx(
                "flex flex-col items-center p-2  rounded-md cursor-pointer",
                {
                  "border-black border-2": structure.name === structureQuery,
                }
              )}
              onClick={() =>
                structureQuery === structure.name
                  ? setStructureQuery(null)
                  : setStructureQuery(structure.name)
              }
            >
              {structure.icon}
              <p>{t(structure.translation)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block border-r-2 h-10 border-x-orange-500"></div>
      {structureQuery && (
        <div className="flex">
          {nameTypes.map((type) => (
            <div
              key={type.id}
              className={clsx(
                "flex flex-col items-center p-2 rounded-md cursor-pointer",
                {
                  "border-black border-2": type.name === typeQuery,
                }
              )}
              onClick={() =>
                typeQuery === type.name
                  ? setTypeQuery(null)
                  : setTypeQuery(type.name)
              }
            >
              {type.icon}
              <p>{t(type.translation)}</p>
            </div>
          ))}
        </div>
      )}
      {structureQuery && (
        <div className="hidden md:block border-r-2 h-10 border-x-orange-500"></div>
      )}

      <div
        className={clsx(
          "flex flex-col items-center p-2 rounded-md cursor-pointer font-semibold",
          {
            "border-black border-2": freeQuery,
          }
        )}
        onClick={() => setFreeQuery(freeQuery ? null : true)}
      >
        <MoneyOff />
        <h1>Free</h1>
      </div>
    </div>
  )
}

export default SearchFiltersBar
