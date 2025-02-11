// app/components/common/FollowButton.tsx
'use client' // 이 컴포넌트는 클라이언트 컴포넌트임을 명시합니다.

import { useRouter } from 'next/navigation' // Next.js 내비게이션 훅을 가져옵니다.
import { useEffect } from 'react'
import { toggleFollowUserAction } from '~/actions/follow-user-action' // 서버 액션(팔로우/언팔로우 API 호출)을 가져옵니다.
import { Button } from '~/components/ui/button' // 재사용 가능한 UI 버튼 컴포넌트를 가져옵니다.
import { cn } from '~/utils/cn' // 조건부 클래스 이름 결합 유틸리티 함수입니다.
import { useActionState } from 'react' // Next.js 14 이후 제공되는 useActionState 훅을 가져옵니다.

interface FollowButtonProps {
  userId: string // 팔로우할 대상 사용자의 아이디
  isFollowing: boolean // 현재 팔로우 상태 (true: 이미 팔로우 중, false: 팔로우 안함)
  style?: string // 추가로 전달할 커스텀 스타일 클래스 (선택사항)
}

export function FollowButton({
  userId,
  isFollowing,
  style,
}: FollowButtonProps) {
  const router = useRouter()

  // useActionState는 [state, formAction, isPending]을 반환합니다.
  // - state: 서버 액션 실행 후 반환된 결과값 (예: 성공 메시지 등)
  // - formAction: <form>의 action 속성에 지정할 함수로, 폼 제출 시 서버 액션을 자동 실행합니다.
  // - isPending: 서버 액션이 실행 중인지 여부를 나타내는 boolean 값
  const [state, formAction, isPending] = useActionState(
    toggleFollowUserAction, // 실행할 서버 액션
    null, // 초기 상태 (필요에 따라 변경 가능)
  )

  // 서버 액션이 실행되어 결과(state)가 업데이트되면 페이지를 새로고침하여 최신 데이터를 반영합니다.
  useEffect(() => {
    if (state) {
      router.refresh()
    }
  }, [state, router])

  return (
    // form의 action에 formAction을 지정하여, 폼 제출 시 자동으로 toggleFollowUserAction이 실행됩니다.
    <form action={formAction}>
      {/* 사용자 ID를 숨은 input으로 전달 (서버 액션에서 사용) */}
      <input type="hidden" name="userId" value={userId} />
      {/*
         버튼의 name="action"과 value는 서버 액션에 전달할 필드로,
         현재 팔로우 상태에 따라 'follow' 또는 'unfollow' 값을 전송합니다.
      */}
      <Button
        variant={isFollowing ? 'outline' : 'default'} // 팔로우 상태에 따라 버튼 스타일 변경
        type="submit" // 폼 제출 버튼
        name="action" // 서버 액션에서 인식할 필드 이름
        value={isFollowing ? 'unfollow' : 'follow'} // 팔로우 상태에 따른 값
        className={cn(style, {
          'bg-white text-black': isFollowing, // 팔로우 중이면 흰 배경, 검은 텍스트
          'bg-black text-white': !isFollowing, // 팔로우 안 한 상태이면 검은 배경, 흰 텍스트
        })}
        disabled={isPending} // 서버 액션 실행 중에는 버튼을 비활성화합니다.
      >
        {isPending ? '' : isFollowing ? 'following' : 'follow'}
      </Button>
    </form>
  )
}
