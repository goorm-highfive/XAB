import { PostAuthor } from '~/components/PostAuthor'
import { PostCommentItem } from '~/components/PostCommentItem'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Send } from 'lucide-react'

function PostDetailPage() {
  return (
    <div className="mx-auto h-screen max-w-[1248px]">
      <section>
        <PostAuthor author={'Sarah Anderson'} createDate={'Jan 15, 2025'} />
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
            <div className="mt-[25px] flex border-t border-[#E5E7EB] pt-[25px]">
              <div className="user-img mr-3 mt-1 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200"></div>
              <div className="relative flex-auto">
                <Input
                  type="text"
                  className="h-[40px] w-full rounded-[30px] border-0 bg-[#FAFAFA] pr-[40px] shadow-none"
                  placeholder="Add a comment..."
                />
                <Button
                  variant="ghost"
                  className="z-1 absolute right-2 top-1 w-[30px] p-0 hover:bg-transparent"
                >
                  <Send size={16} className="text-[#000]" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default PostDetailPage
