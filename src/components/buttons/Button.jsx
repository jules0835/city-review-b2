import { Loader2 } from "lucide-react"
import Link from "next/link"

const mainStyles =
  "bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
const secondaryStyles =
  "text-black bg-blue-100 rounded-lg transition-colors font-semibold hover:bg-blue-200"
const Button = ({
  children,
  onClickBtn,
  isMain,
  styles,
  isDisabled,
  isLoading,
  withLink,
  isSubmit,
  padding,
}) => (
  <div>
    {withLink ? (
      <Link href={withLink}>
        <button
          type={isSubmit ? "submit" : "button"}
          onClick={onClickBtn}
          className={`${isMain ? mainStyles : secondaryStyles} ${
            isDisabled || isLoading ? "opacity-60 cursor-not-allowed" : ""
          } ${styles} ${padding || "py-2 px-4"}`}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={25} />
          ) : (
            children
          )}
        </button>
      </Link>
    ) : (
      <button
        type={isSubmit ? "submit" : "button"}
        onClick={onClickBtn}
        className={`${isMain ? mainStyles : secondaryStyles} ${
          isDisabled || isLoading ? "opacity-60 cursor-not-allowed" : ""
        }${styles} ${padding || "py-2 px-4"}`}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" size={25} /> : children}
      </button>
    )}
  </div>
)

export default Button
