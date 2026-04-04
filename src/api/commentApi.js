const API_BASE_URL = 'http://localhost:8080/api/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const commentApi = {
  getComments: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('댓글 목록 조회 실패')
    return response.json()
  },

  getCommentCount: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/count`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('댓글 수 조회 실패')
    return response.json()
  },

  createComment: async (postId, content, parentId = null) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ content, parentId })
    })
    if (!response.ok) {
      if (response.status === 401) throw new Error('로그인이 필요합니다')
      throw new Error('댓글 작성 실패')
    }
    return response.json()
  },

  createReply: async (postId, parentId, content) => {
    return commentApi.createComment(postId, content, parentId)
  },

  updateComment: async (postId, commentId, content) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      if (response.status === 401) throw new Error('로그인이 필요합니다')
      if (response.status === 403) throw new Error('작성자만 수정할 수 있습니다')
      throw new Error('댓글 수정 실패')
    }
    return response.json()
  },

  deleteComment: async (postId, commentId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) {
      if (response.status === 401) throw new Error('로그인이 필요합니다')
      if (response.status === 403) throw new Error('작성자만 삭제할 수 있습니다')
      throw new Error('댓글 삭제 실패')
    }
    return true
  },

  likeComment: async (postId, commentId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`, {
      method: 'POST',
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) {
      if (response.status === 401) throw new Error('로그인이 필요합니다')
      throw new Error('좋아요 처리 실패')
    }
    return response.json()
  },

  getCommentLikeStatus: async (postId, commentId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`, {
      headers: { ...getAuthHeaders() }
    })
    if (!response.ok) throw new Error('좋아요 상태 조회 실패')
    return response.json()
  }
}
