import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../interfaces/Interfaces'

export function useUser() {
  const navigate = useNavigate()
  const user = useMemo((): User | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return user
}
