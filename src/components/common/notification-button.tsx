'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
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
import EmptyState from '~/components/common/empty-state'
import { fetchProfileImage } from '~/utils/fetch-profile-image'
import defaultProfile from '~/assets/svgs/default-profile.svg'

type UserProfileMap = {
  [userId: string]: string | null
}

function NotificationButton() {
  const { notify } = useNotifyStore()
  const previewNotify = notify.slice(0, 10)

  const [profileMap, setProfileMap] = useState<UserProfileMap>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const loadProfiles = async () => {
      const senderIds = Array.from(
        new Set(notify.map((n) => n.sender_is).filter(Boolean)),
      )
      const profiles = await fetchProfileImage(senderIds)
      setProfileMap(profiles)
    }

    if (notify.length > 0) loadProfiles()
  }, [notify])

  const handleClose = () => {
    setOpen(false)
  }

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
                profileImage={profileMap[item.sender_is] || defaultProfile}
                onClick={handleClose}
              />
            ))
          ) : (
            <EmptyState
              title="No new notifications."
              subTitle="Try engaging with the community!"
            />
          )}
        </div>
        <div className="pt-6">
          <Button className="h-12 w-full py-3 text-center" asChild>
            <Link href="/notify" onClick={handleClose}>
              View All
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { NotificationButton }
