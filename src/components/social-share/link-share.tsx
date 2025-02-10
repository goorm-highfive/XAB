import { Link } from 'lucide-react'
import { toast } from 'sonner'

function LinkShare({ postId }: { postId: number }) {
  const onClick = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/survey-detail/${postId}`

    try {
      await navigator.clipboard.writeText(url)
      toast.success('The URL has been successfully copied to your clipboard!')
    } catch {
      toast.error('Failed to copy the URL. Please try again')
    }
  }

  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200"
      onClick={onClick}
    >
      <Link />
    </button>
  )
}

export { LinkShare }
