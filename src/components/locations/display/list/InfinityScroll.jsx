/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
"use client"
import LocationDisplay from "@/components/locations/display/list/LocationDisplay"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import axios from "axios"
import GridLocations from "@/components/skeletons/GridLocations"

// eslint-disable-next-line max-lines-per-function
const InfinityScroll = ({
  session,
  initialLocations,
  searchQuery,
  initialLocationsLength,
}) => {
  const [locations, setLocations] = useState(initialLocations)
  const [page, setPage] = useState(1)
  const [moreIsAvailable, setMoreIsAvailable] = useState(true)
  const { ref, inView } = useInView()
  const loadMoreLocations = async () => {
    const nextPage = page + 1
    const newLocations = await axios
      .get(
        `/api/locations?limit=12&page=${nextPage}&userId=${session?.user?.userId}${
          searchQuery.search ? `&name=${searchQuery.search}` : ""
        }${searchQuery.structure ? `&structure=${searchQuery.structure}` : ""}`
      )
      .then((res) => res.data.locations)
    setMoreIsAvailable(newLocations.moreIsAvailable)
    setLocations((prevLocations) => [
      ...prevLocations,
      ...newLocations.locations,
    ])
    setPage(nextPage)
  }

  useEffect(() => {
    setLocations(initialLocations)
    setPage(1)
    setMoreIsAvailable(true)
  }, [initialLocations])

  useEffect(() => {
    if (inView && moreIsAvailable) {
      loadMoreLocations()
    }
  }, [inView])

  const handleSetLike = (locationId) => {
    const newLocations = locations.map((location) => {
      if (location._id === locationId) {
        location.isLikedByUser = !location.isLikedByUser
      }

      return location
    })
    setLocations(newLocations)
  }

  return (
    <div>
      {locations.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-4">
            {locations &&
              JSON.parse(JSON.stringify(locations)).map((location) => (
                <div key={location._id}>
                  <LocationDisplay
                    location={location}
                    session={session}
                    setLikeInLocations={handleSetLike}
                  />
                </div>
              ))}
          </div>
          {moreIsAvailable &&
          initialLocations.length >= initialLocationsLength ? (
            <div ref={ref} className="mt-4">
              <GridLocations gridFormat={4} />
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <h1>You have reached the end</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1>No locations found</h1>
        </div>
      )}
    </div>
  )
}

export default InfinityScroll
