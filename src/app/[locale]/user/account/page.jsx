/* eslint-disable arrow-body-style */
import getTranslTitle from "@/assets/functions/getTranslTitle"
import Header from "@/components/header/Header"

export const metadata = async () => {
  const translation = await getTranslTitle("userAccount")

  return {
    title: translation.title,
  }
}
const userAccountPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">User Account</h1>
        <h2>
          This is the user account page. You can see your account details here.
          If the user was an admin, they would be able to see the admin panel
          here. An admin can manage users, locations, and other data.
        </h2>
      </div>
    </div>
  )
}

export default userAccountPage
