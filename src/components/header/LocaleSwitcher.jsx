"use client"

import DropdownMenu from "@/components/buttons/DropdownMenu"
import { GlobeAltIcon } from "@heroicons/react/24/outline"

export default function LocaleSwitcher() {
  const locales = [
    { code: "us", name: "English" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "cn", name: "中文" },
    { code: "it", name: "Italiano" },
  ]

  return (
    <div>
      <DropdownMenu
        icon={<GlobeAltIcon className="h-5 w-5 text-gray-500" />}
        noChevron
        options={locales.map((locale) => ({
          action: () => {
            window.location.href = `/${locale.code}${window.location.pathname.slice(3)}`
          },
          label: locale.name,
          href: false,
          login: false,
        }))}
      />
    </div>
  )
}
