// app/components/SuggestSection.server.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import defaultProfile from '~/assets/svgs/default-profile.svg'
import { FollowButton } from '~/components/common/follow-button'
import { headers } from 'next/headers'

type SuggestedUser = {
  id: string
  profile_image: string | null
  username: string
  bio: string | null
  // 필요한 경우 isFollowing 정보도 포함할 수 있음.
}

async function SuggestSection() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const apiUrl = `${baseUrl}/api/get-suggested-user`
  const clientHeaders = await headers()

  const authorizationHeader = clientHeaders.get('Authorization') || ''
  const cookieHeader = clientHeaders.get('Cookie') || ''

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: authorizationHeader,
      Cookie: cookieHeader,
    },
    cache: 'no-store', // 항상 최신 데이터를 가져옴
  })

  if (!res.ok) {
    throw new Error('추천 사용자 데이터를 불러오지 못했습니다.')
  }

  const data = await res.json()
  const suggestedUsers: SuggestedUser[] = data.data || []

  return (
    <div className="sticky top-[92px] hidden w-72 flex-col gap-4 xl:flex">
      <Card>
        <CardHeader>
          <CardTitle>추천 사용자</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {suggestedUsers.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <Link
                  href={`/profile/${item.id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      fill
                      className="object-cover"
                      src={item.profile_image || defaultProfile}
                      alt={item.username}
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="font-bold">{item.username}</span>
                  </div>
                </Link>
                {/* FollowButton 클라이언트 컴포넌트 사용 */}
                <div>
                  <FollowButton
                    userId={item.id}
                    isFollowing={false}
                    style={'w-20'}
                  />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export { SuggestSection }
