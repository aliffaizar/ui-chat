import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_API)

export function ModalInvitation({
  isOpen,
  onClose,
  roomId,
}: {
  isOpen: boolean
  onClose: () => void
  roomId?: string | null
}) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const handleAccept = () => {
    socket.emit('acceptInvitation', {
      roomId,
      userId: user.id,
      status: 'accepted',
    })
    navigate(`/chats/${roomId}`)
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-xl text-center font-medium leading-6 text-gray-900'
                >
                  You are invited to join a chat room
                </Dialog.Title>
                <p className='text-center text-lg'>{roomId}</p>
                <div className='flex justify-center items-end gap-5 mt-5'>
                  <button
                    onClick={onClose}
                    className='bg-red-500 text-white rounded-md px-4 py-2'
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAccept}
                    className='bg-green-500 text-white rounded-md px-4 py-2'
                  >
                    Accept
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
