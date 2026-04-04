import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Signup from './components/Signup'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostWrite from './components/PostWrite'
import './App.css'

function App() {
  const { logout } = useAuth()
  const [view, setView] = useState('list')
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [postToEdit, setPostToEdit] = useState(null)

  const isLoggedIn = !!localStorage.getItem('accessToken')
  const path = window.location.pathname

  if (path === '/login') return <Login />
  if (path === '/signup') return <Signup />
  if (!isLoggedIn) {
    window.location.href = '/login'
    return null
  }

  const handleSelectPost = (id) => { setSelectedPostId(id); setView('detail') }
  const handleShowWrite = () => { setPostToEdit(null); setView('write') }
  const handleEdit = (post) => { setPostToEdit(post); setView('write') }
  const handleBack = () => { setView('list'); setSelectedPostId(null); setPostToEdit(null) }
  const handleSuccess = () => { setView('list'); setSelectedPostId(null); setPostToEdit(null) }
  const handleNavigate = (postId) => { setSelectedPostId(postId) }

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
        <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">
          로그아웃
        </button>
      </header>
      <div className="flex-1 overflow-hidden">
        {view === 'list' && <PostList onSelectPost={handleSelectPost} onShowWrite={handleShowWrite} />}
        {view === 'detail' && <PostDetail postId={selectedPostId} onBack={handleBack} onEdit={handleEdit} onNavigate={handleNavigate} />}
        {view === 'write' && <PostWrite postToEdit={postToEdit} onBack={handleBack} onSuccess={handleSuccess} />}
      </div>
    </div>
  )
}

export default App
