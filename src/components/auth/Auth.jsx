"use client"
import { useState, useEffect } from "react"
import Signup from "@/components/auth/Signup"
import Login from "@/components/auth/Login"
import { useTranslations } from "next-intl"
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import Button from "@/components/buttons/Button"

const Auth = () => {
  const [loginOpen, setLoginOpen] = useState(true)
  const t = useTranslations("Auth")
  const searchParams = useSearchParams()
  const auth = searchParams.get("auth")

  useEffect(() => {
    if (auth === "login") {
      setLoginOpen(true)
    } else if (auth === "signup") {
      setLoginOpen(false)
    }
  }, [auth])

  const baseButtonClass = "px-4 py-2 rounded-full"
  const activeButtonClass = "bg-blue-500 text-white transition-all"
  const inactiveButtonClass = "text-black transition-all hover:bg-blue-400"

  return (
    <main className="flex flex-col items-center justify-center bg-white p-5 rounded-lg shadow-md ">
      <div className="text-center pb-4">
        <Button withLink="/">{t("backToHome")}</Button>
      </div>
      <div className="flex rounded-full p-1 bg-blue-200 space-x-2">
        <button
          onClick={() => setLoginOpen(true)}
          className={clsx(
            baseButtonClass,
            loginOpen ? activeButtonClass : inactiveButtonClass
          )}
        >
          {t("login.title")}
        </button>
        <button
          onClick={() => setLoginOpen(false)}
          className={clsx(
            baseButtonClass,
            !loginOpen ? activeButtonClass : inactiveButtonClass
          )}
        >
          {t("signup.title")}
        </button>
      </div>

      {loginOpen ? <Login /> : <Signup />}
    </main>
  )
}

export default Auth
