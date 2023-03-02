import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useUser } from '../hooks/useUser'
import { Chat } from '../interfaces/Interfaces'

const socket = io(import.meta.env.VITE_API, {})

export function ModalStartChat({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [avatar, setAvatar] = useState('')
  const user = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('createChat', { userId: user?.id, avatar }, (chat: Chat) => {
      navigate(`/chats/${chat.roomId}`)
    })
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
                  Select Avatar
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className='mt-5'>
                    <label
                      htmlFor='avatar'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                    >
                      Select an option
                    </label>
                    <select
                      id='avatar'
                      onChange={(e) => setAvatar(e.target.value)}
                      value={avatar}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 '
                    >
                      <option disabled value=''>
                        Select an avatar
                      </option>
                      <option value='a'>Avatar A</option>
                      <option value='b'>Avatar B</option>
                    </select>
                  </div>
                  <div className='mt-4'>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                    >
                      Start Chat
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
