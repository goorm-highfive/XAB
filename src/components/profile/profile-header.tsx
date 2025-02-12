// app/components/ProfileHeader.server.tsx
import Image from 'next/image'
import Link from 'next/link'
import { SettingButton } from '~/components/profile/profile-setting-button'
import { Button } from '~/components/ui/button'
import defaultProfile from '~/assets/svgs/default-profile.svg'
import { headers } from 'next/headers'
import { FollowButton } from '../common/follow-button'

type Props = {
  profileId: string
  currentUserId: string | null
}

async function ProfileHeader({ profileId, currentUserId }: Props) {
  const id = profileId
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const apiUrl = `${baseUrl}/api/profile/${id}/user-profile`
  const clientHeaders = await headers()

  const authorizationHeader = clientHeaders.get('Authorization') || ''
  const cookieHeader = clientHeaders.get('Cookie') || ''

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: authorizationHeader,
      Cookie: cookieHeader,
    },
  })

  if (!res.ok) {
    return (
      <p className="text-red-500">
        Error: 사용자 프로필을 불러오지 못했습니다.
      </p>
    )
  }

  const userData: {
    username: string
    bio: string
    profile_image: string | null
    followerCount: number
    followingCount: number
    postCount: number
    isFollowing: boolean
  } = await res.json()

  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow">
      {/* Avatar */}
      <div className="relative mb-4 h-[70px] w-[70px] overflow-hidden rounded-full">
<<<<<<< HEAD
        {userData?.profile_image && (
          <Image
            fill
            className="object-cover"
            src={userData.profile_image || defaultProfile}
            sizes="(max-width: 640px) 40px, (max-width: 1024px) 80px, 120px"
            alt="프로필 이미지"
            quality={75}
          />
        )}
=======
        <Image
          fill
          className="object-cover"
          src={userData.profile_image || defaultProfile}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          alt="Profile Picture"
        />
>>>>>>> 17b27f3 (refactor:  suggest-user, 팔로우 관련 기능 리팩토링 (#113))
      </div>

      {/* Header 상단 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{userData.username || 'Guest'}</h2>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-2">
          {currentUserId === id ? (
            <>
              <Link href="/settings/personal-information" passHref>
                <Button variant="default">Edit Profile</Button>
              </Link>
              <SettingButton />
            </>
          ) : (
            <FollowButton
              userId={id}
              isFollowing={userData.isFollowing}
              style={'w-24'}
            />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600">
        {userData.bio || 'User bio not available'}
      </p>

      {/* Stats */}
      <div className="mt-4 flex gap-6 text-sm text-gray-700">
        <Link href={`/profile/${id}/followings`} className="hover:underline">
          <strong>{userData.followingCount || 0}</strong> Following
        </Link>
        <Link href={`/profile/${id}/followers`} className="hover:underline">
          <strong>{userData.followerCount || 0}</strong> Followers
        </Link>
        <span>
          <strong>{userData.postCount || 0}</strong> Posts
        </span>
      </div>
    </div>
  )
}

export { ProfileHeader }
