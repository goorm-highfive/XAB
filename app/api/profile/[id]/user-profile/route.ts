import { NextResponse, NextRequest } from 'next/server'
import { fetchUserAuth } from '~/utils/fetch-user-auth'
import { createClient } from '~/utils/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  const { id } = await params

  try {
    // 1) 현재 인증 사용자 정보 가져오기 (currentUserId: string | null)
    const currentUser = await fetchUserAuth()
    const currentUserId = currentUser?.user?.id ?? null // undefined 방지

    const userId = id
    // 2) DB에서 해당 사용자의 프로필 정보 조회
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('id, username, email, profile_image, bio, created_at')
      .eq('id', userId)
      .single()

    if (profileError) {
      throw new Error(profileError.message)
    }

    // 3) 해당 사용자의 게시글 수 조회
    const { count: postCount, error: postCountError } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (postCountError) {
      throw new Error(postCountError.message)
    }

    // 4) 팔로워 수 조회 (userId를 팔로우하는 사람 수)
    const { count: followerCount, error: followerCountError } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('following_id', userId)

    if (followerCountError) {
      throw new Error(followerCountError.message)
    }

    // 5) 팔로잉 수 조회 (userId가 팔로우하는 사람 수)
    const { count: followingCount, error: followingCountError } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('follower_id', userId)

    if (followingCountError) {
      throw new Error(followingCountError.message)
    }

    // 6) isFollowing 정보 조회: 현재 사용자(currentUserId)가 userId를 팔로우 중인지
    let isFollowing = false
    if (currentUserId) {
      const { count: isFollowingCount, error: isFollowingError } =
        await supabase
          .from('follows')
          .select('id', { count: 'exact', head: true })
          .eq('follower_id', currentUserId)
          .eq('following_id', userId)
      if (isFollowingError) {
        throw new Error(isFollowingError.message)
      }
      isFollowing = (isFollowingCount || 0) > 0
    }

    // 7) 성공 응답: isFollowing 필드를 포함하여 반환
    return NextResponse.json(
      {
        ...userProfile,
        postCount: postCount || 0,
        followerCount: followerCount || 0,
        followingCount: followingCount || 0,
        isFollowing,
      },
      { status: 200 },
    )
  } catch (err: unknown) {
    console.error('Error fetching user profile:', err)
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
