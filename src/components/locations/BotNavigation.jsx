"use client"

import Button from "@/components/buttons/Button"
import ProgressBar from "@/components/ui/ProgressBar"
import { useState } from "react"

const canClickNextBtn = (step, formik) => {
  if (formik.errors[step]) {
    return false
  }

  return true
}
const BotNavigation = ({ step, params, getStepAction, formik }) => {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)

  return (
    <div className="mt-8 fixed bottom-0 w-full bg-white p-4">
      <ProgressBar progress={getStepAction(step).progression} />
      <div className="flex justify-between mt-4">
        {step === "name" ? (
          <Button isDisabled type={"button"}>
            Back
          </Button>
        ) : (
          <Button
            withLink={`/user/locations/${params.locationid}/${getStepAction(
              step,
              "prev"
            )} `}
            type={"button"}
          >
            Back
          </Button>
        )}

        {step === "recap" ? (
          <Button
            isMain
            isLoading={isLoadingBtn}
            isSubmit
            onClick={() => setIsLoadingBtn(true)}
          >
            Confirme
          </Button>
        ) : (
          <Button
            isMain
            type={"button"}
            isDisabled={!canClickNextBtn(step, formik)}
            withLink={`/user/locations/${params.locationid}/${getStepAction(
              step,
              "next"
            )} `}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default BotNavigation
