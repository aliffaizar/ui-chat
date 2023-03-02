import axios from 'axios'
import { useEffect, useState } from 'react'
import { Chat } from '../interfaces/Interfaces'

export function useGetChats(userId: string | undefined) {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const fetchChats = async () => {
      const { data: chats } = await axios.get(
        `${import.meta.env.VITE_API}/chats?userId=${userId}`
      )
      setChats(chats)
    }
    fetchChats()
  }, [])

  return chats
}
