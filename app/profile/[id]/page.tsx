import { ProfileHeader } from '~/components/profile/profile-header'

import { Suspense } from 'react'
import { InfiniteSurveyList } from '~/components/home/infinite-survey-list'
import { fetchUserAuth } from '~/utils/fetch-user-auth'
import { ProfileHeaderSkeleton } from '~/components/profile/profile-header-skeleton'

async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userAuth = await fetchUserAuth() // user 객체 가져오기
  const currentUserId = userAuth?.user?.id ?? null // undefined 방지

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="mx-auto mt-6 max-w-3xl space-y-6">
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeader profileId={id} currentUserId={currentUserId} />
          </Suspense>
          <InfiniteSurveyList type="profile" id={id} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
