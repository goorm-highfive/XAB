'use client'

import { UserListModal } from '~/components/profile/profile-user-list-modal'
import { useSearchParams } from 'next/navigation'

function FollowingsPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <UserListModal
      title="Followings"
      apiEndpoint={`/api/profile/${id}/followings`}
    />
  )
}
export default FollowingsPage
