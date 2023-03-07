import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import { useUser } from '../hooks/useUser'
import { ModalStartChat } from '../components/ModalStartChat'

import { ModalInvitation } from '../components/ModalInvitation'
import { ModalInviteProvider } from '../components/ModalInviteProvider'

const socket = io(import.meta.env.VITE_API)

export function MainLayout() {
  const { roomId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isInvited, setIsInvited] = useState(false)
  const [invitation, setInvitation] = useState<any>(null)
  const user = useUser()

  useEffect(() => {
    if (user?.role === 'agent') {
      socket.on('inviteAgent', (invitation) => {
        if (invitation.status === 'accepted') {
          setInvitation(invitation.roomId)
          setIsInvited(false)
        } else {
          setInvitation(invitation.roomId)
          setIsInvited(true)
        }
      })
    }
    if (user?.role !== 'agent') {
      socket.on(`invitation-${user?.id}`, (invitation) => {
        setInvitation(invitation)
        setIsInvited(true)
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <>
      {/* <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
      {/* <div className='flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5'>
          <div className='flex flex-shrink-0 items-center px-4'>
            <a href='/'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300'
                alt='Your Company'
              />
            </a>
          </div>
          <div className='mt-5 flex flex-1 flex-col'>
            <nav className='flex-1 space-y-1 px-2 pb-4'>
              <div className='flex flex-col'>
                {chats?.map((chat) => (
                  <Fragment key={chat.roomId}>
                    <ChatNavs
                      chat={chat}
                      members={chat.members.filter(
                        (member) => member !== user?.id
                      )}
                    />
                  </Fragment>
                ))}
              </div>
            </nav>
          </div>
        </div> */}
      {/* </div> */}
      <div className='flex flex-1 flex-col '>
        <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
          <div className='flex flex-1 justify-between px-4'>
            <div className='ml-4 flex items-center md:ml-6'>
              {user?.role === 'user' && (
                <button onClick={() => setIsOpen(true)}>createChat</button>
              )}
              {user?.role === 'agent' && roomId && (
                <button onClick={() => setIsOpen(true)}>Invite HP</button>
              )}
            </div>
            <div className='flex items-center justify-end gap-5'>
              <h1 className='text-lg font-semibold'>{user?.name}</h1>
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
        </div>

        <main>
          <div className='py-6'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      {user?.role === 'user' && (
        <ModalStartChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {user?.role === 'agent' && (
        <ModalInviteProvider
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          roomId={roomId}
        />
      )}
      <ModalInvitation
        isOpen={isInvited}
        onClose={() => setIsInvited(false)}
        roomId={invitation}
      />
    </>
  )
}
