import { useTranslations } from "next-intl"

const Name = ({ formik }) => {
  const t = useTranslations("NewLocation.name")

  return (
    <div className="h-[calc(100vh - -webkit-calc(88px + 82px))] !important">
      <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
      <textarea
        type="text"
        className="w-full border border-gray-200 p-4 rounded-lg mb-4"
        placeholder={t("name")}
        value={formik.values.name}
        onChange={formik.handleChange}
        name="name"
      />
    </div>
  )
}

export default Name
