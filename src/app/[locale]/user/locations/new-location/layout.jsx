import Header from "@/components/header/Header"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("newLocation")

  return {
    title: translation.title,
  }
}
const NewLocationLayout = ({ children }) => (
  <section>
    <Header />
    {children}
  </section>
)

export default NewLocationLayout
