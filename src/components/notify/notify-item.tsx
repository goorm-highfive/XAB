import Link from 'next/link'

import { CircleUserRound } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

function NotifyItem() {
  return (
    <Link href="/">
      <Alert className="my-4 flex justify-between p-4">
        <div className="flex items-center gap-3">
          <div>
            <CircleUserRound className="h-12 w-12" />
          </div>
          <div>
            <AlertTitle className="text-base font-semibold">
              Alex Morgan
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              like your post
            </AlertDescription>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">2024.12.18</div>
      </Alert>
    </Link>
  )
}

export { NotifyItem }
