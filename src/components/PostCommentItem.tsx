import { Heart } from 'lucide-react'

type PostCommentItemProps = {
  writer: string // 작성자의 이름
  message: string // 댓글 내용
}

function PostCommentItem({ writer, message }: PostCommentItemProps) {
  return (
    <div className="comment-item mb-6 flex">
      <div className="user-img mr-3 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200"></div>
      <div className="flex-auto">
        <div className="comment rounded-lg bg-[#FAFAFA] p-3">
          <p>
            <b>{writer}</b>
          </p>
          <p>{message}</p>
        </div>
        <div className="etc-btn mt-2 flex text-[14px] text-[#737373]">
          <button
            type="button"
            className="mr-4 flex items-center justify-start"
          >
            <Heart size={14} color="#737373" className="mr-1" />
            24
          </button>
          <button type="button" className="mr-4">
            Reply
          </button>
          <span className="time">2h ago</span>
        </div>
      </div>
    </div>
  )
}

export { PostCommentItem }
