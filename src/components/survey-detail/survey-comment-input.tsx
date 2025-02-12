'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { addComment } from '~/actions/comment-action' // 서버 액션 임포트

import defaultProfile from '~/assets/svgs/default-profile.svg'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Form, FormField, FormItem, FormControl } from '~/components/ui/form'

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Please enter a comment.')
    .max(500, 'Max 500 characters.'),
})

type CommentFormValues = z.infer<typeof commentSchema>

type SurveyCommentInputProps = {
  postId: number
}

function SurveyCommentInput({ postId }: SurveyCommentInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: '' },
  })

  const handleSubmit = async (data: CommentFormValues) => {
    if (!isSubmitting) {
      setIsSubmitting(true)
      try {
        await addComment(postId, data.comment)
        toast.success('Comment added successfully.')
        form.reset()
      } catch (error) {
        console.log(error)
        toast.error('Failed to add comment.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-5 flex items-center space-x-2 border-t pt-5"
      >
        {/* 프로필 이미지 */}
        <div className="mr-3 mt-1 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={defaultProfile} alt="default profile" />
        </div>

        {/* 입력 필드 */}
        <FormField
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full">
              <FormControl className="flex w-full">
                <Input
                  type="text"
                  className="h-10 flex-grow rounded-lg border bg-gray-100 pl-5 text-sm"
                  placeholder="Add a comment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 버튼 */}
        <Button type="submit" variant="ghost" className="p-2">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}

export { SurveyCommentInput }
