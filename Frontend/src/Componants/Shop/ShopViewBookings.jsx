import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert } from "react-bootstrap";

function ShopViewBookings() {
  const shopId = localStorage.getItem("shopObjId");
  const token = localStorage.getItem("authToken");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rentalshop/bookings/${shopId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        

        // Sort bookings by bookedAt (date) in descending order (latest first)
        const sortedBookings = response.data.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  return (
    <Container>
      <h2 className="text-center my-4">Shop Bookings</h2>

      {bookings.length === 0 ? (
        <Alert variant="info" className="text-center">
          No bookings found
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.productId.equipmentName}</td>
                <td>{booking.userId.name}</td>
                <td>{booking.userId.phone}</td>
                <td>{booking.userId.address}</td>
                <td>{new Date(booking.bookedAt).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ShopViewBookings;
