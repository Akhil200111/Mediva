
import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import UserSidebar from "./UserSidebar";
import axios from "axios";

function UserProductBooking() {
  const userId = localStorage.getItem("userObjId");
  const token = localStorage.getItem("authToken");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userId && token) {
      fetchBookings();
    }
  }, [userId, token]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert(error.response.data.message)
    }
  };

  return (
    <Container fluid className="d-flex">
      <UserSidebar />
      <Container
        style={{ marginLeft: "16rem", padding: "20px", width: "100%" }}
      >
        <h2 className="mb-4">Your Bookings</h2>
        <Row>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Col key={booking._id} md={4} className="mb-4">
                <Card style={{ height: "100%" }} className="d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/${booking.productId.image}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{booking.productId.equipmentName}</Card.Title>
                      <Card.Text>
                        Booking Date: {new Date(booking.bookedAt).toLocaleDateString()}
                      </Card.Text>
                    </div>
                    <div>
                      <Button variant="primary" disabled>
                        {booking.status.toUpperCase()}
                      </Button>
                      <Button 
                        variant="danger" 
                        className="ml-2"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default UserProductBooking;
