'use client'

import { useState, useEffect } from 'react'
import EmptyState from '~/components/common/empty-state'
import { NotifyGroup } from '~/components/notify/notify-group'
import { useNotifyStore } from '~/stores/notify-store'
import { Tables } from '~/types/supabase'
import { fetchProfileImage } from '~/utils//fetch-profile-image'

type GroupedNotify = {
  [created_at: string]: Tables<'notifications'>[]
}

type UserProfileMap = {
  [userId: string]: string | null
}

function NotifyPage(onClick: () => void) {
  const { notify } = useNotifyStore()
  const [profileMap, setProfileMap] = useState<UserProfileMap>({})

  const groupedData = notify.reduce<GroupedNotify>((acc, curr) => {
    const createdAt = curr.created_at?.split('T')[0] || 'Unknown'

    if (!acc[createdAt]) {
      acc[createdAt] = []
    }
    acc[createdAt].push(curr)
    return acc
  }, {})

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

  return (
    <div>
      <ul>
        {notify.length > 0 ? (
          Object.entries(groupedData).map(([createdAt, items]) => (
            <NotifyGroup
              key={createdAt}
              createdAt={createdAt}
              items={items}
              profileMap={profileMap}
              onClick={onClick}
            />
          ))
        ) : (
          <li>
            <EmptyState
              title="No new notifications."
              subTitle="Try engaging with the community!"
            />
          </li>
        )}
      </ul>
    </div>
  )
}

export default NotifyPage
