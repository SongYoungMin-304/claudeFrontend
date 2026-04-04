import { useState, useEffect } from 'react'
import { commentApi } from '../../api/commentApi'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    try {
      setLoading(true)
      const data = await commentApi.getComments(postId)
      setComments(data.comments)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleCreateComment = async (content) => {
    try {
      await commentApi.createComment(postId, content)
      await fetchComments()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const handleReply = async (parentCommentId, content) => {
    try {
      await commentApi.createReply(postId, parentCommentId, content)
      await fetchComments()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const handleUpdateComment = async (commentId, content) => {
    try {
      await commentApi.updateComment(postId, commentId, content)
      await fetchComments()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteComment(postId, commentId)
      await fetchComments()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        댓글을 불러오는 중...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        댓글 {comments.length}개
      </h3>

      <CommentForm
        postId={postId}
        onSubmit={handleCreateComment}
        buttonText="댓글 작성"
      />

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
              onReply={handleReply}
              depth={0}
            />
          ))
        )}
      </div>
    </div>
  )
}
