'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import type { Tables } from '~/types/supabase'
import { createClient } from '~/utils/supabase/client'
import defaultProfile from '~/assets/svgs/default-profile.svg'

type NotifyItemProps = {
  item: Tables<'notifications'>
  createdAt: string
  profileImage?: string | null
}

const handleIsRead = async (id: number) => {
  await createClient()
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
}

function NotifyItem({ item, createdAt, profileImage }: NotifyItemProps) {
  const { is_read, action, id, post_id, sender_is } = item
  const [read, setRead] = useState(is_read)

  const getNotificationLink = () => {
    if (action.includes('following')) return `/profile/${sender_is}`
    if (post_id) return `/survey-detail/${post_id}`
    return '/notify'
  }

  const handleClick = async () => {
    setRead(true)
    await handleIsRead(id)
  }

  return (
    <Link href={getNotificationLink()}>
      <Alert
        onClick={handleClick}
        className={`relative my-4 flex cursor-pointer justify-between p-4 pr-10 ${read ? 'opacity-50' : 'opacity-100'}`}
      >
        <div className="items-top flex">
          <div className="relative mr-4 h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
            <Image
              fill
              className="object-cover"
              src={profileImage || defaultProfile}
              sizes="(max-width: 640px) 40px, (max-width: 1024px) 80px, 120px"
              alt="프로필 이미지"
              quality={75}
            />
          </div>
          <div>
            <AlertTitle className="font-semibold leading-normal">
              <span className="font-normal">{action || 'undefined'}</span>
            </AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              {createdAt}
            </AlertDescription>
          </div>
        </div>
        {is_read ? null : (
          <div className="absolute right-4 h-3 w-3 rounded-full bg-chart-1" />
        )}
      </Alert>
    </Link>
  )
}

export { NotifyItem }
