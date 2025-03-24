import { useState } from 'react'
import reactLogo from './assets/react.svg'
import loginimage from './assets/loginpage.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <button>
            Login
          </button>
          <button>
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
