/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { useFormik } from "formik"
import * as Yup from "yup"
import { useTranslations, useLocale } from "next-intl"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import CountrySelector from "@/components/buttons/CountrySelector"
import CitySelector from "@/components/buttons/CitySelector"
import Button from "@/components/buttons/Button"
import UsernameSelector from "@/components/buttons/usernameSelector"
import axios from "axios"
import { DialogPopUp } from "@/components/popups/DialogPopUp"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const Signup = () => {
  const t = useTranslations("Auth.signup")
  const currentLocale = useLocale()
  const [popupSuccess, setPopupSuccess] = useState(false)
  const [popupError, setPopupError] = useState(false)
  const router = useRouter()
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("firstNameRequired")),
    lastName: Yup.string().required(t("lastNameRequired")),
    username: Yup.string().required(t("usernameRequired")),
    country: Yup.string().required(t("countryRequired")),
    city: Yup.string().required(t("cityRequired")),
    zipCode: Yup.string().required(t("zipCodeRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], t("passwordMatch"))
      .required(t("passwordRequired")),
    confirmLegal: Yup.boolean().oneOf([true], t("confirmLegalError")),
  })
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      country: "",
      city: "",
      zipCode: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmLegal: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/auth/register", values)

        if (response.status === 201) {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          })
          setPopupSuccess(true)

          if (res.error) {
            setPopupError(true)

            return
          }

          setTimeout(() => {
            router.push("/")
          }, 5000)
        }
      } catch (error) {
        setPopupError(true)
      }
    },
  })
  const cssInput =
    "form-input px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors w-full"

  return (
    <main className="flex flex-col items-center justify-center ">
      <DialogPopUp
        isOpen={popupError}
        setIsOpen={setPopupError}
        title="Error"
        content={t("errorRegistering")}
        buttonMain={{ text: "OK" }}
        error
      />
      <DialogPopUp
        isOpen={popupSuccess}
        setIsOpen={setPopupSuccess}
        title="Success"
        content={t("successRegistering")}
        success
      />
      <h1 className="text-5xl font-bold pt-8">{t("title")}</h1>
      <p className="font-semibold p-4 text-center text-lg">
        {t("description")}
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 rounded-lg"
      >
        <div className="flex gap-4">
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder={t("firstName")}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className={cssInput}
          />
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder={t("lastName")}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className={cssInput}
          />
        </div>
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        ) : null}
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        ) : null}

        <UsernameSelector
          changeUsername={(username) =>
            formik.setFieldValue("username", username)
          }
          username={formik.values.username}
          styles={cssInput}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}

        <div>
          <PhoneInput
            className={cssInput}
            defaultCountry={currentLocale.toUpperCase()}
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue("phone", value || "")}
            placeholder={t("phone")}
          />

          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>
        <CountrySelector
          changeCountry={(locale) => formik.setFieldValue("country", locale)}
          country={formik.values.country}
          styles={cssInput}
        />

        {formik.touched.country && formik.errors.country ? (
          <div className="text-red-500 text-sm">{formik.errors.country}</div>
        ) : null}

        <CitySelector
          changeCity={(city) => formik.setFieldValue("city", city)}
          city={formik.values.city}
          country={formik.values.country}
          styles={cssInput}
        />

        {formik.touched.city && formik.errors.city ? (
          <div className="text-red-500 text-sm">{formik.errors.city}</div>
        ) : null}

        <input
          id="zipCode"
          name="zipCode"
          type="text"
          placeholder={t("zipCode")}
          onChange={formik.handleChange}
          value={formik.values.zipCode}
          className={cssInput}
        />
        {formik.touched.zipCode && formik.errors.zipCode ? (
          <div className="text-red-500 text-sm">{formik.errors.zipCode}</div>
        ) : null}

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

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={t("confirmPassword")}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className={cssInput}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">
            {formik.errors.confirmPassword}
          </div>
        ) : null}

        <label className="flex items-center">
          <input
            id="confirmLegal"
            name="confirmLegal"
            type="checkbox"
            onChange={formik.handleChange}
            value={formik.values.confirmLegal.toString()}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">{t("confirmLegal")}</span>
        </label>
        {formik.touched.confirmLegal && formik.errors.confirmLegal ? (
          <div className="text-red-500 text-sm">
            {formik.errors.confirmLegal}
          </div>
        ) : null}

        <Button isSubmit isMain>
          {t("submit")}
        </Button>
      </form>
    </main>
  )
}

export default Signup
