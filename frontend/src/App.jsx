import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <h1>Bank Management System</h1>
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind Working 🚀
        </h1>
      </div>
    </>
  )
}

export default App
