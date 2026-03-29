import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'
import './PostWrite.css'

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
    <div className="post-write">
      <div className="post-write-header">
        <h2>{postToEdit ? '게시글 수정' : '새 게시글 작성'}</h2>
        <button className="btn-close" onClick={onBack}>
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="author">작성자</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows="10"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            취소
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '처리 중...' : postToEdit ? '수정하기' : '작성하기'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostWrite
