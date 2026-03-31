import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authApi.isAuthenticated()) {
      setUser(authApi.getUser())
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const data = await authApi.login(email, password)
    setUser({ userId: data.userId, email: data.email })
    return data
  }

  const signup = async (name, email, password) => authApi.signup(name, email, password)
  const logout = () => { authApi.logout(); setUser(null) }

  const value = { user, loading, isAuthenticated: !!user, login, signup, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
