// app/components/common/FollowButton.tsx
'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleFollowUserAction } from '~/actions/follow-user-action'
import { Button } from '~/components/ui/button'
import { cn } from '~/utils/cn'

interface FollowButtonProps {
  userId: string
  isFollowing: boolean
  style?: string
}

// SubmitEvent 타입에 submitter 프로퍼티가 포함된 버전을 정의 (TS 버전이 낮으면 필요)
interface SubmitEventWithSubmitter extends Event {
  submitter: HTMLButtonElement
}

export function FollowButton({
  userId,
  isFollowing,
  style,
}: FollowButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // 'action' 값이 없으면, 클릭한 버튼의 값을 추가합니다.
    if (!formData.get('action')) {
      // nativeEvent를 SubmitEventWithSubmitter 타입으로 캐스팅하여 submitter 프로퍼티에 접근합니다.
      const submitter = (e.nativeEvent as SubmitEventWithSubmitter).submitter
      formData.set('action', submitter.value)
    }

    try {
      await toggleFollowUserAction(formData)
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error('팔로우 요청 실패', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="userId" value={userId} />
      <Button
        variant={isFollowing ? 'outline' : 'default'}
        type="submit"
        name="action"
        value={isFollowing ? 'unfollow' : 'follow'}
        className={cn(style, {
          'bg-white text-black': isFollowing,
          'bg-black text-white': !isFollowing,
        })}
        disabled={isPending}
      >
        {isFollowing ? 'following' : 'follow'}
      </Button>
    </form>
  )
}
