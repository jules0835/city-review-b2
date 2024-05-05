/* eslint-disable no-underscore-dangle */
import { useRouter } from "next/navigation"
import Button from "@/components/buttons/Button"
import Image from "next/image"
import Logo from "../../../public/logo-city-review.png"
import Link from "next/link"
import axios from "axios"
import { useTranslations } from "next-intl"

const TopNavigation = ({ formik }) => {
  const router = useRouter()
  const t = useTranslations("NewLocation.navigation")
  const saveData = async (values) => {
    const response = await axios.post(
      `/api/locations/${formik.values._id}`,
      values
    )

    if (response.status === 200) {
      router.push(`/user/locations`)
    }
  }

  return (
    <div className="py-3 px-5 bg-white w-full fixed flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image src={Logo} alt="City Review" width={50} height={50} />
      </Link>
      <Button type="button" onClickBtn={() => saveData(formik.values)}>
        {t("saveQuit")}
      </Button>
    </div>
  )
}

export default TopNavigation
