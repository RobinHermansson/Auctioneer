import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';

function App() {
  const [token, setToken] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* Bortkommentera det här för att slå på login igen...
  if (!token)
  return (<Login setToken={setToken} />)
  */
  return (
    <div className={`app-layout ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
      <NavBar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
