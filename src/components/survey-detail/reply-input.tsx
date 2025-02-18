// components/survey-detail/reply-input.tsx
'use client'

import Image from 'next/image'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import defaultProfile from '~/assets/svgs/default-profile.svg'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '~/components/ui/form'
import { useComments } from '~/hooks/use-comments'

// 답글 입력 스키마 정의
const replySchema = z.object({
  replyContent: z
    .string()
    .min(1, 'Please enter a comment.')
    .max(500, 'Comments must be 500 characters or fewer.'),
})

type ReplyFormValues = z.infer<typeof replySchema>

type ReplyInputProps = {
  username: string | undefined
  postId: number
  replyId: number | null
  dept: number | null
  onReplySubmit: () => void // 답글 작성 후 부모 컴포넌트에서 reply 창을 닫기 위한 콜백
}

function ReplyInput({ username, postId, replyId, dept }: ReplyInputProps) {
  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { replyContent: '' },
  })

  const { addCommentMutation } = useComments(postId)

  const onSubmit = async (values: ReplyFormValues) => {
    if (addCommentMutation.isPending) return

    try {
      await addCommentMutation.mutateAsync({
        content: values.replyContent,
        parent_id: replyId,
        dept: (dept || 1) + 1,
      })
      toast.success('Comment added successfully.')
      form.reset()
    } catch (error) {
      console.log(error)
      toast.error('Failed to add comment.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[25px] flex items-center"
      >
        <div className="mr-3 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={defaultProfile} alt="" />
        </div>
        <FormField
          name="replyContent"
          control={form.control}
          render={({ field }) => (
            <FormItem className="relative flex-auto">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="h-[40px] rounded-[30px] border-0 bg-primary-foreground pl-5 pr-[40px] text-sm"
                  placeholder={`Reply to ${username}`}
                />
              </FormControl>
              <FormMessage className="pl-7" />
              <Button
                type="submit"
                variant="ghost"
                className="absolute right-2 top-[-4px] w-[30px] hover:bg-transparent"
              >
                <Send />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { ReplyInput }
