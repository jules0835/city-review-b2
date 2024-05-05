import { redirect } from "next/navigation"
import { findLocation } from "@/db/crud/locationCrud"
import { LocationFormProvider } from "@/context/LocationFormContext"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("locationEdit")

  return {
    title: translation.title,
  }
}
async function fetchLocation(id) {
  const res = await findLocation({ _id: id })

  if (!res) {
    return undefined
  }

  return res
}

const NewLocationLayout = async ({ children, params }) => {
  const session = await getServerSession(authOptions)
  const location = await fetchLocation(params.locationid)

  if (
    !location ||
    (location.authorId !== session?.user?.userId && !session?.user?.isAdmin)
  ) {
    redirect("/404")
  }

  const simpleLocation = JSON.parse(JSON.stringify(location))

  return (
    <section>
      <LocationFormProvider location={simpleLocation}>
        {children}
      </LocationFormProvider>
    </section>
  )
}

export default NewLocationLayout
