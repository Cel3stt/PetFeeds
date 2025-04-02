import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sample from './Pages/sample'  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Sample />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
