import { NotifyItem } from '~/components/notify/notify-item'

function NotifyGroup() {
  // 알림 발생 날짜에 맞게 묶어서 출력하기 위한 컴포넌트
  return (
    <div className="mx-auto max-w-xl px-4 pt-5">
      <p className="font-bold text-muted-foreground">Today</p>
      <div>
        {/* 데이터를 map으로 출력할 예정*/}
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
      </div>
    </div>
  )
}

export { NotifyGroup }
