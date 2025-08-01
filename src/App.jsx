import { useState } from 'react'
import BottomBar from "./components/BottomBar.jsx";
import MiddlePanels from "./components/MiddlePanels.jsx";
import TopBar from "./components/TopBar.jsx";
import './App.css'

function App() {

  return (
    <div className="app">
      <TopBar />
      <MiddlePanels />
      <BottomBar />
    </div>
  )
}

export default App
