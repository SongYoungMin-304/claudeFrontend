import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'

function PostWrite({ postToEdit, onBack, onSuccess }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title)
      setContent(postToEdit.content)
      setAuthor(postToEdit.author)
    }
  }, [postToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('모든 필드를 입력해주세요')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (postToEdit) {
        await postApi.updatePost(postToEdit.id, title, content, author)
        alert('게시글이 수정되었습니다')
      } else {
        await postApi.createPost(title, content, author)
        alert('게시글이 작성되었습니다')
      }

      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-xl font-bold m-0">{postToEdit ? '게시글 수정' : '새 게시글 작성'}</h2>
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center bg-white/20 border-none text-white text-2xl rounded hover:bg-white/30 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-10 py-10 max-w-2xl mx-auto w-full flex flex-col">
        <div className="flex flex-col mb-5">
          <label htmlFor="author" className="mb-2 font-bold text-gray-800 text-sm">작성자</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
            disabled={loading}
            className="px-3 py-3 border border-gray-300 rounded font-inherit text-base transition-colors focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2 font-bold text-gray-800 text-sm">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            disabled={loading}
            className="px-3 py-3 border border-gray-300 rounded font-inherit text-base transition-colors focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="content" className="mb-2 font-bold text-gray-800 text-sm">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows="10"
            disabled={loading}
            className="px-3 py-3 border border-gray-300 rounded font-inherit text-base transition-colors focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed resize-vertical min-h-80"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-500 px-3 py-3 rounded mb-5 border-l-4 border-red-500">
            {error}
          </div>
        )}

        <div className="flex gap-2.5 justify-end mt-8 pt-5 border-t border-gray-300">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : postToEdit ? '수정하기' : '작성하기'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostWrite
