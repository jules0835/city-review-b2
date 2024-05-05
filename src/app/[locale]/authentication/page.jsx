import Auth from "@/components/auth/Auth"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("authentication")

  return {
    title: translation.title,
  }
}
const Authentication = () => (
  <main className="flex flex-col items-center justify-center p-5">
    <Auth />
  </main>
)

export default Authentication
