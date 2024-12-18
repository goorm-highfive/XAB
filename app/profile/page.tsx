import { ProfileHeader } from '../../src/components/profile/profile-header'
import { SurveyCard } from '../../src/components/profile/profile-survey-card'
import { Navbar } from '../../src/components/profile/profile-nav-bar'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <div className="mx-auto mt-6 max-w-3xl space-y-6">
          <ProfileHeader />
          <SurveyCard
            date="March 15, 2025"
            question="Which landing page design do you prefer for our new product?"
            optionA="Design A"
            optionB="Design B"
            votesA={790}
            votesB={444}
            totalVotes={1234}
          />
          <SurveyCard
            date="March 14, 2025"
            question="Which color scheme resonates better with our brand identity?"
            optionA="Palette A"
            optionB="Palette B"
            votesA={360}
            votesB={496}
            totalVotes={856}
          />
        </div>
      </div>
    </div>
  )
}
