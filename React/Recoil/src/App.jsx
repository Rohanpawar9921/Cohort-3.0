
import { useEffect, useState, memo } from 'react'
import './App.css'

function App() {

  return (
    <>
      <Counter />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect (() => {
    setInterval(() => {
      setCount(c => c+1)
    }, 2000)
  }, []);
  return <div>
    <MemoizedCurrentCount />
    <Increase />
    <Decrease />
  </div>
}

const MemoizedCurrentCount = memo(CurrentCount);

const CurrentCount = memo(function () {
  return <div>
    1
  </div>
})

const Increase = memo(function() {
  function increase() {
    
  }
  return <div>

  </div>
})

const Decrease = memo(function () {
  function decrease() {
  }
  return <div>

  </div>
})
export default App
