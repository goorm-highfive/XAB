'use client'

import { SurveyCard } from '~/components/common/survey-card/survey-card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { createClient } from '~/utils/supabase/client'
import { SurveyCardSkeleton } from '~/components/common/survey-card/surveycard-skeleton'

// 게시글 데이터 타입 정의
export type Post = {
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

// API 응답 타입 정의 (구조에 맞게)
type PostsResponse = {
  currentPage: number
  data: Post[]
  nextPage: number | undefined
  hasNextPage: boolean
}

// 페이지네이션된 게시글 데이터를 가져오는 API 호출 함수
const fetchPost = async ({
  pageParam = 1,
  type,
  id,
}: {
  pageParam?: number
  type: string
  id: string
}): Promise<PostsResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const apiUrl =
    type === 'feed'
      ? `${baseUrl}/api/posts/feed?page=${pageParam}`
      : `${baseUrl}/api/profile/${id}/user-posts?page=${pageParam}`

  const response = await fetch(apiUrl, { method: 'GET' })
  if (!response.ok) {
    throw new Error('게시글을 가져오는데 실패했습니다.')
  }
  const data: PostsResponse = await response.json()
  return data
}

// useInfiniteQuery를 사용하는 커스텀 훅
const useInfinitePosts = (type: string, id: string) => {
  return useInfiniteQuery({
    queryKey: ['posts', type, id],
    queryFn: ({ pageParam = 1 }) => fetchPost({ pageParam, type, id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}

interface InfiniteSurveyListProps {
  type: string
  id: string | null
}

function InfiniteSurveyList({ type, id }: InfiniteSurveyListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfinitePosts(type, id || '')
  const { ref, inView } = useInView({ threshold: 0.1 })

  // 현재 로그인된 사용자 정보 가져오기
  const [user, setUser] = useState<{ id: string } | undefined>(undefined)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
    fetchUser()
  }, [])

  // 스크롤 트리거: 뷰포트에 해당 요소가 나타나면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isLoading) return <SurveyCardSkeleton />
  if (error) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      {data?.pages
        .flatMap((page) => page.data)
        .map((post) => (
          <SurveyCard
            currentUserId={user?.id ?? ''}
            key={post.post_id}
            {...post}
          />
        ))}
      <div ref={ref} style={{ height: '1px', margin: '10px 0' }} />
      {isFetchingNextPage && (
        <div className="mt-4 flex justify-center">
          <div className="border-black-500 h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
    </div>
  )
}

export { InfiniteSurveyList }
