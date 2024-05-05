/* eslint-disable max-lines-per-function */
"use client"

import { DialogPopUp } from "@/components/popups/DialogPopUp"
import { FavoriteBorder, Favorite } from "@mui/icons-material"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"

const LikeBtn = ({ isLiked, locationId, setLikeInLocations, position }) => {
  const t = useTranslations()
  const { data: session } = useSession()
  const [liked, setLiked] = useState(isLiked)
  const [popupLogin, setPopupLogin] = useState(false)
  const userId = session?.user?.userId
  const router = useRouter()
  const updateLike = async () => {
    if (!userId) {
      setPopupLogin(true)

      return
    }

    try {
      if (liked) {
        setLiked(false)
        await axios.delete("/api/locations/likes", {
          data: {
            locationId,
            userId,
          },
        })
      } else {
        setLiked(true)
        await axios.post("/api/locations/likes", {
          locationId,
          userId,
        })
      }

      if (setLikeInLocations) {
        setLikeInLocations(locationId)
      }
    } catch (error) {
      setLiked(!liked)
    }
  }

  return (
    <div className={`${position} m-3`}>
      <DialogPopUp
        title={t("like.login")}
        content={t("like.loginContent")}
        isOpen={popupLogin}
        setIsOpen={setPopupLogin}
        buttonMain={{ text: t("like.ok") }}
        buttonSecondary={{
          text: t("like.login"),
        }}
        actionSecondaryBtn={() => {
          router.push("/authentication?auth=login")
        }}
      />
      <button
        className="bg-white bg-opacity-90 text-black p-1 rounded-full hover:bg-opacity-100"
        onClick={() => updateLike()}
        type="button"
      >
        {liked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
      </button>
    </div>
  )
}

export default LikeBtn
