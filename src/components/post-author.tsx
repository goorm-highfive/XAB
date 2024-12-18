import Image from 'next/image'
import defaultProfile from '~/assets/svg/default-profile.svg'

// 게시글 뷰페이지 : 게시글 (작성자)
function PostAuthor() {
  return (
    <div className="mb-4 flex items-center">
      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
        <Image src={defaultProfile} alt="" />
      </div>
      <div>
        <p>
          <b>Sarah Anderson</b>
        </p>
        <p className="text-sm text-muted-foreground">Posted on Jan 15, 2025</p>
      </div>
    </div>
  )
}

export { PostAuthor }
