import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route,Outlet } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Navber from './components/Navber/Navber'
import Login from './components/Login/Login'
// import Contact from './components/Contact/Contact'
import Staff from './components/Staff-list/Staff'
import Profile from './components/Profile/Profile'
// import Karigor from './components/Karigor/Karigor'

function App() {

  return (
    <BrowserRouter>
      <Navber/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/contact' element={<Profile/>}/>
        <Route path='/staff' element={<Staff/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
