import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const AddLaboratoryStaff = () => {

  cosnt[FormData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  return (
    <div>
      <Container className='mt-4'>
        <Row className='justify-content-md-center'>
          <Col md={6}>
            <h2 className="text-center mb-4">Add Laboratory Staff</h2>

            {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}
             
             <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name='name' value={FormData.name} onChange={handleChange} isInvalid= {!error.name}></Form.Control>
                <Form.Control.Feedback type='invalid'>{error.name}</Form.Control.Feedback>
              </Form.Group>

             </Form>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddLaboratoryStaff;
