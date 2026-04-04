import { useState, useEffect } from 'react'
import { postApi } from '../api/postApi'
import CommentList from './Comment/CommentList'

function PostDetail({ postId, onBack, onEdit, onNavigate }) {
  const [post, setPost] = useState(null)
  const [navigation, setNavigation] = useState({ prev: null, next: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likeStatus, setLikeStatus] = useState({ likeCount: 0, isLiked: false })
  const [likeLoading, setLikeLoading] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchNavigation()
    fetchLikeStatus()
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

  const fetchNavigation = async () => {
    try {
      const nav = await postApi.getPostNavigation(postId)
      setNavigation(nav)
    } catch (err) {
      console.error('네비게이션 조회 실패', err)
    }
  }

  const fetchLikeStatus = async () => {
    try {
      const status = await postApi.getPostLikeStatus(postId)
      setLikeStatus({ likeCount: status.likeCount, isLiked: status.isLiked })
    } catch (err) {
      console.error('좋아요 상태 조회 실패', err)
    }
  }

  const handleLike = async () => {
    try {
      setLikeLoading(true)
      const result = await postApi.likePost(postId)
      setLikeStatus({ likeCount: result.likeCount, isLiked: result.isLiked })
    } catch (err) {
      alert(err.message)
    } finally {
      setLikeLoading(false)
    }
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center text-lg text-gray-500">로딩 중...</div>
  )
  if (error) return (
    <div className="flex-1 flex items-center justify-center text-lg text-red-500">오류: {error}</div>
  )
  if (!post) return (
    <div className="flex-1 flex items-center justify-center text-lg text-red-500">게시글을 찾을 수 없습니다</div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-5 bg-gray-100 border-b-2 border-gray-300">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400 transition-colors"
        >
          ← 목록으로
        </button>
        <button
          onClick={() => onEdit(post)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          수정
        </button>
      </div>

      <div className="flex-1 px-10 py-10 max-w-4xl mx-auto w-full">
        <h1 className="mb-5 text-4xl text-gray-800 break-words">{post.title}</h1>
        <div className="flex flex-wrap gap-5 pb-5 border-b border-gray-300 mb-8">
          <span className="text-gray-700 text-sm">작성자: {post.author}</span>
          <span className="text-gray-700 text-sm">
            {new Date(post.createdAt).toLocaleString('ko-KR')}
          </span>
          {post.updatedAt !== post.createdAt && (
            <span className="text-gray-500 text-sm italic">
              수정: {new Date(post.updatedAt).toLocaleString('ko-KR')}
            </span>
          )}
        </div>
        <div className="text-gray-800 leading-relaxed text-base">
          {post.content.split('\n').map((line, idx) => (
            <p key={idx} className="my-4 break-words whitespace-pre-wrap">{line}</p>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6 py-4 border-t border-gray-200">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              likeStatus.isLiked
                ? 'bg-red-100 text-red-500 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
            } disabled:opacity-50`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${likeStatus.isLiked ? 'fill-current' : 'hover:fill-current'}`}
              fill={likeStatus.isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">{likeStatus.likeCount}</span>
          </button>
        </div>

        <div className="border-t border-gray-200 py-4 my-8">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              {navigation.prev ? (
                <button 
                  onClick={() => onNavigate(navigation.prev.id)}
                  className="text-left w-full hover:text-blue-600 transition-colors"
                >
                  <span className="text-gray-500 text-sm">← 이전글</span>
                  <p className="text-blue-600 truncate">{navigation.prev.title}</p>
                </button>
              ) : (
                <p className="text-gray-400 text-sm">이전글이 없습니다</p>
              )}
            </div>
            
            <div className="flex-1 text-right">
              {navigation.next ? (
                <button 
                  onClick={() => onNavigate(navigation.next.id)}
                  className="text-right w-full hover:text-blue-600 transition-colors"
                >
                  <span className="text-gray-500 text-sm">다음글 →</span>
                  <p className="text-blue-600 truncate">{navigation.next.title}</p>
                </button>
              ) : (
                <p className="text-gray-400 text-sm">다음글이 없습니다</p>
              )}
            </div>
          </div>
        </div>

        <CommentList postId={postId} />
      </div>
    </div>
  )
}

export default PostDetail
