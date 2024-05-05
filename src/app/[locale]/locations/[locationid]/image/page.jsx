import Button from "@/components/buttons/Button"
import ImageDisplay from "@/components/locations/display/location/ImageDisplay"
import { findLocation } from "@/db/crud/locationCrud"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("locationImage")

  return {
    title: translation.title,
  }
}
const ImagePage = async ({ params }) => {
  const location = await findLocation({
    _id: params.locationid,
  })

  return (
    <div>
      <div className="text-center m-5">
        <Button withLink={`/locations/${params.locationid}`} isMain>
          Go back
        </Button>
      </div>
      <ImageDisplay
        locationImages={location ? location.pictures : []}
        returnUrl={`/locations/${params.locationid}`}
      />
    </div>
  )
}

export default ImagePage
