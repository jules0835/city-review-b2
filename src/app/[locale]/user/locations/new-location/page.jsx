/* eslint-disable max-lines-per-function */
"use client"
import Button from "@/components/buttons/Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { DialogPopUp } from "@/components/popups/DialogPopUp"
import { useTranslations } from "next-intl"

const NewLocation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const t = useTranslations("NewLocation")
  const { data: session } = useSession()
  const authorId = session?.user?.userId
  const createLocation = async () => {
    setIsLoading(true)

    try {
      const res = await axios.post("/api/locations/newlocation", {
        authorId,
      })

      if (res.status === 200) {
        router.push(`/user/locations/${res.data.locationId}/name`)
      } else {
        setIsError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
    }
  }

  return (
    <div className="flex flex-col items-center bg-orange-600 p-4 bg-gradient-to-b from-orange-200 to-orange-600 h-screen">
      <DialogPopUp
        error
        isOpen={isError}
        setIsOpen={setIsError}
        title="Error"
        content="An error occured, please try again later"
        buttonMain={{ text: "OK" }}
      />
      <div className="flex flex-col items-center space-y-10 mt-8 text-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-xl text-center">{t("newDescription")}</p>
        <p>{t("newDescription2")}</p>
        <Button
          isMain
          onClickBtn={() => createLocation()}
          isLoading={isLoading}
          padding={"p-5"}
        >
          Create a new location
        </Button>
      </div>
    </div>
  )
}

export default NewLocation
