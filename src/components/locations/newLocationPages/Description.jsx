import { useTranslations } from "next-intl"

const Description = ({ formik }) => {
  const t = useTranslations("NewLocation.description")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <textarea
        type="text"
        className="w-full border border-gray-200 p-4 rounded-lg mb-4 h-40"
        placeholder={t("description")}
        value={formik.values.description}
        onChange={formik.handleChange}
        name="description"
      />
    </div>
  )
}

export default Description
