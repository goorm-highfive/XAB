import { HeaderPrevType } from '~/components/header-prev-type'
import { ProfileEditLayout } from '~/components/profile-edit-layout'
import { ProfileInfo } from '~/components/profile-info'
import { ProfileDelete } from '~/components/profile-delete'

function ProfileInfoPage() {
  return (
    <>
      <HeaderPrevType pageTitle={'Setting'} />
      <div className="mx-auto h-screen max-w-[736px]">
        <ProfileEditLayout contentTitle={'Profile Settings'}>
          <ProfileInfo></ProfileInfo>
        </ProfileEditLayout>
        <ProfileEditLayout contentTitle={'Danger Zone'}>
          <ProfileDelete></ProfileDelete>
        </ProfileEditLayout>
      </div>
    </>
  )
}

export default ProfileInfoPage
