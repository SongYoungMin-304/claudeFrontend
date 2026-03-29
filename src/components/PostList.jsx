import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'

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

  if (loading) return <div className="flex items-center justify-center h-full text-lg text-gray-500">로딩 중...</div>
  if (error) return <div className="flex items-center justify-center h-full text-lg text-red-500">오류: {error}</div>

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-5 bg-gray-100 border-b-2 border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 m-0">게시글 목록</h2>
        <button
          onClick={onShowWrite}
          className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          새 글 작성
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-60 text-gray-400">
          <p className="text-lg">게시글이 없습니다</p>
        </div>
      ) : (
        <div className="p-5">
          {posts.map(post => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className="bg-white border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-500"
            >
              <div className="flex items-start justify-between gap-2.5 mb-2.5">
                <h3 className="text-lg text-gray-800 flex-1 break-words m-0">{post.title}</h3>
                <button
                  onClick={(e) => handleDelete(post.id, e)}
                  className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors whitespace-nowrap"
                >
                  삭제
                </button>
              </div>
              <p className="my-1.25 text-gray-600 text-sm">작성자: {post.author}</p>
              <p className="my-2.5 text-gray-700 leading-6">{post.content.substring(0, 100)}...</p>
              <p className="mt-2.5 text-gray-400 text-xs">
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
