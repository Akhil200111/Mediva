import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Container, Card, Button, ListGroup, Badge, Navbar, Row, Col, Spinner, Modal } from "react-bootstrap"; // ✅ Import Modal

const BoyHome = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); // ✅ Define selectedImage state

    // Fetch all orders from the backend
    useState(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/orders/allorders", {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
            setLoading(false);
        };
        fetchOrders();
    }, [token]);

    // Function to update order status
    const updateStatus = async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/orders/${id}`, 
                {status: newStatus},
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Logout functioon
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove auth token
        localStorage.removeItem("userObjId"); // Remove user ID if stored
        navigate('/login'); //Redirect to login page
    };
  return (
    <div style={{backgroundColor:  "#f8f9fa", minHeight: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="p-3 d-flex justify-content-between">
        <Navbar.Brand>Delivery Boy Dashboard</Navbar.Brand>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Navbar>

      {/* Welcome Section */}
      <Container className="text-center mt-4">
        <h2>Welcome, Delivery Partner! 🚚</h2>
        <p className="text-muted">Check your orders and update the delivery status.</p>
      </Container>

      {/* Orders Section */}
      <Container className="mt-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-muted">No orders available.</p>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col md={4} sm={6} key={order._id} className="mb-4">
                <Card className="shadow-sm">
                  {order.imageUrl && (
                    <div className="text-center p-2">
                      {/* Small thumbnail */}
                      <img
                        src={`http://localhost:8000/${order.imageUrl}`}
                        alt="Order Thumbnail"
                        style={{
                          width: "80px",
                          height: "50px",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                        onClick={() =>
                          setSelectedImage(`http://localhost:8000/${order.imageUrl}`)
                        }
                      />
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{order.orderText || "No Product Name"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Customer: {order.userId?.name || "Unknown"}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Address:</strong> {order.userId?.address || "Not Available"}
                    </Card.Text>
                    <ListGroup horizontal>
                      <ListGroup.Item>
                        Status:{" "}
                        <Badge
                          bg={
                            order.status === "Pending"
                              ? "warning"
                              : order.status === "Out for Delivery"
                              ? "primary"
                              : "success"
                          }
                          text="dark"
                        >
                          {order.status}
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="mt-3">
                      {order.status !== "Delivered" && (
                        <Button
                          variant={order.status === "Pending" ? "primary" : "success"}
                          onClick={() =>
                            updateStatus(
                              order._id,
                              order.status === "Pending" ? "Out for Delivery" : "Delivered"
                            )
                          }
                        >
                          {order.status === "Pending" ? "Start Delivery" : "Mark as Delivered"}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* ✅ Fullscreen Image Modal */}
      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full Image"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BoyHome;
