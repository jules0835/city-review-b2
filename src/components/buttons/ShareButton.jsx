"use client"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Share, Check } from "@mui/icons-material"

const ShareButton = ({ locationId }) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const hasCopiedText = Boolean(copiedText)

  return (
    <div>
      {!hasCopiedText && (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          disabled={hasCopiedText}
          onClick={() =>
            copyToClipboard(`${window.location.origin}/
            locations/${locationId}`)
          }
        >
          <Share />
          <p>Share</p>
        </div>
      )}
      {hasCopiedText && (
        <div className="flex items-center space-x-2">
          <Check />
        </div>
      )}
    </div>
  )
}

export default ShareButton
