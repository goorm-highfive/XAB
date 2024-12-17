type PostAuthorProps = {
  author: string
  createDate: string
}

function PostAuthor({ author, createDate }: PostAuthorProps) {
  return (
    <div className="mb-4 flex items-center">
      <div className="user-img mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200"></div>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">Posted on {createDate}</p>
      </div>
    </div>
  )
}

export { PostAuthor }
