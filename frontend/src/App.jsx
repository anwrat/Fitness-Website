import { useState } from 'react'
import reactLogo from './assets/react.svg'
import loginimage from './assets/loginpage.jpg'
import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);  
  };

  return (
    <>
      <div>
        <img src={loginimage} className="logo" alt="Vite logo" />
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="Mainheading">Fitness App Test Page</h1>
      <div className="card">
        <div className="buttoncontainer">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={()=>handleNavigate("/login")}>
            Login
          </button>
          <button onClick={()=>handleNavigate("/signup")}>
            SignUp
          </button>
        </div>
      </div>
      <p className="read-the-docs">
        Just a simple testing page
      </p>
    </>
  )
}

export default App
