const API_BASE_URL = 'http://localhost:8080/api/v1'

export const postApi = {
  // 모든 게시글 조회
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`)
    if (!response.ok) throw new Error('게시글 조회 실패')
    return response.json()
  },

  // 게시글 상세 조회
  getPostById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)
    if (!response.ok) throw new Error('게시글 조회 실패')
    return response.json()
  },

  // 게시글 생성
  createPost: async (title, content, author) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author })
    })
    if (!response.ok) throw new Error('게시글 생성 실패')
    return response.json()
  },

  // 게시글 수정
  updatePost: async (id, title, content, author) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author })
    })
    if (!response.ok) throw new Error('게시글 수정 실패')
    return response.json()
  },

  // 게시글 삭제
  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('게시글 삭제 실패')
    return true
  }
}
