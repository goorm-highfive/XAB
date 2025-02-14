import { NextResponse } from 'next/server'
import { createClient } from '~/utils/supabase/server' // 서버용 Supabase 클라이언트 가져오기

export async function GET(request: Request) {
  const supabase = await createClient()
  console.log('API 호출 시작')

  // 페이지네이션: URL 쿼리 파라미터에서 page 값 읽기 (기본값: 1)
  const { searchParams } = new URL(request.url)
  const pageParam = searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1
  const limit = 5 // 한 페이지 당 데이터 수
  const offset = (page - 1) * limit

  try {
    // 1) Supabase Auth 세션 확인
    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser()

    if (sessionError) {
      throw new Error(sessionError.message)
    }
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = user.id

    // 2) 팔로우하는 유저들의 ID 가져오기
    const { data: followingData, error: followingError } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId)

    if (followingError) {
      throw new Error(followingError.message)
    }
    const followingIds = [
      ...followingData.map((follow) => follow.following_id),
      userId,
    ]

    // 3) 팔로우하는 유저들과 본인의 포스트 가져오기 (페이지네이션 적용)
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select(
        `
        id,
        user_id,
        image_url,
        caption,
        created_at,
        updated_at,
        ab_tests (
          id,
          post_id,
          variant_a_url,
          variant_b_url,
          description_a,
          description_b,
          created_at,
          updated_at,
          ab_test_votes (
            id,
            user_id,
            preferred_variant,
            created_at
          )
        ),
        comments (id),
        likes (user_id),
        users (username)
      `,
      )
      .in('user_id', followingIds)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (postsError) {
      throw new Error(postsError.message)
    }
    if (!posts) {
      return NextResponse.json(
        {
          data: [],
          currentPage: page,
          nextPage: undefined,
          hasNextPage: false,
        },
        { status: 200 },
      )
    }

    // 4) 현재 사용자가 좋아요를 누른 포스트 ID 목록 가져오기
    const postIds = posts.map((post) => post.id)
    const { data: userLikes, error: userLikesError } = await supabase
      .from('likes')
      .select('post_id')
      .in('post_id', postIds)
      .eq('user_id', userId)

    if (userLikesError) {
      throw new Error(userLikesError.message)
    }
    const userLikedPostIds = userLikes?.map((like) => like.post_id) || []

    // 5) 각 포스트 데이터 포맷팅
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        let userVote: 'A' | 'B' | null = null
        let votesA = 0
        let votesB = 0

        if (post.ab_tests && post.ab_tests[0]?.ab_test_votes) {
          const abTestVotes = post.ab_tests[0].ab_test_votes
          userVote = abTestVotes.find((vote) => vote.user_id === userId)
            ?.preferred_variant as 'A' | 'B' | null
          votesA = abTestVotes.filter(
            (vote) => vote.preferred_variant === 'A',
          ).length
          votesB = abTestVotes.filter(
            (vote) => vote.preferred_variant === 'B',
          ).length
        }

        return {
          post_id: post.id,
          post_user_id: post.user_id,
          username: post.users.username,
          post_image_url: post.image_url,
          post_caption: post.caption,
          post_created_at: post.created_at.split('T')[0],
          post_updated_at: post.updated_at.split('T')[0],
          ab_test_id: post.ab_tests?.[0]?.id || null,
          variant_a_url: post.ab_tests?.[0]?.variant_a_url || null,
          variant_b_url: post.ab_tests?.[0]?.variant_b_url || null,
          description_a: post.ab_tests?.[0]?.description_a || null,
          description_b: post.ab_tests?.[0]?.description_b || null,
          ab_test_created_at:
            post.ab_tests?.[0]?.created_at.split('T')[0] || null,
          ab_test_updated_at:
            post.ab_tests?.[0]?.updated_at.split('T')[0] || null,
          comments: post.comments || [],
          likes: post.likes || [],
          comments_count: post.comments ? post.comments.length : 0,
          likes_count: post.likes ? post.likes.length : 0,
          userLiked: userLikedPostIds.includes(post.id),
          userVote,
          votesA,
          votesB,
        }
      }),
    )

    // 페이지네이션 결과:
    // - 만약 posts.length === limit이면 더 많은 데이터가 있을 것으로 간주하여 nextPage는 page + 1, hasNextPage는 true.
    // - 그렇지 않으면 nextPage는 undefined, hasNextPage는 false.
    const hasNextPage = posts.length === limit
    const nextPage = hasNextPage ? page + 1 : undefined

    console.log('api부분', {
      data: formattedPosts,
      currentPage: page,
      nextPage,
      hasNextPage,
    })
    return NextResponse.json(
      { data: formattedPosts, currentPage: page, nextPage, hasNextPage },
      { status: 200 },
    )
  } catch (err) {
    console.error('Error fetching posts:', err)
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
