import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Footer from './Components/Footer'
import User from './Components/User'
import ProtectedRoute from './Components/Helpers/ProtectedRoute'
import Photo from './Components/Photo/Photo'
import UserProfile from './Components/User/UserProfile'
import NotFound from './Components/NotFound'
import { autoLogin } from './store/user'
import './App.css'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <main className='AppBody'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login/*' element={<Login />} />
            <ProtectedRoute path='conta/*' element={<User />} />
            <Route path='foto/:id' element={<Photo />} />
            <Route path='perfil/:user' element={<UserProfile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
