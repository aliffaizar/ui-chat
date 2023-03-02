export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
}

export interface Message {
  sender: string
  content: string
}

export interface Chat {
  roomId: string
  members: string[]
  messages: Message[]
}
