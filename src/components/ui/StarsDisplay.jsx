import { StarBorder, Star, StarHalf } from "@mui/icons-material"

const StarsDisplay = ({ rating, ratingCount = 0, starsLength = 5 }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-2">
      {[...Array(starsLength)].map((_, star) => {
        const starRating = star + 1
        const ratingValue = rating

        if (ratingValue >= starRating) {
          return <Star key={star} />
        } else if (ratingValue + 1 > starRating) {
          return <StarHalf key={star} />
        }

        return <StarBorder key={star} />
      })}
    </div>
    {starsLength === 5 && (
      <p className="text-sm text-gray-500 text-center">{ratingCount} reviews</p>
    )}
  </div>
)

export default StarsDisplay
