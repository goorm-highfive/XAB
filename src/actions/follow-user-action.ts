// app/actions/toggleFollowUserAction.ts
'use server'
import { headers } from 'next/headers'

async function toggleFollowUserAction(_prevState: unknown, formData: FormData) {
  const userId = formData.get('userId') as string
  const action = formData.get('action') as string // 'follow' 또는 'unfollow'
  if (!userId) throw new Error('사용자 ID가 없습니다.')
  if (!action) throw new Error('액션이 지정되지 않았습니다.')

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const apiUrl = `${baseUrl}/api/follow/${userId}`
  const clientHeaders = await headers()

  const authorizationHeader = clientHeaders.get('Authorization') || ''
  const cookieHeader = clientHeaders.get('Cookie') || ''

  let res
  if (action === 'follow') {
    res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: authorizationHeader,
        Cookie: cookieHeader,
      },
    })
  } else if (action === 'unfollow') {
    res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: authorizationHeader,
        Cookie: cookieHeader,
      },
    })
  } else {
    throw new Error('잘못된 액션입니다.')
  }

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || '요청에 실패했습니다.')
  }

  return res.json()
}

export { toggleFollowUserAction }
