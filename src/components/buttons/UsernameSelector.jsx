import { useState, useEffect } from "react"
import axios from "axios"
import { useTranslations } from "next-intl"

const UsernameSelector = ({ changeUsername, styles }) => {
  const t = useTranslations("Auth.username")
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkUsername = async () => {
      if (usernameInput.length > 2) {
        try {
          const response = await axios.get(
            `/api/auth/users/username?username=${usernameInput}`
          )
          setUsernameTaken(response.data.usernameTaken)
          setError("")
        } catch (err) {
          setError("Failed to check username availability.")
          setUsernameTaken(false)
        }
      }
    }
    const timerId = setTimeout(() => {
      checkUsername()
    }, 700)

    return () => clearTimeout(timerId)
  }, [usernameInput])

  useEffect(() => {
    if (!usernameTaken) {
      changeUsername(usernameInput)
    } else {
      changeUsername("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameTaken, usernameInput])

  return (
    <div>
      <input
        className={`${styles} ${usernameTaken ? "border-red-500" : ""}`}
        value={usernameInput}
        onChange={(event) => setUsernameInput(event.target.value)}
        placeholder={t("selectUsername")}
      />
      {usernameTaken && (
        <div className="text-red-500 text-sm">{t("usernameTaken")}</div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  )
}

export default UsernameSelector
