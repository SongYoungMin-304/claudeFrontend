import { useState } from 'react'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostWrite from './components/PostWrite'
import './App.css'

function App() {
  const [view, setView] = useState('list') // list, detail, write
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [postToEdit, setPostToEdit] = useState(null)

  const handleSelectPost = (id) => {
    setSelectedPostId(id)
    setView('detail')
  }

  const handleShowWrite = () => {
    setPostToEdit(null)
    setView('write')
  }

  const handleEdit = (post) => {
    setPostToEdit(post)
    setView('write')
  }

  const handleBack = () => {
    setView('list')
    setSelectedPostId(null)
    setPostToEdit(null)
  }

  const handleSuccess = () => {
    setView('list')
    setSelectedPostId(null)
    setPostToEdit(null)
  }

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="flex-1 bg-white overflow-hidden">
        {view === 'list' && (
          <PostList onSelectPost={handleSelectPost} onShowWrite={handleShowWrite} />
        )}
        {view === 'detail' && (
          <PostDetail postId={selectedPostId} onBack={handleBack} onEdit={handleEdit} />
        )}
        {view === 'write' && (
          <PostWrite postToEdit={postToEdit} onBack={handleBack} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  )
}

export default App
