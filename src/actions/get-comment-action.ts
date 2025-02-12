'use server'

import { createClient } from '~/utils/supabase/server'

async function getSupabase() {
  return createClient()
}

export async function getComments(postId: number) {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('comments')
    .select(
      `
        id, content, created_at, user_id, post_id, parent_id, is_delete,
        users(username, profile_image),
        (SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id) AS likeCount,
        (SELECT COUNT(*) > 0 FROM comment_likes WHERE comment_likes.comment_id = comments.id AND comment_likes.user_id = ?) AS userLiked
      `,
      { count: 'exact' },
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
    .single()

  if (error) throw new Error(error.message)
  return data
}
