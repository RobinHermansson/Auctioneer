import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home';

function App() {
  const [token, setToken] = useState("")

  if (!token)
    return(<Login setToken={setToken}/>)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
