import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addComment } from '~/types/comment'

function useComments(postId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const commentsApiUrl = `${baseUrl}/api/comments?postId=${postId}`

  const queryClient = useQueryClient()

  // 댓글 불러오기
  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await fetch(commentsApiUrl)
      if (!res.ok) {
        throw new Error(`CommentsQuery 요청 실패:`)
      }

      return res.json()
    },
  })

  // 댓글 추가
  const addCommentMutation = useMutation({
    mutationFn: async ({ content, parent_id, dept }: addComment) => {
      const res = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content, parent_id, dept }),
      })

      const result = await res.json()
      if (!result.success) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      const response = await fetch('/api/comments/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
      })

      const result = await response.json()
      if (!result.success) throw new Error(result.error)

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  // 댓글 수정
  const editCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: number
      content: string
    }) => {
      const response = await fetch('/api/comments/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, content }),
      })

      const result = await response.json()
      if (!result.success) throw new Error(result.error)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  // 댓글 좋아요
  const likeCommentMutation = useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      const res = await fetch('/api/comments/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
        credentials: 'include',
      })

      const result = await res.json()
      if (!result.liked === undefined) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  return {
    commentsQuery,
    addCommentMutation,
    deleteCommentMutation,
    editCommentMutation,
    likeCommentMutation,
  }
}

export { useComments }
