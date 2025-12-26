
import './App.css'
import AdminDashboard from './Componants/Admin/AdminDashboard'
import EditDoctor from './Componants/Admin/EditDoctor'
import Login from './Componants/Login'
import {Route, Routes} from 'react-router-dom'
import UserRegister from './Componants/User/UserRegister'
import Userhome from './Componants/User/Userhome'
import DoctorHome from './Componants/Doctor/DoctorHome'
import UserViewDoctor from './Componants/User/UserViewDoctor'
import UserViewBookings from './Componants/User/UserViewBookings'
import RentalShophome from './Componants/Shop/RentalShophome'
import UserViewProduct from './Componants/User/UserViewProduct'
import UserProductBooking from './Componants/User/UserProductBooking'
import ViewLabs from './Componants/User/ViewLabs'
import Dashboard from './Componants/Lab/Dashboard'
import CheckUps from './Componants/Lab/CheckUps'
import MyCheckups from './Componants/User/MyCheckups'
import Groceries from './Componants/User/Groceries'
import BoyHome from './Componants/DeliveryBoy/BoyHome'

function App() {


  return (
    <>
     <Routes>
       <Route path='/' element={<Login/>}/>,
       <Route path='/admin' element={<AdminDashboard/>} />
       <Route path='/edit-doctor/:id' element={<EditDoctor />} />
       <Route path='/user' element={<UserRegister />} />
       <Route path='/user-home' element={<Userhome />} />
       <Route path='/doctor-home' element={<DoctorHome />} />
       <Route path='/userviewdoctor' element={<UserViewDoctor />} />
       <Route path='/userviewbooking' element={<UserViewBookings />} />
       <Route path='/shophome' element={<RentalShophome />} />
       <Route path='/userviewproduct' element={<UserViewProduct />} />
       <Route path='/userproductbookings' element={<UserProductBooking />} />
       <Route path='/view-Lab' element={<ViewLabs />} />
       <Route path='/labhome' element={<Dashboard />} />
       <Route path='/checkup' element={<CheckUps />} />
       <Route path='/mycheckups' element={<MyCheckups />} />
       <Route path='/groceries' element={<Groceries />} />
       <Route path='/deliveryboy' element={<BoyHome />} />

     </Routes>
    </>
  )
}

export default App
