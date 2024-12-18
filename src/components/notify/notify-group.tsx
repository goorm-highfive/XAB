import { NotifyItem } from '~/components/notify/notify-item'

function NotifyGroup() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-5">
      <p className="font-bold text-muted-foreground">Today</p>
      <div>
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
      </div>
    </div>
  )
}

export { NotifyGroup }
