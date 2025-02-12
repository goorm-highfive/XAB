import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <Card className="static top-[92px] mb-6 w-full lg:sticky lg:w-72">
      <CardHeader className="items-center gap-5">
        <Skeleton className="h-20 w-20 rounded-full" /> {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Skeleton className="h-6 w-24" /> {/* 사용자 이름 */}
          <Skeleton className="h-4 w-40" /> {/* 사용자 설명 */}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-1 text-center"
          >
            <Skeleton className="h-4 w-8" /> {/* 숫자 */}
            <Skeleton className="h-4 w-16" /> {/* 텍스트 */}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
