import { JSX } from 'react'
import { Card, CardContent } from '~/components/ui/card'

type EmptyProps = {
  type: 'card' | 'default'
  icon?: JSX.Element
  title: string
  subTitle?: string
}

function EmptyState({ type, icon, title, subTitle }: EmptyProps) {
  const content = (
    <div className="container mx-auto px-4 pb-6 pt-10">
      <div className="flex-col items-center justify-center text-center">
        {icon && (
          <div className="mb-3 inline-block rounded-full bg-zinc-100 px-5 py-5">
            {icon}
          </div>
        )}
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm">{subTitle}</p>
      </div>
    </div>
  )

  if (type === 'card') {
    return (
      <Card>
        <CardContent>{content}</CardContent>
      </Card>
    )
  }

  return content
}

export default EmptyState
