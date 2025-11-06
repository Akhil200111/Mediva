
import './App.css'
import Login from './Componants/Login'
import {Route, Routes} from 'react-router-dom'

function App() {


  return (
    <>
     <Routes>
       <Route path='/' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
