import { Suspense } from 'react'
import { ProfileSection } from '~/components/home/profile-section'
import { SuggestSection } from '~/components/home/suggest-section'
import { NewSurveyButton } from '~/components/home/new-survey-button'
import { ProfileSkeleton } from '~/components/home/profile-skeleton'
import { SuggestSkeleton } from '~/components/home/suggest-section-skeleton'
import { InfiniteSurveyList } from '~/components/home/infinite-survey-list'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-2xl items-start gap-6 p-6 lg:flex">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileSection />
        </Suspense>

        <div className="flex-1 space-y-6">
          <NewSurveyButton />
          <InfiniteSurveyList type="feed" id={null} />
        </div>
        <Suspense fallback={<SuggestSkeleton />}>
          <SuggestSection />
        </Suspense>
      </div>
    </div>
  )
}
