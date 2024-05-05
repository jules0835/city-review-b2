"use client"
import { locationSteps } from "@/assets/constants/locations"
import { redirect } from "next/navigation"
import BotNavigation from "@/components/locations/BotNavigation"
import { useLocationForm } from "@/context/LocationFormContext"
import TopNavigation from "@/components/locations/TopNavigation"
import { useEffect } from "react"

const getStepAction = (stepName, action) => {
  const step = locationSteps.find((stepN) => stepN.stepName === stepName)

  if (!step) {
    return redirect("/404")
  }

  if (!action) {
    return step
  }

  const newStepId = action === "next" ? step.stepId + 1 : step.stepId - 1
  const newStep = locationSteps.find((stepI) => stepI.stepId === newStepId)

  if (!newStep) {
    return redirect("/404")
  }

  return newStep.stepName
}
const checkStepValidity = (step, formik) => {
  const steps = [
    "name",
    "address",
    "structure",
    "type",
    "description",
    "amenities",
    "price",
    "recap",
  ]

  for (let i = 0; i < steps.indexOf(step); i += 1) {
    const field = steps[i]

    if (formik.errors[field]) {
      return field
    }
  }

  return step
}
const NewLocationLayout = ({ children, params }) => {
  const { step } = params
  const { formik } = useLocationForm()

  useEffect(() => {
    const newStep = checkStepValidity(step, formik)

    if (newStep !== step) {
      redirect(`/user/locations/${params.locationid}/${newStep}`)
    }
  }, [step, params.locationid, formik])

  return (
    <section>
      <TopNavigation formik={formik} />

      <div className="pt-24">{children}</div>
      <div>
        <BotNavigation
          formik={formik}
          step={step}
          params={params}
          getStepAction={getStepAction}
        />
      </div>
    </section>
  )
}

export default NewLocationLayout
