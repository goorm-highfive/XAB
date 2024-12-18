import Image from 'next/image'
import defaultProfile from '~/assets/svg/default-profile.svg'
import { Heart } from 'lucide-react'

type PostCommentItemProps = {
  writer: string
  message: string
}

function PostCommentItem({ writer, message }: PostCommentItemProps) {
  return (
    <div className="comment-item mb-6 flex">
      <div className="user-img mr-3 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
        <Image src={defaultProfile} alt="" />
      </div>
      <div className="flex-auto">
        <div className="comment rounded-lg bg-primary-foreground p-3">
          <p>
            <b>{writer}</b>
          </p>
          <p>{message}</p>
        </div>
        <div className="etc-btn mt-2 flex text-sm text-muted-foreground">
          <button
            type="button"
            className="mr-4 flex items-center justify-start"
          >
            <Heart size={14} className="mr-1 text-muted-foreground" />
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
