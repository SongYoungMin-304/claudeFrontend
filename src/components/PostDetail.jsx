import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'
import './PostDetail.css'

function PostDetail({ postId, onBack, onEdit }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await postApi.getPostById(postId)
      setPost(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">로딩 중...</div>
  if (error) return <div className="error">오류: {error}</div>
  if (!post) return <div className="error">게시글을 찾을 수 없습니다</div>

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <button className="btn-back" onClick={onBack}>
          ← 목록으로
        </button>
        <button className="btn-edit" onClick={() => onEdit(post)}>
          수정
        </button>
      </div>

      <div className="post-detail-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">작성자: {post.author}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleString('ko-KR')}
          </span>
          {post.updatedAt !== post.createdAt && (
            <span className="updated">
              수정: {new Date(post.updatedAt).toLocaleString('ko-KR')}
            </span>
          )}
        </div>
        <div className="post-body">
          {post.content.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
