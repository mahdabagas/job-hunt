import Navbar from '@/components/layouts/Navbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import Footer from '@/components/layouts/Footer'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/providers/AuthProvider'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Hunt',
  description: 'Job Hunt is an online platform that helps people find jobs or career opportunities that are a good fit for their skills and interests. The website has a variety of features and resources to help users explore the job market and build their careers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <AuthProvider>
          <Navbar/>
          <main>
            {children}
          </main>
          <Footer/>
          <Toaster/>
        </AuthProvider>
      </body>
    </html>
  )
}
