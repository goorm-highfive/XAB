import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { CustomAlertDialog } from '~/components/common/custom-alert-dialog'

// 개인정보 페이지 : 계정 삭제
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
        <CustomAlertDialog
          alertTitle="Are you sure you want to delete your account?"
          description="This action is permanent and cannot be undone."
          triggerBtnText="Delete Account"
          cancelBtnText="Cancel"
          actionBtnText="Continue"
        />
      </CardContent>
    </Card>
  )
}
export { ProfileDelete }
