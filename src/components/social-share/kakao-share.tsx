import Image from 'next/image'
import kakaoIcon from '~/assets/svgs/kakao-icon.svg'

function KakaoShare() {
  const onClick = () => {
    const { Kakao } = window

    Kakao.Share.sendCustom({
      templateId: 117153,
      templateArgs: {
        post_description: '제목입니다.',
        username: '유저 이름',
        like_counts: 6,
        comments_counts: 0,
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
