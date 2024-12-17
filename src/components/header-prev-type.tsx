import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function HeaderPrevType({ pageTitle }: { pageTitle: string }) {
  return (
    <header className="border-b px-4">
      <div className="mx-auto flex h-[65px] max-w-screen-xl flex-row items-center justify-between">
        <div className="left">
          <Link href="/" className="flex flex-row items-center">
            <ArrowLeft size={18} className="mr-4" />
            <b className="text-xl">{pageTitle}</b>
          </Link>
        </div>
        <div className="right">
          <Button>Save Changes</Button>
        </div>
      </div>
    </header>
  )
}

export { HeaderPrevType }
