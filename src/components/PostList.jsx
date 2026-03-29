import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'
import './PostList.css'

function PostList({ onSelectPost, onShowWrite }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postApi.getAllPosts()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('삭제하시겠습니까?')) return

    try {
      await postApi.deletePost(id)
      setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="loading">로딩 중...</div>
  if (error) return <div className="error">오류: {error}</div>

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>게시글 목록</h2>
        <button className="btn-write" onClick={onShowWrite}>
          새 글 작성
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>게시글이 없습니다</p>
        </div>
      ) : (
        <div className="posts-container">
          {posts.map(post => (
            <div
              key={post.id}
              className="post-item"
              onClick={() => onSelectPost(post.id)}
            >
              <div className="post-item-header">
                <h3>{post.title}</h3>
                <button
                  className="btn-delete"
                  onClick={(e) => handleDelete(post.id, e)}
                >
                  삭제
                </button>
              </div>
              <p className="post-author">작성자: {post.author}</p>
              <p className="post-preview">{post.content.substring(0, 100)}...</p>
              <p className="post-date">
                {new Date(post.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostList
