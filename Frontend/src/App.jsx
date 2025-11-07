
import './App.css'
import AdminDashboard from './Componants/Admin/AdminDashboard'
import Login from './Componants/Login'
import {Route, Routes} from 'react-router-dom'

function App() {


  return (
    <>
     <Routes>
       <Route path='/' element={<Login/>}/>,
       <Route path='/admin' element={<AdminDashboard/>} />
     </Routes>
    </>
  )
}

export default App
