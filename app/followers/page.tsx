'use client'

import { UserListModal } from '~/components/profile/profile-user-list-modal'
import { useSearchParams } from 'next/navigation'

function FollowersPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <UserListModal
      title="Followers"
      apiEndpoint={`/api/profile/${id}/followers`} // id를 사용하여 API 엔드포인트 생성
    />
  )
}

export default FollowersPage
