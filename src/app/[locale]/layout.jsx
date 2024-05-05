import { Inter } from "next/font/google"
import "../../styles/globals.css"
import { NextIntlClientProvider, useMessages } from "next-intl"

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={`${inter.className} bg-gray-100`}>
          <div className="flex-grow">{children}</div>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
