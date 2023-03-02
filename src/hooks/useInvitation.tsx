import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useUser } from './useUser'

const socket = io(import.meta.env.VITE_API)

export function useInvitation(role: string | undefined) {
  const [invitation, setInvitation] = useState<string | null>(null)
  const user = useUser()

  useEffect(() => {
    if (role === 'agent') {
      socket.on('inviteAgent', (invitation) => {
        setInvitation(invitation)
      })
    }
    socket.on(`invitation-${user?.id}`, (invitation) => {
      setInvitation(invitation)
    })
    console.log('invitation')
  }, [])

  return { invitation }
}
