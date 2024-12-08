import Link from "next/link"
import Image from "next/image"
import { Phone } from 'lucide-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#a2d6b5]">
      <header className="border-b border-black bg-[#a2d6b5] backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="https://kinnectdata.com" className="flex items-center space-x-2">
            <Image 
              src="https://kinnectdata.com/wp-content/uploads/2023/09/LOGO.jpeg" 
              alt="Kinnect Data" 
              width={150} 
              height={40} 
              className="h-10 w-auto dark:invert"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">+1 929-235-1356</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}

