import { Heart, MessageCircle, Share2 } from 'lucide-react'

function PostActionBar() {
  return (
    <div className="mt-6 flex items-center justify-between border-t pb-0 pl-6 pr-6 pt-5 text-sm text-muted-foreground">
      <div className="flex items-center">
        <button type="button" className="mr-4 flex items-center">
          <Heart size={14} className="mr-1" />
          24
        </button>
        <button type="button" className="mr-4 flex items-center">
          <MessageCircle size={14} className="mr-1" />
          89
        </button>
        <button type="button" className="mr-4 flex items-center">
          <Share2 size={14} className="mr-1" />
          Share
        </button>
      </div>
      <div>
        <span>1,234 votes</span>
      </div>
    </div>
  )
}

export { PostActionBar }
