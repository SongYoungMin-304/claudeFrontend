import { useState } from 'react'
import { authApi } from '../../api/authApi'

export default function CommentForm({
  initialContent = '',
  onSubmit,
  onCancel,
  buttonText = '댓글 작성',
  cancelText = '취소'
}) {
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isLoggedIn = authApi.isAuthenticated()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)

    const result = await onSubmit(content.trim())

    if (result.success) {
      setContent('')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">
          댓글을 작성하려면{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            로그인
          </a>
          이 필요합니다.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        maxLength={1000}
        disabled={loading}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            {cancelText}
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={loading || !content.trim()}
        >
          {loading ? '작성 중...' : buttonText}
        </button>
      </div>
    </form>
  )
}
