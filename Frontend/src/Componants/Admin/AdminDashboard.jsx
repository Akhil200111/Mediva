import React from 'react';
import {Navbar, Nav, Container, Row, Col, Button} from 'react-bootstrap'
import AddDoctor from './AddDoctor';
const AdminDashboard = () => {
  return (
    <div className='admindashboard'>

{/* Navbar Section */}

        <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#notifications">Notifications</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

{/* Main Dashboard Content */}

   <Container fluid>
    <Row>
        {/* Sidebar */}
        <Col xs= {3} md ={2} className='adminsidebar bg-light sidebar-fixed'>
          <Nav className='flex-column mt-5'>
             <Nav.Link onClick={() => handleViewChange('dashboard')}>Dashboard</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('ViewRentalStaff')}>Rental Staff</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('viewDoctors')}>Doctors</Nav.Link>
             <Nav.Link onClick={() => handleViewChange('viewLabStaff')}>Lab Staff</Nav.Link>
          </Nav>
        </Col>

{/* Main Content */}
        <Col xs={9} md={10} className='adminmain-content mt-5'>
         {/* Dynamic Views */}
           {views == 'addDoctor' && <AddDoctor />}
        </Col>

    </Row>
   </Container>
    </div>
  );
}

export default AdminDashboard;
