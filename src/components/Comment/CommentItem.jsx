import { useState } from 'react'
import CommentForm from './CommentForm'
import { commentApi } from '../../api/commentApi'

export default function CommentItem({ comment, postId, onUpdate, onDelete, onReply, depth = 0 }) {
  const [isEditing, setIsEditing] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [likeStatus, setLikeStatus] = useState({ likeCount: comment.likeCount || 0, isLiked: comment.isLiked || false })
  const [likeLoading, setLikeLoading] = useState(false)

  const currentUserId = parseInt(localStorage.getItem('userId'))
  const isAuthor = currentUserId === comment.authorId
  const canReply = depth < 1

  const handleUpdate = async (content) => {
    const result = await onUpdate(comment.id, content)
    if (result.success) {
      setIsEditing(false)
    }
    return result
  }

  const handleReply = async (content) => {
    const result = await onReply(comment.id, content)
    if (result.success) {
      setShowReplyForm(false)
    }
    return result
  }

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    await onDelete(comment.id)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLike = async () => {
    try {
      setLikeLoading(true)
      const result = await commentApi.likeComment(postId, comment.id)
      setLikeStatus({ likeCount: result.likeCount, isLiked: result.isLiked })
    } catch (err) {
      alert(err.message)
    } finally {
      setLikeLoading(false)
    }
  }

  const isReply = comment.parentId !== null

  return (
    <div className={`${isReply ? 'ml-8 pl-4 border-l-2 border-blue-300' : ''}`}>
      <div className="border rounded-lg p-4 bg-white mb-2">
        {isEditing ? (
          <CommentForm
            initialContent={comment.content}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            buttonText="수정 완료"
            cancelText="취소"
          />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold">{comment.authorName}</span>
                <span className="text-gray-400 text-sm ml-2">
                  {formatDate(comment.createdAt)}
                </span>
                {comment.updatedAt && (
                  <span className="text-gray-400 text-sm ml-2">
                    (수정됨)
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {canReply && onReply && (
                  <button
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    답글
                  </button>
                )}
                {isAuthor && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">
              {comment.content}
            </p>
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  likeStatus.isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                } disabled:opacity-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill={likeStatus.isLiked ? 'currentColor' : 'none'}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likeStatus.likeCount}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {showReplyForm && (
        <div className="ml-8 mb-2">
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
            buttonText="답글 작성"
            cancelText="취소"
            placeholder="답글을 입력하세요..."
          />
        </div>
      )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onReply={onReply}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
    </div>
  )
}
