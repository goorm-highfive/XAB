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

function NotifyPage() {
  const { notify } = useNotifyStore()
  const [profileMap, setProfileMap] = useState<UserProfileMap>({})

  const groupedData = notify.reduce<{
    today: GroupedNotify
    previous: GroupedNotify
  }>(
    (acc, curr) => {
      const today = new Date().toISOString().split('T')[0]
      const createdAt = curr.created_at?.split('T')[0] || 'Unknown'

      if (createdAt === today) {
        if (!acc.today[createdAt]) acc.today[createdAt] = []
        acc.today[createdAt].push(curr)
      } else {
        if (!acc.previous[createdAt]) acc.previous[createdAt] = []
        acc.previous[createdAt].push(curr)
      }
      return acc
    },
    { today: {}, previous: {} },
  )

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
    <div className="mx-auto max-w-xl">
      <section>
        <h2 className="mb-2 text-lg font-semibold">
          Today&apos;s Notifications
        </h2>
        {Object.keys(groupedData.today).length > 0 ? (
          <NotifyGroup
            groupedNotifications={groupedData.today}
            profileMap={profileMap}
          />
        ) : (
          <EmptyState
            title="No new notifications today."
            subTitle="Try engaging with the community!"
          />
        )}
      </section>
      <section className="pt-14">
        <h2 className="mb-2 text-lg font-semibold">Previous Notifications</h2>
        {Object.keys(groupedData.previous).length > 0 ? (
          <NotifyGroup
            groupedNotifications={groupedData.previous}
            profileMap={profileMap}
          />
        ) : (
          <EmptyState
            title="No previous notifications."
            subTitle="You're all caught up!"
          />
        )}
      </section>
    </div>
  )
}

export default NotifyPage
