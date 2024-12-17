import Image from 'next/image'
import defaultProfile from '~/assets/svg/default-profile.svg'

type PostViewProps = {
  author: string
  createDate: string
}

function PostView({ author, createDate }: PostViewProps) {
  return (
    <>
      <div className="mb-4 flex items-center">
        <div className="user-img mr-3 h-10 w-10 overflow-hidden rounded-full">
          <Image src={defaultProfile} alt="" />
        </div>
        <div>
          <p>
            <b>{author}</b>
          </p>
          <p className="text-sm text-muted-foreground">
            Posted on {createDate}
          </p>
        </div>
      </div>
    </>
  )
}

export { PostView }
