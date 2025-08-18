import { useState } from 'react'
import Signup from './Signup'
import Login from './Login';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Signup />
    <Login />
    </>
  );
}

export default App
