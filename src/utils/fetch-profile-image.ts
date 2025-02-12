import { createClient } from '~/utils/supabase/client'

type UserProfileMap = {
  [userId: string]: string | null
}

export const fetchProfileImage = async (
  senderIds: string[],
): Promise<UserProfileMap> => {
  if (senderIds.length === 0) return {}

  const { data, error } = await createClient()
    .from('users')
    .select('id, profile_image')
    .in('id', senderIds)

  if (error) {
    console.error('Failed to fetch profile images:', error.message)
    return {}
  }

  const userProfileMap: UserProfileMap = {}

  data.forEach((user) => {
    userProfileMap[user.id] = user.profile_image || null
  })

  return userProfileMap
}
