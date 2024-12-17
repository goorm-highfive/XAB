import { PostCommentItem } from '~/components/post-comment-Item'
import { PostCommentInput } from '~/components/post-comment-input'
import { PostView } from '~/components/post-view'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

function PostDetailPage() {
  return (
    <div className="mx-auto h-screen max-w-[1248px]">
      <section>
        <PostView author={'Sarah Anderson'} createDate={'Jan 15, 2025'} />
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Comments (89)</CardTitle>
          </CardHeader>
          <CardContent>
            <PostCommentItem
              writer={'Alex Thompson'}
              message={'내용 1'}
            ></PostCommentItem>
            <PostCommentItem
              writer={'Emily Chen'}
              message={'내용 2'}
            ></PostCommentItem>
            <PostCommentInput />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default PostDetailPage
