import { useFormik } from "formik"
import * as Yup from "yup"
import { useTranslations } from "next-intl"
import Button from "@/components/buttons/Button"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// eslint-disable-next-line max-lines-per-function
const Login = () => {
  const t = useTranslations("Auth.login")
  const router = useRouter()
  const [error, setError] = useState(null)
  const validationSchema = Yup.object({
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        })

        if (res.error) {
          setError(t("wrongCredentials"))

          return
        }

        router.push("/")
      } catch (err) {
        setError(t("wrongCredentials"))
      }
    },
  })
  const cssInput =
    "form-input px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors w-full"

  return (
    <main className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold pt-8">{t("title")}</h1>
      <p className="font-semibold p-4 text-center text-lg">
        {t("description")}
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 rounded-lg"
      >
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t("email")}
          onChange={formik.handleChange}
          value={formik.values.email}
          className={cssInput}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}

        <input
          id="password"
          name="password"
          type="password"
          placeholder={t("password")}
          onChange={formik.handleChange}
          value={formik.values.password}
          className={cssInput}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}

        {error && (
          <p className="text-red-500 text-sm p-2 text-center ">{error}</p>
        )}

        <Button isSubmit isMain>
          {t("submit")}
        </Button>
      </form>
    </main>
  )
}

export default Login
