"use client"

import { useSession, signOut } from "next-auth/react"
import DropdownMenu from "@/components/buttons/DropdownMenu"
import { useTranslations } from "next-intl"
import { UserIcon } from "@heroicons/react/24/outline"

// eslint-disable-next-line max-lines-per-function
export default function LoginSwitch() {
  const { data: session, status } = useSession()
  const t = useTranslations("NavLinks")
  const actionsList = [
    {
      action: false,
      label: t("login"),
      href: "/authentication?auth=login",
      login: false,
    },
    {
      action: false,
      label: t("signup"),
      href: "/authentication?auth=signup",
      login: false,
    },
    {
      action: false,
      label: t("account"),
      href: "/user/account",
      login: true,
    },
    {
      action: false,
      label: t("locations"),
      href: "/user/locations",
      login: true,
    },
    {
      action: false,
      label: t("mylikes"),
      href: "/user/likes",
      login: true,
    },
    {
      action: () => signOut(),
      label: t("logout"),
      href: false,
      login: true,
    },
  ]

  if (status === "authenticated") {
    return (
      <div>
        <DropdownMenu
          title={session.user.username}
          options={[
            {
              action: false,
              label: session.user.email,
              href: false,
              login: false,
            },
            ...actionsList.filter((action) => action.login),
          ]}
        />
      </div>
    )
  }

  return (
    <div>
      <DropdownMenu
        icon={<UserIcon className="h-5 w-5 text-gray-500" />}
        title={t("account")}
        options={actionsList.filter((action) => !action.login)}
      />
    </div>
  )
}
