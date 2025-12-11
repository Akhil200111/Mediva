import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabSidebar from './LabSidebar';
import axios from 'axios';

const CheckUps = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [uploading, setUploading] = useState(false);
  const labobjId = localStorage.getItem('labobjId');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!labobjId || !authToken) {
      navigate('/login'); // Redirect to login if missing credentials
      return;
    }
    fetchBookings();
  }, [labobjId, authToken, navigate]);

  // ✅ Fetch all checkups for the logged-in lab
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/checkup/lab/${labobjId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log('Bookings Data:', response.data);
      setBookings(response.data.checkups);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // ✅ Update checkup status (Pending → In Progress → Completed)
  const updateStatus = async (checkupId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/checkup/${checkupId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      fetchBookings(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // ✅ Upload test result & Update status to "Completed"
  const handleFileUpload = async (checkupId, file) => {
    const formData = new FormData();
    formData.append('result', file);

    setUploading(true);
    try {
      // Step 1: Upload the result file
      const response = await axios.post(`http://localhost:8000/api/checkup/${checkupId}/result`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      

      // Step 2: After upload, update status to "Completed"
    //   await updateStatus(checkupId, 'Completed');

      alert('Result uploaded and status updated to Completed');
      fetchBookings(); // Refresh data
    } catch (error) {
      console.error('Error uploading result:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <LabSidebar />
      <div style={{ marginLeft: '16rem', padding: '20px', width: '100%' }}>
        <h2>CheckUps & Bookings</h2>
        {bookings.length > 0 ? (
          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Test Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Prescription</th>
                <th>Update Status</th>
                <th>Upload Result</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name || 'N/A'}</td>
                  <td>{booking.testName || 'Unknown'}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.prescription ? (
                      <a
                        href={`http://localhost:8000${booking.prescription}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Prescription
                      </a>
                    ) : (
                      'No Prescription'
                    )}
                  </td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed" disabled>Completed</option> {/* Disabled to prevent manual change */}
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(booking._id, e.target.files[0])}
                      disabled={uploading || booking.status === 'Completed'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
}

export default CheckUps;
