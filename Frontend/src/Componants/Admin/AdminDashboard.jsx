import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDoctor from './AddDoctor';
import AdminViewDoctor from './AdminViewDoctor';
import { useNavigate } from 'react-router-dom';
import AddRentalStaff from './AddRentalStaff';
import ViewLabStaff from './ViewLabStaff';
import AddLaboratoryStaff from './AddLaboratoryStaff';
import EditDoctor from './EditDoctor';
import EditRentalStaff from './EditRentalStaff';
const AdminDashboard = () => {
    const [view, setView] = useState(''); //state to track selected view
    const [editDoctorId, setEditDoctorId] = useState(null); //state to track doctor id for editing
    const [editRentalStaffId, setRentalStaffId]  = useState(null); // state to track rental staff id for editing
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Handle view change for sidebar navigation
    const handleViewChange = (newView, id = null) => {
        setView(newView);
    

    if(newView === 'editDoctor'){
        setEditDoctorId(id);
        setRentalStaffId(null);
    } else if(newView === 'editRentalStaff'){
      setRentalStaffId(id);
      setEditDoctorId(null);
    } else{
      setEditDoctorId(null);
      setRentalStaffId(null)
    }
    };

    // Handle logout functionality
     const handleLogout = () => {
      localStorage.removeItem('authToken'); //Remove token
      navigate("/", {replace: true}); //Redirect to login page
     }
  return (
    <div className='admindashboard'>

{/* Navbar Section */}

        <Navbar expand="lg" className="adminnavbar ">
      <Container className='container'>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#notifications">Notifications</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>

            <Nav.Link onClick={handleLogout}>
              <Button variant='outline-danger'>Log Out</Button>
            </Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

{/* Main Dashboard Content */}

   <Container fluid>
    <Row>
        {/* Sidebar */}
        <Col xs={12} md={2} className='adminsidebar bg-light sidebar-fixed'>
          <Nav className='flex-column mt-5'>
             <Nav.Link onClick={() => handleViewChange('dashboard')}>Dashboard</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('ViewRentalStaff')}>Rental Staff</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('viewDoctors')}>Doctors</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('viewLabStaff')}>Lab Staff</Nav.Link>
          </Nav>
        </Col>

{/* Main Content */}
        <Col xs={12} md={10} className='adminmain-content mt-5'>
         {/* Dynamic Views */}
           {view == 'addDoctor' && <AddDoctor />}
           {view == 'viewDoctor' && (<AdminViewDoctor 
           onEditDoctor = {(id) => handleViewChange('editDoctor', id)}
           onAddDoctor = {() => handleViewChange('addDoctor')}
           />)}
           {view === 'addRentalShop' && <AddRentalStaff />}
           {view === 'viewRentalStaff' && (
            <ViewLabStaff 
            onAddLabStaff = {() => handleViewChange('addlaboratorystaff')} //pass the function
            />
           )}
           {view === 'addlaboratorystaff' && <AddLaboratoryStaff />}
           {view === 'dashboard' && 
            <div className="mt-4">
                <h2>Welcome to the Admin Dashboard</h2>

                {/* Dummy Rectangle */}

                <Row>
                  <Col md={4}>
                  <div className="dashboard-card">
                    <h5>Total Products</h5>
                    <p>120</p>
                  </div>
                  </Col>
                  <Col md={4}>
                  <div className="dashboard-card">
                    <h5>Pending Orders</h5>
                    <p>15</p>
                  </div>
                  </Col>
                  <Col md={4}>
                  <div className="dashboard-card">
                    <h5>Total Revenue</h5>
                    <p>$5,450</p>
                  </div>
                  </Col>
                </Row>
            </div>
           }
           {view === 'editDoctor' && <EditDoctor doctorId = {editDoctorId}/>} {/* pass doctor Id */}
           {view === 'editRentalStaff' && <EditRentalStaff  shopId ={editRentalStaffId}/>}  {/* pass rental staff Id */}
        </Col>
    </Row>
   </Container>
    </div>
  );
}

export default AdminDashboard;
