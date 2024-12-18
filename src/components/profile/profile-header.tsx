import { Button } from '~/components/ui/button'
import Link from 'next/link'

function ProfileHeader() {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow">
      {/*Avatar*/}
      <div className="mb-4 h-24 w-24 rounded-full bg-gray-300"></div>
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-2xl font-bold">Alex Thompson</h2>
          <p className="text-gray-500">@alexthompson</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-black text-white hover:bg-gray-800">
            Edit Profile
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            Follow
          </Button>
        </div>
      </div>

      <p className="text-gray-600">
        {/*설명하는 부분 */}
        UX Researcher | A/B Testing Enthusiast | Data Driven Designer
      </p>
      <div className="mt-2 flex gap-6 text-gray-800">
        <Link href="/profile/followings">
          <strong>1,234</strong> Following
        </Link>

        <Link href="/profile/followers">
          <strong>5,678</strong> Followers
        </Link>

        <span>
          <strong>789</strong> Surveys
        </span>
        {/* 유저 상태에 따라 다르게 접근 되어야 함*/}
      </div>
    </div>
  )
}
export { ProfileHeader }
