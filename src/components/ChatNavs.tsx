import axios from 'axios'
import { useEffect, useState } from 'react'
import { Chat, User } from '../interfaces/Interfaces'

export function ChatNavs({ chat, members }: { chat: Chat; members: string[] }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await axios.get(
        `${import.meta.env.VITE_API}/auth/user/${members[0]}`
      )
      setUser(user)
    }
    fetchUser()
  }, [members])

  return (
    <>
      <a
        className='w-full text-lg text-white font-semibold'
        href={`/chats/${chat.roomId}`}
      >
        {<span>{user?.name}</span>}
      </a>
    </>
  )
}
