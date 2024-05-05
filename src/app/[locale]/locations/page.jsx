import LocationsDisplay from "@/components/locations/display/list/LocationsDisplay"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("locations")

  return {
    title: translation.title,
  }
}
const Search = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)

  return (
    <main className="mx-10 mb-5">
      <LocationsDisplay session={session} searchQuery={searchParams} />
    </main>
  )
}

export default Search
