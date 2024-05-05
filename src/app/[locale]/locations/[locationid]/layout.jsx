import { redirect } from "next/navigation"
import { findLocation } from "@/db/crud/locationCrud"

async function fetchLocation(id) {
  const res = await findLocation({ _id: id })

  if (!res) {
    return undefined
  }

  return res
}

const NewLocationLayout = async ({ children, params }) => {
  const location = await fetchLocation(params.locationid)

  if (!location) {
    redirect("/404")
  }

  return <section>{children}</section>
}

export default NewLocationLayout
