
import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';  // Import the AddProduct component
import './RentalShophome.css'; // Import the updated CSS
import axios from 'axios';
import ViewProducts from './ViewProducts';
import ShopEditProduct from './ShopEditProduct';
import { useNavigate } from 'react-router-dom';
import ShopViewBookings from './ShopViewBookings';

function RentalShophome() {
  // State to hold total products fetched from the API
  const [totalProducts, setTotalProducts] = useState(0);
  const [availableProducts] = useState(75);
  const [newBookings] = useState(10);
  const [completedBookings] = useState(50);
  const [pendingReturns] = useState(5);
  const [currentView, setCurrentView] = useState('dashboard');  // Default view is 'dashboard'
  const [shopData,setShop]=useState('')
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate()
  // Fetch total products on component mount
  async function fetchShopData() {
    const token = localStorage.getItem('authToken');
    const shopId = localStorage.getItem('shoplogId');
  
    try {
      const response = await axios.get(`http://localhost:8000/api/rentalshop/${shopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setShop(response.data)
      localStorage.setItem('shopObjId',response.data._id)
      // Handle the response data
      if (!token) {
        console.error('No auth token found in localStorage');
        // Redirect to login or handle accordingly
      }
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  }
  useEffect(() => {
   fetchShopData()
    async function fetchTotalProducts() {
      try {
        const response = await fetch('/api/dashboard/totalProducts');
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the fetched data
        setTotalProducts(data.totalProducts || 0);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    }

    fetchTotalProducts();
  }, []);

  // Function to handle navigation
  const handleNavigation = (view) => {
    setCurrentView(view);  // Change the current view state based on the clicked link
  };
  const handleEdit = (product) => {
    setProductToEdit(product);
    setCurrentView('editProduct');
  }
  const handleLogout = () => {
    // Remove authentication token
    localStorage.removeItem('authToken');
  localStorage.removeItem('shopObjId')
  localStorage.removeItem('shoplogId')
    // Redirect and replace history (so user can't go back)
    navigate('/', { replace: true });
  };
  return (
    <div className="shop_rental-home">
      <div className="shop_sidebar">
        <h2>{shopData.shopName}</h2>
        <ul>
          <li>
            <a 
              href="#"
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => handleNavigation('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#"
              className={currentView === 'addProduct' ? 'active' : ''}
              onClick={() => handleNavigation('addProduct')}
            >
              Add Product
            </a>
          </li>
          <li>
            <a 
              href="#"
              className={currentView === 'bookings' ? 'active' : ''}
              onClick={() => handleNavigation('bookings')}
            >
              Bookings
            </a>
          </li>
          <li>
            <a 
              href="#"
              className={currentView === 'viewproduct' ? 'active' : ''}
              onClick={() => handleNavigation('viewproduct')}
            >
              ViewProduct
            </a>
          </li>
          <li>
            <a 
              href="#"
              onClick={() => handleNavigation('alerts')}
            >
              Alerts
            </a>
            <a 
  href="#" 
  onClick={handleLogout} 
  style={{ cursor: 'pointer' }}
>
  Logout
</a>
          </li>
        </ul>
      </div>

      <div className="shop_content">
        {currentView === 'dashboard' && (
          <>
            <h1>Dashboard</h1>
            <div className="shop_dashboard">
              <div className="shop_card shop_card-blue">
                <h3>Total Products</h3>
                <span className="shop_card-text">{totalProducts}</span>
              </div>
              <div className="shop_card shop_card-light-blue">
                <h3>Available Products</h3>
                <span>{availableProducts}</span>
              </div>
              <div className="shop_card shop_card-red">
                <h3>New Bookings</h3>
                <span>{newBookings}</span>
              </div>
              <div className="shop_card shop_card-orange">
                <h3>Completed Bookings</h3>
                <span>{completedBookings}</span>
              </div>
              <div className="shop_card shop_card-purple">
                <h3>Pending Returns</h3>
                <span>{pendingReturns}</span>
              </div>
            </div>
          </>
        )}

        {currentView === 'addProduct' && <AddProduct />}
        {/* Add more conditional renderings for other views if needed */}
        {currentView === 'viewproduct' && <ViewProducts onEdit={handleEdit} /> }
        {currentView === 'editProduct' && (
          <ShopEditProduct product={productToEdit} onSave={() => setCurrentView('viewproduct')} />
        )}
        {currentView ==='bookings' &&<ShopViewBookings/>}
      </div>
    </div>
  );
}

export default RentalShophome;
