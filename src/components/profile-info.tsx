import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

function ProfileInfo() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="user-img mr-4 h-20 w-20 overflow-hidden rounded-full"></div>
        <Button variant="outline">Change Photo</Button>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="displayname">Display Name</Label>
              <Input id="displayname" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
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
