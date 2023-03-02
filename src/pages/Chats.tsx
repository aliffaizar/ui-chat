import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useUser } from '../hooks/useUser'
import { Chat, Message, User } from '../interfaces/Interfaces'

const socket = io(import.meta.env.VITE_API)

export function Chats() {
  const { roomId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<string>('')
  const [chat, setChat] = useState<Chat | null>(null)

  const user = useUser()

  useEffect(() => {
    const fetchChat = async () => {
      const { data: chat } = await axios.get(
        `${import.meta.env.VITE_API}/chats/${roomId}`
      )
      setChat(chat)
      setMessages(chat.messages)
    }
    fetchChat()

    socket.on(`messages-${roomId}`, (messages) => {
      setMessages(messages)
    })
  }, [])

  const avatar = useMemo(() => {
    return chat?.messages[0].sender
  }, [chat])

  const handleSendMessage = async () => {
    await socket.emit('sendMessage', {
      roomId,
      sender: user?.role === 'agent' ? avatar : user?.name,
      content: message,
    })
    setMessage('')
  }

  return (
    <>
      <div className='flex flex-col h-[80vh] relative'>
        <div className='flex flex-col flex-1 overflow-y-auto'>
          <div className='flex flex-col flex-1'>
            {messages.map((message, i) => (
              <div key={i}>
                <div>
                  <span className='mr-3'>from : {message.sender}</span>
                  <span>{message.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute bottom-0 inset-x-0'>
          <div className='flex items-center gap-5'>
            <input
              type='text'
              className='w-full p-2 border rounded-md'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className='bg-blue-500 text-white rounded-md px-4 py-2'
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
