import { Share2 } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { KakaoShare } from '~/components/social-share/kakao-share'

function ShareButton() {
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
          <p className="font-bold">Share this post</p>
          <div className="pt-4">
            <KakaoShare />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ShareButton }
