import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import HomePageTest from "./components/HomepageTest.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route index element={<HomePageTest />} />
            </Routes>

    </>
  )
}

export default App
