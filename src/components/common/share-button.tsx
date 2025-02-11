import { Share2 } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { KakaoShare } from '~/components/social-share/kakao-share'
import { XShare } from '~/components/social-share/x-share'
import { LinkShare } from '~/components/social-share/link-share'
import { ShareProps } from '~/types/share'

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
          <Share2 size={18} className="mr-2" />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" sideOffset={20}>
        <div className="flex-col items-center justify-center px-4 py-1">
          <p className="text-center font-semibold">Share with friends</p>
          <div className="flex justify-around pb-3 pt-6">
            <KakaoShare
              username={username}
              postCaption={postCaption}
              likesCounts={likesCounts}
              commentsCounts={commentsCounts}
              postId={postId}
            />

            <XShare
              postId={postId}
              postCaption={postCaption}
              username={username}
            />
            <LinkShare postId={postId} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ShareButton }
