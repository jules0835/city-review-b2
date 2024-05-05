"use client"
import Button from "@/components/buttons/Button"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

// eslint-disable-next-line max-lines-per-function
const DeleteButton = ({ locationId }) => {
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false)
  const [confirmCodeInput, setConfirmCodeInput] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [confirmCode, setConfirmCode] = useState(
    Math.floor(Math.random() * 100000)
  )
  const router = useRouter()
  const t = useTranslations("Locations")

  useEffect(() => {
    setConfirmCode(Math.floor(Math.random() * 100000))
    setConfirmCodeInput("")
    setErrorMsg("")
  }, [openConfirmationDelete])

  const handleDeleteLocation = async (id) => {
    try {
      const res = await axios.delete(`/api/locations/${id}`)

      if (res.status === 200) {
        router.push("/user/locations")
      } else {
        setErrorMsg("Error deleting location, please try again")
      }
    } catch (err) {
      setErrorMsg("Error deleting location, please try again")
    }
  }

  return (
    <div>
      <Button
        onClickBtn={() => setOpenConfirmationDelete(true)}
        isMain
        styles={"bg-red-500"}
      >
        {t("delete")}
      </Button>
      {openConfirmationDelete && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  p-4 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">
              {t("deleteLocation")}
            </h1>
            <div>
              <p className="mt-5 font-bold text-2xl text-center">
                {confirmCode}
              </p>
              <input
                type="text"
                className={clsx(
                  "w-full border-2 border-gray-200 p-4 rounded-lg mb-4 mt-4 focus:outline-none",
                  parseInt(confirmCodeInput, 10) !== confirmCode
                    ? "border-red-500"
                    : "border-green-500"
                )}
                placeholder={t("confirmCode")}
                value={confirmCodeInput}
                onChange={(e) => setConfirmCodeInput(e.target.value)}
              />
            </div>
            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

            <div className="flex justify-center space-x-5 mt-5">
              <Button
                onClickBtn={() => setOpenConfirmationDelete(false)}
                styles={"bg-gray-200"}
              >
                {t("cancel")}
              </Button>
              <Button
                onClickBtn={() => {
                  handleDeleteLocation(locationId)
                }}
                styles={`bg-red-500${
                  parseInt(confirmCodeInput, 10) === confirmCode
                    ? ""
                    : " opacity-50"
                }`}
                isDisabled={parseInt(confirmCodeInput, 10) !== confirmCode}
              >
                {t("delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteButton
