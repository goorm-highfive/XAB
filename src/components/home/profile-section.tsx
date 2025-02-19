// app/components/ProfileSection.server.tsx
import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import defaultProfile from '~/assets/svgs/default-profile.svg'
import { fetchUserAuth } from '~/utils/fetch-user-auth'

// ✅ 서버 컴포넌트로 변환
async function ProfileSection() {
  // ✅ 현재 인증된 사용자 정보 가져오기
  const authResult = await fetchUserAuth()
  const clientHeaders = await headers()

  const { user } = authResult || {}

  if (!user?.id) {
    return <p>사용자 인증이 필요합니다.</p>
  }

  try {
    // ✅ 프로필 데이터 가져오기 (서버 사이드 렌더링)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const apiUrl = `${baseUrl}/api/profile/${user.id}/user-profile`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: clientHeaders.get('Authorization') || '',
        Cookie: clientHeaders.get('Cookie') || '',
      },
      cache: 'no-store', // ✅ SSR 적용
    })

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`)
    }

    const profile = await response.json()
    const profileUrl = `/profile/${user.id}` // 이동할 프로필 페이지 경로

    return (
      // 외부 컨테이너에 sticky 클래스를 적용하여 스크롤 시 고정되게 함
      <div className="sticky top-[92px] hidden w-72 flex-col gap-4 xl:flex">
        <Link href={profileUrl} className="block">
          {/* 내부 Card에서는 fixed 클래스를 제거 */}
          <Card className="w-64 cursor-pointer transition-transform">
            <CardHeader className="items-center gap-5">
              <div className="relative h-[70px] w-[70px] overflow-hidden rounded-full">
                <Image
                  className="object-cover"
                  src={profile.profile_image || defaultProfile}
                  alt={`@${profile.username}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  priority
                />
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <CardTitle>{profile.username}</CardTitle>
                <CardDescription>
                  {profile.bio || 'No bio available'}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold">{profile.followingCount}</span>
                <span className="text-sm text-muted-foreground">Following</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold">{profile.followerCount}</span>
                <span className="text-sm text-muted-foreground">Followers</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold">{profile.postCount}</span>
                <span className="text-sm text-muted-foreground">Posts</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    )
  } catch (error) {
    console.error('ProfileSection 렌더링 중 에러:', error)
    return <p>프로필을 불러오는 중 문제가 발생했습니다.</p>
  }
}

export { ProfileSection }
