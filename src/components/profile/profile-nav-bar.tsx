import { Bell, User } from 'lucide-react'
import Image from 'next/image'
import { Button } from '~/components/ui/button'

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/xAB.svg" alt="Website Logo" />
      </div>

      {/* Navbar 메뉴 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </Button>
      </div>
    </nav>
  )
}

export { Navbar }
