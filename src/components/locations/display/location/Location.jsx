/* eslint-disable no-underscore-dangle */
import LikeBtn from "@/components/buttons/LikeBtn"
import TopLocationContent from "@/components/locations/display/location/TopLocationContent"
import BotLocationContent from "@/components/locations/display/location/BotLocationContent"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ShareButton from "@/components/buttons/ShareButton"

const Location = async ({ location }) => {
  const session = await getServerSession(authOptions)

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl">
          <h1>{location.name}</h1>
        </div>
        <div className="flex items-center">
          <ShareButton locationId={location._id} />
          <div className="flex items-center">
            <LikeBtn
              locationId={location._id}
              isLiked={location.isLikedByUser}
            />
          </div>
        </div>
      </div>
      <div className="locationContent">
        <TopLocationContent location={location} session={session} />
        <BotLocationContent location={location} session={session} />
      </div>
    </div>
  )
}

export default Location
