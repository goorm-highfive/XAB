'use client'

import { ChevronDown } from 'lucide-react'
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
  const [expandedDates, setExpandedDates] = useState<{
    [key: string]: boolean
  }>({})

  const groupedData = notify.reduce<{
    today: Tables<'notifications'>[]
    previous: GroupedNotify
  }>(
    (acc, curr) => {
      const today = new Date().toISOString().split('T')[0]
      const createdAt = curr.created_at?.split('T')[0] || 'Unknown'

      if (createdAt === today) {
        acc.today.push(curr)
      } else {
        if (!acc.previous[createdAt]) acc.previous[createdAt] = []
        acc.previous[createdAt].push(curr)
      }
      return acc
    },
    { today: [], previous: {} },
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
        {groupedData.today.length > 0 ? (
          <NotifyGroup
            createdAt="Today"
            items={groupedData.today}
            profileMap={profileMap}
            onClick={onClick}
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
          <>
            {Object.entries(groupedData.previous).map(([createdAt, items]) => (
              <div key={createdAt} className="mb-4">
                <div
                  className="flex cursor-pointer items-center justify-between border-b py-2"
                  onClick={() =>
                    setExpandedDates((prev) => ({
                      ...prev,
                      [createdAt]: !prev[createdAt],
                    }))
                  }
                >
                  <span className="text-gray-800">{createdAt}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedDates[createdAt] ? 'rotate-180' : ''}`}
                  />
                </div>
                {expandedDates[createdAt] && (
                  <div className="mt-2">
                    <NotifyGroup
                      createdAt={createdAt}
                      items={items.slice(0, 5)}
                      profileMap={profileMap}
                      onClick={onClick}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
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
