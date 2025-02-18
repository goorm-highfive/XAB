import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '~/utils/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  try {
    const { commentId, content } = await request.json()

    if (!commentId || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }, // Bad Request
      )
    }

    const { data, error } = await supabase
      .from('comments')
      .update({ content })
      .eq('id', commentId)
      .single()

    if (error) {
      console.error('Error inserting comment:', error.message)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      )
    }

    console.log('Success insert comments', data)
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch {
    throw new Error()
  }
}
