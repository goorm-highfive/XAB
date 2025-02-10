import Link from 'next/link'
import Image from 'next/image'
import xIcon from '~/assets/svgs/x-icon-white.svg'
import { ShareProps } from '~/types/share'

function XShare({ postId, username, postCaption }: ShareProps) {
  const baseUrl = 'https://twitter.com/intent/tweet'
  const shareUrl = `${process.env.NEXT_PUBLIC_API_URL}/survey-detail/${postId}`
  const text = `${postCaption} %7C ${username}님의 게시글 %7C xAB에서 해당 게시글을 확인해보세요`

  return (
    <Link
      href={`${baseUrl}?text=${text}&url=${shareUrl}`}
      target="_blank"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-black"
    >
      <Image src={xIcon} alt="x share button" className="h-1/2 w-1/2" />
    </Link>
  )
}

export { XShare }
