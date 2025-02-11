'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import type { Tables } from '~/types/supabase'
import { createClient } from '~/utils/supabase/client'

type NotifyItemProps = {
  item: Tables<'notifications'>
  createdAt: string
  closeSheet: () => void
}

const handleIsRead = async (id: number) => {
  await createClient()
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
}

function NotifyItem({ item, createdAt, closeSheet }: NotifyItemProps) {
  const { is_read, action, id, post_id } = item

  const [read, setRead] = useState(is_read)

  const handleClick = async () => {
    setRead(true)
    await handleIsRead(id)
    closeSheet()
  }

  const content = (
    <Alert
      onClick={handleClick}
      className={`relative my-4 flex cursor-pointer justify-between p-4 pr-10 ${read ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="items-top flex">
        <div className="mr-4">
          <div className="h-12 w-12 rounded-full bg-gray-300" />
        </div>
        <div>
          <AlertTitle className="text-base font-semibold">
            <span className="font-normal">{action || 'undefined'}</span>
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            {createdAt}
          </AlertDescription>
        </div>
      </div>
      {is_read ? null : (
        <div className="absolute right-4 h-3 w-3 rounded-full bg-chart-1" />
      )}
    </Alert>
  )

  return post_id ? (
    <Link href={`/survey-detail/${post_id}`} onClick={closeSheet}>
      {content}
    </Link>
  ) : (
    content
  )
}

export { NotifyItem }
