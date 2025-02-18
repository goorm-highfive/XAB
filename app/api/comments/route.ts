import { NextRequest, NextResponse } from 'next/server'
import { Tables } from '~/types/supabase'
import { createClient } from '~/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = Number(searchParams.get('postId'))

  const supabase = await createClient()

  try {
    // 1) 현재 사용자 세션 확인
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

    // 2) 댓글 데이터 가져오기
    const { data: commentData, error: commentsError } = await supabase
      .from('comments')
      .select(
        'id, content, created_at, user_id, parent_id, dept, post_id, is_delete, users(username)',
      )
      .eq('post_id', postId)
      .order('parent_id', { ascending: true }) // 부모 댓글이 먼저 정렬되도록 추가
      .order('created_at', { ascending: true }) // 같은 부모 내에서 시간순 정렬
    if (commentsError) throw new Error(commentsError.message)

    const commentsCount = commentData ? commentData.length : 0

    const comments = commentData.map(({ users, ...comment }) => ({
      username: users.username,
      ...comment,
    }))

    // 3) 댓글 좋아요 데이터 가져오기
    const { data: likes, error: likeError } = await supabase
      .from('comment_likes')
      .select('comment_id, user_id')
      .in(
        'comment_id',
        comments.map((comment) => comment.id),
      )
    if (likeError) throw new Error(likeError.message)

    const likeCounts = (likes || []).reduce<Record<number, number>>(
      (acc, like) => {
        acc[like.comment_id] = (acc[like.comment_id] || 0) + 1
        return acc
      },
      {},
    )

    const userLikes = new Set(
      (likes || [])
        .filter((like) => like.user_id === userId)
        .map((like) => like.comment_id),
    )

    // 4) 댓글 데이터를 트리 구조로 변환
    // 댓글을 트리 구조로 변환
    type Comment = Tables<'comments'> & {
      username: string
      likeCount: number
      userLiked: boolean
      replies: Comment[]
    }
    const commentMap: Record<number, Comment> = {}
    const roots: Comment[] = []

    // 먼저 모든 댓글을 commentMap에 등록
    comments.forEach((comment) => {
      commentMap[comment.id] = {
        ...comment,
        likeCount: likeCounts[comment.id] || 0,
        userLiked: userLikes.has(comment.id),
        replies: [],
      }
    })

    // 부모 → 자식 순서로 정렬된 후이므로, 대댓글을 올바른 부모에 추가 가능
    comments.forEach((comment) => {
      if (comment.parent_id === null) {
        roots.push(commentMap[comment.id])
      } else {
        if (commentMap[comment.parent_id]) {
          commentMap[comment.parent_id].replies.push(commentMap[comment.id])
        }
      }
    })

    // 데이터 반환
    return NextResponse.json({ comments: roots, comments_count: commentsCount })
  } catch (error) {
    console.error('Unexpected Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 },
    )
  }
}
