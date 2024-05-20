import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const inter = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Linkme',
  description: 'Share your links with your community',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <UserProvider>
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </UserProvider>
    </html>
  )
}
