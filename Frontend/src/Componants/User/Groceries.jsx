import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Spinner, Card, ListGroup, Badge } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import UserSidebar from "./UserSidebar";

function Groceries() {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userObjId");
  const [orderText, setOrderText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]); // State to store order history

  // Fetch order history when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        
        setOrders(response.data); // Store orders in state
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [userId, token]); // Re-run when userId or token changes

  const handleTextChange = (e) => setOrderText(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);
    if (orderText) formData.append("orderText", orderText);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/orders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Order submitted successfully!");
      setOrderText(""); // Clear form
      setImage(null);
      window.location.reload(); // Reload to update history
    } catch (error) {
      console.error("Error submitting order", error);
      alert("Failed to submit order. Try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <UserSidebar />
      <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Order Groceries or Medicines</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter items to order..."
              value={orderText}
              onChange={handleTextChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            <FaUpload size={20} />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Submit Order"}
          </Button>
        </Form>

        {/* Order History Section */}
        <h3 className="mt-5">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-muted">No past orders found.</p>
        ) : (
          <ListGroup className="mt-3">
            {orders.slice().reverse().map((order) => (
              <Card key={order._id} className="mb-3 shadow">
                <Card.Body>
                  <Card.Title>Order #{order._id.slice(-6)}</Card.Title>
                  <Card.Text>
                    <strong>Items:</strong> {order.orderText}
                    <strong>Items:</strong> {order.status}
                  </Card.Text>
                  {order.imageUrl && (
                    <div>
                      <strong>Uploaded Image:</strong><br />
                      <img src={`http://localhost:8000/${order.imageUrl}`} alt="Order" style={{ width: "100px" }} />
                    </div>
                  )}
                  <Badge bg="info">{new Date(order.createdAt).toLocaleString()}</Badge>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
}

export default Groceries;