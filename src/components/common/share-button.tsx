import { Share2 } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { KakaoShare } from '~/components/social-share/kakao-share'
import { ShareProps } from '~/types/share'
import { LinkShare } from '../social-share/link-share'

function ShareButton({
  postCaption,
  likesCounts,
  commentsCounts,
  username,
  postId,
}: ShareProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center">
          <Share2 size={18} className="mr-1" />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" sideOffset={20}>
        <div className="flex-col items-center justify-center px-4">
          <p className="text-center font-bold">Share this post</p>
          <div className="flex justify-between pt-6">
            <KakaoShare
              username={username}
              postCaption={postCaption}
              likesCounts={likesCounts}
              commentsCounts={commentsCounts}
              postId={postId}
            />
            <LinkShare postId={postId} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ShareButton }
