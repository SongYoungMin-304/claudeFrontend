import { useState } from 'react'
import CommentForm from './CommentForm'

export default function CommentItem({ comment, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)

  const currentUserId = parseInt(localStorage.getItem('userId'))
  const isAuthor = currentUserId === comment.authorId

  const handleUpdate = async (content) => {
    const result = await onUpdate(comment.id, content)
    if (result.success) {
      setIsEditing(false)
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

  return (
    <div className="border rounded-lg p-4 bg-white">
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
            {isAuthor && (
              <div className="flex gap-2">
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
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {comment.content}
          </p>
        </>
      )}
    </div>
  )
}
