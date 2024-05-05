import Await from "@/components/skeletons/Await"
import { getLocationsWithQuery } from "@/db/crud/locationCrud"
import { Suspense } from "react"
import GridLocations from "@/components/skeletons/GridLocations"
import InfinityScroll from "@/components/locations/display/list/InfinityScroll"
import SearchFiltersBar from "@/components/locations/display/list/SearchFiltersBar"

const INIT_LOCATIONS_LENGTH = 12
const LocationsDisplay = ({ session, searchQuery }) => {
  const searchOptions = {
    name: searchQuery ? searchQuery.search : "",
    structure: searchQuery ? searchQuery.structure : "",
    type: searchQuery ? searchQuery.type : "",
    free: searchQuery ? searchQuery.free : "",
    country: searchQuery ? searchQuery.country : "",
    city: searchQuery ? searchQuery.city : "",
  }
  const promise = getLocationsWithQuery(
    INIT_LOCATIONS_LENGTH,
    0,
    session?.user?.userId,
    searchOptions
  )

  return (
    <div>
      <div className="flex">
        <SearchFiltersBar />
      </div>
      <Suspense fallback={<GridLocations gridFormat={10} />}>
        <div>
          <Await promise={promise}>
            {({ locations }) =>
              locations && (
                <InfinityScroll
                  initialLocations={locations}
                  session={session}
                  searchQuery={searchQuery}
                  initialLocationsLength={INIT_LOCATIONS_LENGTH}
                />
              )
            }
          </Await>
        </div>
      </Suspense>
    </div>
  )
}

export default LocationsDisplay
