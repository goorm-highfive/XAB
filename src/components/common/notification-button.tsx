'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { NotifyItem } from '~/components/notify/notify-item'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '~/components/ui/custom-sheet'
import { useNotifyStore } from '~/stores/notify-store'

function NotificationButton() {
  const { notify } = useNotifyStore()
  const previewNotify = notify.slice(0, 10)
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex items-center gap-2">
          <Bell />
          Notifications
        </SheetTitle>
        <SheetDescription className="opacity-0">
          View Notifications
        </SheetDescription>
        <div className="h-5/6 overflow-y-auto">
          {previewNotify.length > 0 ? (
            previewNotify.map((item) => (
              <NotifyItem
                key={item.id}
                item={item}
                createdAt={item.created_at?.split('T')[0] || 'Unknown'}
                closeSheet={() => setOpen(false)}
              />
            ))
          ) : (
            <div className="pt- text-center">
              <p className="text-md font-semibold">No new notifications.</p>
              <span className="text-xs text-gray-500">
                Try engaging with the community!
              </span>
            </div>
          )}
        </div>
        <div className="pt-6">
          <Button className="h-12 w-full py-3 text-center" asChild>
            <Link href="/notify" onClick={() => setOpen(false)}>
              View All
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { NotificationButton }
