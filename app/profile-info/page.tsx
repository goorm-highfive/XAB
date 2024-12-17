import { HeaderPrevType } from '~/components/HeaderPrevType'
import { ProfileEditLayout } from '~/components/ProfileEditLayout'
import { ProfileInfo } from '~/components/ProfileInfo'
import { ProfileDelete } from '~/components/ProfileDelete'

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
