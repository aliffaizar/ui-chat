import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Coba } from './pages/Coba'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Chats } from './pages/Chats'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/chats/:roomId' element={<Chats />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/coba' element={<Coba />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
