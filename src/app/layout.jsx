import { AuthProvider } from "@/app/Provider"

export default function RootLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}
