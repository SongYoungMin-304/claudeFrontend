const API_BASE_URL = 'http://localhost:8080/api/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const postApi = {
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('게시글 조회 실패')
    return response.json()
  },

  getPostById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('게시글 조회 실패')
    return response.json()
  },

  getPostNavigation: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/navigation`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('네비게이션 조회 실패')
    return response.json()
  },

  createPost: async (title, content, author) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ title, content, author })
    })
    if (!response.ok) throw new Error('게시글 생성 실패')
    return response.json()
  },

  updatePost: async (id, title, content, author) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ title, content, author })
    })
    if (!response.ok) throw new Error('게시글 수정 실패')
    return response.json()
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('게시글 삭제 실패')
    return true
  }
}
