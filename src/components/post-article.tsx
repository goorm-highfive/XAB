'use client'

import { PostAuthor } from '~/components/post-author'
import { PostContent } from '~/components/post-content'

// 게시글 뷰페이지 : 게시글 (작성자 + 콘텐츠)
function PostArticle() {
  return (
    <article>
      <PostAuthor />
      <PostContent />
    </article>
  )
}

export { PostArticle }
