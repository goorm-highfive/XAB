// components/survey-detail/survey-comment-section.tsx
'use client'

import { MessageSquareDashed } from 'lucide-react'

import EmptyState from '~/components/common/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { SurveyComment } from '~/components/survey-detail/survey-comment'
import { SurveyCommentInput } from '~/components/survey-detail/survey-comment-input'
import { useComments } from '~/hooks/use-comments'
import { useRealtimeComments } from '~/hooks/use-realtime-comments'
import { Comment } from '~/types/comment'

type CommentsSectionProps = {
  currentUserId: string
  postId: number
  currentUserName: string
}

export function CommentsSection({
  currentUserId,
  postId,
}: CommentsSectionProps) {
  const { commentsQuery } = useComments(postId)
  const { data } = commentsQuery
  const commentsData = data?.comments || []
  const commentsCount = data?.comments_count || 0

  // Supabase 리얼타임 구독을 통해 해당 게시글의 댓글을 실시간 업데이트합니다.
  useRealtimeComments(postId)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Comments ({commentsCount})</CardTitle>
      </CardHeader>
      <CardContent>
        {commentsData?.length > 0 ? (
          commentsData?.map((comment: Comment) => (
            <SurveyComment
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <EmptyState
            type="default"
            icon={<MessageSquareDashed size={24} />}
            title="No comments yet"
            subTitle="Be the first to comment."
          />
        )}
        <SurveyCommentInput postId={postId} />
      </CardContent>
    </Card>
  )
}
