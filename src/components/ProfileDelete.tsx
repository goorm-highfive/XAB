import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

function ProfileDelete() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Once you delete your account, there is no going back. Please be
          certain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Delete Account</Button>
      </CardContent>
    </Card>
  )
}
export { ProfileDelete }
