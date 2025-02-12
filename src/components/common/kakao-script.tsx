'use client'

import Script from 'next/script'

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      async
      onLoad={onLoad}
    />
  )
}

export { KakaoScript }
