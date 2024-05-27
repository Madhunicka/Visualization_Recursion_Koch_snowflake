import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KochSnowflake from './comp1/KochSnowflake'

function App() {
  const [depth, setDepth] = useState(5); // Set an initial depth value

  return (
    <>
      <h1 className='text-3xl'>Visualization of Recursion</h1>
      <KochSnowflake depth={depth} /> {/* Pass the depth prop */}
    </>
  );
}

export default App
