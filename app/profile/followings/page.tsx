import { UserListModal } from '~/components/profile/profile-user-list-modal'

export default function FollowingsPage() {
  return (
    <UserListModal title="Followings" apiEndpoint="/api/profile/followings" />
  )
}
