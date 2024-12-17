'use client'

import { PasswordForm } from '~/components/password-and-security/password-form'

function PasswordAndSecurity() {
  return (
    <div className="h-screen">
      <div className="m-auto w-2/3 pt-10">
        <h2 className="my-2 text-2xl font-bold">
          Password and Security Settings
        </h2>
        <p className="mb-10 text-sm">
          Manage your account security and login settings
        </p>

        <div className="rounded-lg bg-background px-5 py-5">
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}

export default PasswordAndSecurity
