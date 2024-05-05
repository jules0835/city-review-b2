import { getTranslations } from "next-intl/server"

export async function getTranslTitle(page) {
  const t = await getTranslations("TitleTranslation")

  return {
    title: t(page),
  }
}

export default getTranslTitle
