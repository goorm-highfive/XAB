import { UserListModal } from '~/components/profile/profile-user-list-modal'

export default function FollowersPage() {
  return (
    <UserListModal title="Followers" apiEndpoint="/api/profile/followers" />
  )
}
