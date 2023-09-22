import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SideBar from './components/SideBar'
import InfoDisplay from './components/InfoDisplay'
import InfoInput from './components/InfoInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SideBar />
      <InfoInput />
      <InfoDisplay />
    </div>
  )
}

export default App

// wrapper -> 
// being able to change places
// anchor side bar
// download, edit

// clones react js
// shopping
// this project
// gym logger workout tracker
