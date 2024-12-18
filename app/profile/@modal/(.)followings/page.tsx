import UserListModal from '~/components/profile/profile-user-list-modal'

export default function FollowersPage() {
  return <UserListModal title="Followings" apiEndpoint="/api/followings" />
}
