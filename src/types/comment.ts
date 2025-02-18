import { Tables } from '~/types/supabase'

export type Comment = Tables<'comments'> & {
  username: string
  profileImage: string | null
  likeCount: number
  userLiked: boolean
  replies: Comment[]
}

export type addComment = {
  content: string
  parent_id: number | null
  dept: number | null
}
