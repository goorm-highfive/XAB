import { HeaderPrevType } from '~/components/header-prev-type'
import { ProfileEditLayout } from '~/components/profile-edit-layout'
import { ProfileInfo } from '~/components/profile-info'
import { ProfileDelete } from '~/components/profile-delete'
import { Toaster } from '~/components/ui/sonner'

// 개인정보 페이지
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
      <Toaster
        toastOptions={{
          duration: 1000, // 알림이 1초 후에 사라짐
          className: 'z-10', // z-index 수정
        }}
      />
    </>
  )
}

export default ProfileInfoPage
