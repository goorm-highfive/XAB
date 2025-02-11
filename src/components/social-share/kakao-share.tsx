import Image from 'next/image'

import kakaoIcon from '~/assets/svgs/kakao-icon.svg'
import { ShareProps } from '~/types/share'

function KakaoShare({
  postCaption,
  likesCounts,
  commentsCounts,
  username,
  postId,
}: ShareProps) {
  const onClick = () => {
    const { Kakao } = window
    const url = `survey-detail/${postId}`

    Kakao.Share.sendCustom({
      templateId: 117153,
      templateArgs: {
        username: username,
        post_description: postCaption,
        likes_counts: likesCounts,
        comments_counts: commentsCounts,
        url: url,
      },
    })
  }
  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded-full bg-social-kakao"
      onClick={onClick}
    >
      <Image src={kakaoIcon} alt="kakao share" className="h-1/2 w-1/2" />
    </button>
  )
}

export { KakaoShare }
