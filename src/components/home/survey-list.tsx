import { SurveyCard } from '~/components/common/survey-card/survey-card'
import { fetchUserAuth } from '~/utils/fetch-user-auth'
import { headers } from 'next/headers'

// 게시글 데이터 타입 정의
type Post = {
  post_id: number
  post_user_id: string
  username: string
  post_image_url: string | null
  post_caption: string
  post_created_at: string
  post_updated_at?: string
  ab_test_id?: number | null
  variant_a_url?: string | null
  variant_b_url?: string | null
  description_a?: string | null
  description_b?: string | null
  ab_test_created_at?: string | null
  ab_test_updated_at?: string | null
  comments_count: number
  likes_count: number
  userLiked?: boolean
  userVote?: 'A' | 'B' | null
  votesA?: number
  votesB?: number
}

async function SurveyList({ type, id }: { type: string; id: string | null }) {
  // 사용자 인증 및 헤더 정보 가져오기 (서버 컴포넌트)
  const authResult = await fetchUserAuth()
  const clientHeaders = await headers() // 클라이언트가 보낸 헤더
  const { user } = authResult || {}

  if (!user?.id) {
    return <p>사용자 인증이 필요합니다.</p>
  }

  // API 기본 URL (환경변수 또는 기본값)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  // 'feed' 타입일 경우 페이지네이션을 위한 쿼리 파라미터 추가 (초기 페이지: 1)
  const apiUrl =
    type === 'feed'
      ? `${baseUrl}/api/posts/feed?page=1`
      : `${baseUrl}/api/profile/${id}/user-posts`

  try {
    // Authorization 및 Cookie 헤더 값 설정 (없으면 빈 문자열)
    const authorizationHeader = clientHeaders.get('Authorization') || ''
    const cookieHeader = clientHeaders.get('Cookie') || ''

    // 데이터 페칭
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: authorizationHeader,
        Cookie: cookieHeader,
      },
    })

    // API 응답은 { data: Post[]; nextPage: number | null } 형태로 가정
    const { data, nextPage }: { data: Post[]; nextPage: number | null } =
      await res.json()
    console.log(data)
    console.log('nextPage: ' + nextPage)

    // 렌더링: SurveyCard 컴포넌트를 이용해 게시글 표시
    return (
      <>
        {data.map((post) => (
          <SurveyCard currentUserId={user?.id} key={post.post_id} {...post} />
        ))}
      </>
    )
  } catch (error) {
    console.error('API 요청 실패:', error)
    return <p>게시글을 가져오는 도중 문제가 발생했습니다.</p>
  }
}

export { SurveyList }
