// src/hooks/use-follow.ts
'use client'
import { useState } from 'react'

interface UseFollowResult {
  isFollowing: boolean
  loading: boolean
  error: string | null
  toggleFollow: () => Promise<void>
}

function useFollow(
  targetUserId: string,
  initialFollowing: boolean,
): UseFollowResult {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleFollow = async () => {
    setLoading(true)
    setError(null)

    try {
      let response
      if (isFollowing) {
        // 언팔로우 요청 (DELETE)
        response = await fetch(`/api/follow/${targetUserId}`, {
          method: 'DELETE',
        })
      } else {
        // 팔로우 요청 (POST)
        response = await fetch(`/api/follow/${targetUserId}`, {
          method: 'POST',
        })
      }
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || '팔로우 처리 중 오류 발생')
      }
      // 성공하면 상태 토글
      setIsFollowing(!isFollowing)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('알 수 없는 오류 발생')
      }
    } finally {
      setLoading(false)
    }
  }

  return { isFollowing, loading, error, toggleFollow }
}

export { useFollow }
