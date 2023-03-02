import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Chat } from '../interfaces/Interfaces'

const socket = io('http://localhost:3000', {})

export function useCreateChat(userId: number, avatar: string) {
  const [chat, setChat] = useState({} as Chat)

  useEffect(() => {
    socket.emit('createChat', { userId, avatar }, (chat: Chat) => setChat(chat))
  }, [])

  return chat
}
