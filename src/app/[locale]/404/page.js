import Button from "@/components/buttons/Button"
import Header from "@/components/header/Header"
import getTranslTitle from "@/assets/functions/getTranslTitle"

export const metadata = async () => {
  const translation = await getTranslTitle("notFound")

  return {
    title: translation.title,
  }
}
export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <h1 className="text-9xl font-bold text-center">404</h1>
        <h2 className="text-4xl font-bold text-center mt-10">
          The page you are looking for was not found
        </h2>
        <p className="text-xl text-center mt-5">
          You may have mistyped the address or the page may have moved.
        </p>
        <div className="flex justify-center mt-10">
          <Button withLink={"/"} isMain>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
}
