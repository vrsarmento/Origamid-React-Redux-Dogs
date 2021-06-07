import './App.css'
import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserStorage } from './Contexts/UserContext'

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/*' element={<Login />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
