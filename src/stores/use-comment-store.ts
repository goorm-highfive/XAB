import { create } from 'zustand'
import { Comment } from '~/types/comment'
import { Tables } from '~/types/supabase'

type CommentsStoreType = {
  // 각 postId별로 댓글 트리를 저장
  commentsMap: { [key: number]: Comment[] }
  setComments: (postId: number, comments: Comment[]) => void
  addComment: (
    postId: number,
    newComment: Tables<'comments'>,
    currentUserName: string,
  ) => void
  deleteComment: (postId: number, commentId: number) => void
  updateComment: (postId: number, updatedComment: Tables<'comments'>) => void
  toggleLike: (postId: number, commentId: number, liked: boolean) => void
}

const useCommentsStore = create<CommentsStoreType>((set) => ({
  commentsMap: {},

  setComments: (postId, comments) =>
    set((state) => ({
      commentsMap: { ...state.commentsMap, [postId]: comments },
    })),

  addComment: (postId, newComment, currentUserName) =>
    set((state) => {
      const postComments = state.commentsMap[postId] || []
      return {
        commentsMap: {
          ...state.commentsMap,
          [postId]: addCommentToTree(postComments, newComment.parent_id, {
            ...newComment,
            username: currentUserName,
            replies: [],
            likeCount: 0,
            userLiked: false,
          }),
        },
      }
    }),

  deleteComment: (postId, commentId) =>
    set((state) => {
      const postComments = state.commentsMap[postId] || []
      return {
        commentsMap: {
          ...state.commentsMap,
          [postId]: removeCommentFromTree(postComments, commentId),
        },
      }
    }),

  updateComment: (postId, updatedComment) =>
    set((state) => {
      const postComments = state.commentsMap[postId] || []
      return {
        commentsMap: {
          ...state.commentsMap,
          [postId]: updateCommentInTree(postComments, updatedComment),
        },
      }
    }),

  toggleLike: (postId, commentId, liked) =>
    set((state) => {
      const postComments = state.commentsMap[postId] || []
      return {
        commentsMap: {
          ...state.commentsMap,
          [postId]: toggleLikeInTree(postComments, commentId, liked),
        },
      }
    }),
}))

// 기존에 작성한 트리 관련 헬퍼 함수는 그대로 사용합니다.
const addCommentToTree = (
  comments: Comment[],
  parentId: number | null,
  newReply: Comment,
): Comment[] => {
  if (parentId === null) {
    return [...comments, newReply]
  }
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, newReply],
      }
    }
    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: addCommentToTree(comment.replies, parentId, newReply),
      }
    }
    return comment
  })
}

const removeCommentFromTree = (
  comments: Comment[],
  commentId: number,
): Comment[] => {
  return comments
    .filter((comment) => comment.id !== commentId)
    .map((comment) => ({
      ...comment,
      replies: removeCommentFromTree(comment.replies, commentId),
    }))
}

const updateCommentInTree = (
  comments: Comment[],
  updatedComment: Tables<'comments'>,
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === updatedComment.id) {
      return { ...comment, ...updatedComment }
    }
    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentInTree(comment.replies, updatedComment),
      }
    }
    return comment
  })
}

const toggleLikeInTree = (
  comments: Comment[],
  commentId: number,
  liked: boolean,
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        userLiked: liked,
        likeCount: liked ? comment.likeCount + 1 : comment.likeCount - 1,
      }
    }
    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: toggleLikeInTree(comment.replies, commentId, liked),
      }
    }
    return comment
  })
}

export { useCommentsStore }
