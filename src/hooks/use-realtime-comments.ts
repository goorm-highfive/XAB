// useRealtimeComments.ts
import { useEffect } from 'react'
import { createClient } from '~/utils/supabase/client'
import { useQueryClient } from '@tanstack/react-query'

export const useRealtimeComments = (postId: number) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`comments_${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['comments', postId] })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId, queryClient])
}
