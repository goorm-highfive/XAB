import Image from 'next/image'
import defaultProfile from '~/assets/svg/default-profile.svg'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Send } from 'lucide-react'

function PostCommentInput() {
  return (
    <div className="mt-[25px] flex border-t pt-[25px]">
      <div className="user-img mr-3 mt-1 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
        <Image src={defaultProfile} alt="" />
      </div>
      <div className="relative flex-auto">
        <Input
          type="text"
          className="h-[40px] rounded-[30px] border-0 bg-primary-foreground pr-[40px] shadow-none"
          placeholder="Add a comment..."
        />
        <Button
          variant="ghost"
          className="z-1 absolute right-2 top-1 w-[30px] p-0 hover:bg-transparent"
        >
          <Send />
        </Button>
      </div>
    </div>
  )
}

export { PostCommentInput }
