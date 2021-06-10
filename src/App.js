import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Footer from './Components/Footer'
import User from './Components/User'
import ProtectedRoute from './Components/Helpers/ProtectedRoute'
import { UserStorage } from './Contexts/UserContext'

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login/*' element={<Login />} />
            <ProtectedRoute path='conta/*' element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
