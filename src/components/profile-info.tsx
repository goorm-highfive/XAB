import Image from 'next/image'
import defaultProfileImg from '~/assets/svg/default-profile.svg'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

// 개인정보 페이지 : 사용자 정보 변경 부분
function ProfileInfo() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="mr-4 h-20 w-20 overflow-hidden rounded-full">
          <Image src={defaultProfileImg} alt="" />
        </div>
        <Button variant="outline">Change Photo</Button>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="displayname">Display Name</Label>
              <Input id="displayname" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" className="min-h-24" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export { ProfileInfo }
