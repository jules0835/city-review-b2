import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

const locales = ["us", "fr", "de", "es", "cn", "it"]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound()
  }

  return {
    messages: (await import(`./assets/messages/${locale}.json`)).default,
  }
})
