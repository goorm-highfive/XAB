type EditTypeProps = {
  contentTitle: string
}

function ProfileEditLayout({
  contentTitle,
  children,
}: React.PropsWithChildren<EditTypeProps>) {
  return (
    <section>
      <h2 className="mb-5 mt-8 text-lg font-semibold">{contentTitle}</h2>
      {children}
    </section>
  )
}

export { ProfileEditLayout }
