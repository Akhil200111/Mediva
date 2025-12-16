
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import UserSidebar from "./UserSidebar";

const UserViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userObjId");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Handle booking
  const handleBookNow = async () => {
    if (!userId) {
      alert("You must be logged in to book a product.");
      return;
    }

    if (selectedProduct.quantity <= 0) {
      alert("This product is out of stock.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        {
          userId,
          productId: selectedProduct._id,
          status: "booked",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reduce quantity in the frontend
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );

      alert("Product booked successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error booking product:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (

    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <UserSidebar/>
    <Container style={{ marginLeft: "16rem", padding: "20px", width: "100%" }}>
      <h2 className="text-center mt-4">Available Products</h2>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length > 0 ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4} sm={6} className="mb-4">
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.equipmentName}</Card.Title>
                  <Card.Text className="text-primary fw-bold">${product.rentalPrice}</Card.Text>
                  <Card.Text className="text-muted">Available: {product.quantity}</Card.Text>
                  <Button
                    variant="info"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No products available.</p>
      )}

      {/* Product Details & Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.equipmentName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`http://localhost:8000/${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="img-fluid mb-3"
                style={{ borderRadius: "8px" }}
              />
              <p><strong>Price:</strong> ${selectedProduct.rentalPrice}</p>
              <p><strong>Available Quantity:</strong> {selectedProduct.quantity}</p>
              <p><strong>Description:</strong> {selectedProduct.description || "No description available."}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button
                variant="success"
                onClick={handleBookNow}
                disabled={selectedProduct.quantity <= 0}
              >
                {selectedProduct.quantity > 0 ? "Book Now" : "Out of Stock"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
    </div>
  );
};

export default UserViewProduct;
