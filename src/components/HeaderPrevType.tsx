import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { ArrowLeft } from 'lucide-react'

type HeaderPrevTypeProps = {
  pageTitle: string
}

function HeaderPrevType({ pageTitle }: HeaderPrevTypeProps) {
  return (
    <header className="border-b border-gray-200 px-4">
      <div className="mx-auto flex h-[65px] max-w-screen-xl flex-row items-center justify-between">
        <div className="left">
          <Link href="/" className="flex flex-row items-center">
            <ArrowLeft size={18} color="#525252" className="mr-4" />
            <span className="leading-1 text-xl font-semibold">{pageTitle}</span>
          </Link>
        </div>
        <div className="right">
          <Button type="submit" className="w-[128px]">
            Save Changes
          </Button>
        </div>
      </div>
    </header>
  )
}

export { HeaderPrevType }
