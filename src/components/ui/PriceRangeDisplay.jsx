import { AttachMoney } from "@mui/icons-material"

const PriceRangeDisplay = ({ priceRange }) => (
  <div>
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((dollar) => {
        if (priceRange >= dollar) {
          return <AttachMoney key={dollar} />
        }

        return <AttachMoney key={dollar} color="disabled" />
      })}
    </div>
  </div>
)

export default PriceRangeDisplay
