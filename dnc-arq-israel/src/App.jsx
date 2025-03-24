import { useContext } from 'react'
import { AppContext } from './contexts/AppContext' 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

// PAGES
import Home from './pages/home'
import About from './pages/About'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import Projects from './pages/Projects'
import Contacts from './pages/Contact'

// UTILS
import ScrolltoTop from './utils/ScrolltoTop'



function App() {
  const appContext = useContext(AppContext)

  if (appContext.loading){
    return <LoadingSpinner/>
  }

  return (
    <Router>
      <ScrolltoTop />
     <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/projects' element={<Projects />}></Route>
      <Route path='/contact' element={<Contacts />}></Route>
     </Routes>
    </Router>
  )
}

export default App
