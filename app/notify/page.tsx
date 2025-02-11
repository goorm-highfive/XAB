'use client'

import { NotifyGroup } from '~/components/notify/notify-group'
import { useNotifyStore } from '~/stores/notify-store'
import { Tables } from '~/types/supabase'

type GroupedNotify = {
  [created_at: string]: Tables<'notifications'>[]
}

function NotifyPage() {
  const { notify } = useNotifyStore()
  const groupedData = notify.reduce<GroupedNotify>((acc, curr) => {
    const createdAt = curr.created_at?.split('T')[0] || 'Unknown'

    if (!acc[createdAt]) {
      acc[createdAt] = []
    }
    acc[createdAt].push(curr)
    return acc
  }, {})

  return (
    <div>
      <ul>
        {notify.length > 0 ? (
          Object.entries(groupedData).map(([createdAt, items]) => (
            <NotifyGroup key={createdAt} createdAt={createdAt} items={items} />
          ))
        ) : (
          <li className="text-center">
            <p className="text-lg font-semibold">No new notifications.</p>
            <span className="text-sm">Try engaging with the community!</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NotifyPage
