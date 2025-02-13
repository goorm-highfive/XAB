'use client'

import { useState } from 'react'
import { NotifyItem } from '~/components/notify/notify-item'
import { Tables } from '~/types/supabase'
import { ChevronDown } from 'lucide-react'

type NotifyGroupProps = {
  groupedNotifications: { [date: string]: Tables<'notifications'>[] }
  profileMap: { [userId: string]: string | null }
  onClick?: () => void
}

function NotifyGroup({
  groupedNotifications,
  profileMap,
  onClick,
}: NotifyGroupProps) {
  const [expandedDates, setExpandedDates] = useState<{
    [key: string]: boolean
  }>({})

  return (
    <>
      {Object.entries(groupedNotifications).map(([date, notifications]) => (
        <div key={date} className="mb-4">
          <div
            className="flex cursor-pointer items-center justify-between border-b py-2"
            onClick={() =>
              setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }))
            }
          >
            <h3 className="text-sm font-semibold text-gray-600">{date}</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expandedDates[date] ? 'rotate-180' : ''}`}
            />
          </div>
          {expandedDates[date] && (
            <div className="mt-2">
              {notifications.map((item) => (
                <NotifyItem
                  key={item.id}
                  createdAt={date}
                  item={item}
                  profileImage={profileMap[item.sender_is] || null}
                  onClick={() => onClick}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export { NotifyGroup }
