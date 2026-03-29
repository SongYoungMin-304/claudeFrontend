import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Hello, World! 👋</h1>
      <p>React + Vite 프론트엔드에 오신 것을 환영합니다.</p>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          클릭 횟수: {count}
        </button>
      </div>

      <div className="info">
        <p>👉 <code>src/App.jsx</code> 파일을 수정해보세요</p>
      </div>
    </div>
  )
}

export default App
