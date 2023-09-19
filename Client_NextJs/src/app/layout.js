import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DMe',
  description: 'Direct Message me',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head><Link rel="icon" href="./icon.svg" sizes="any" /></Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
