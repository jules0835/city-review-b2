"use client"

import NavBar from "@/components/header/NavBar"
import Image from "next/image"
import Logo from "../../../public/logo-city-review.png"
import Link from "next/link"
import LocaleSwitcher from "@/components/header/LocaleSwitcher"
import LoginSwitch from "@/components/header/LoginSwitch"
import Button from "@/components/buttons/Button"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { Menu, MenuOpen } from "@mui/icons-material"
import { useWindowSize } from "@uidotdev/usehooks"

// eslint-disable-next-line max-lines-per-function
const Header = () => {
  const t = useTranslations("NavLinks")
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])

  return (
    <div>
      {!isMobile && (
        <div className="flex items-center py-3 pl-5 pr-5 justify-between bg-white shadow-md">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="City Review" width={50} height={50} />
              <h1 className="pl-4 font-bold text-xl">City Review</h1>
            </Link>
          </div>
          <div>
            <nav className="flex">
              <NavBar />
            </nav>
          </div>
          <div className="flex items-center space-x-8">
            <div>
              <Button
                styles="py-2 px-3"
                withLink={`/user/locations/new-location`}
              >
                {t("newLocation")}
              </Button>
            </div>
            <div>
              <LocaleSwitcher />
            </div>
            <div>
              <LoginSwitch />
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div>
          <div className="flex items-center justify-between py-3 pl-5 pr-5 bg-white shadow-md">
            <div
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MenuOpen /> : <Menu />}
            </div>
            <div className="flex items-center justify-center flex-grow">
              <Link href="/" className="flex items-center">
                <Image src={Logo} alt="City Review" width={50} height={50} />
              </Link>
            </div>
            <div>
              <LocaleSwitcher />
            </div>
          </div>

          {isMenuOpen && (
            <div className=" bg-white shadow-md flex flex-col items-center justify-center z-50">
              <nav className="flex flex-col items-center  p-2">
                <NavBar />
              </nav>
              <div className="flex flex-col items-center space-y-3 pb-4">
                <Button
                  styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  withLink={`/user/locations/new-location`}
                >
                  {t("newLocation")}
                </Button>
                <LoginSwitch />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
