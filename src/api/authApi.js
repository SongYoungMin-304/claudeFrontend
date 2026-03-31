const API_BASE_URL = 'http://localhost:8080/api'

export const authApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || '로그인 실패')
    }
    
    const data = await response.json()
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('email', data.email)
    
    return data
  },

  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || '회원가입 실패')
    }
    
    return response.json()
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
  },

  getToken: () => localStorage.getItem('accessToken'),
  isAuthenticated: () => !!localStorage.getItem('accessToken'),
  getUser: () => ({
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email')
  })
}
