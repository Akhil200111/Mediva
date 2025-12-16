import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaDownload, FaEye } from 'react-icons/fa'; // ✅ Bootstrap Icons
import UserSidebar from './UserSidebar';

function MyCheckups() {
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userObjId");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User not authenticated.");
      return;
    }

    axios.get(`http://localhost:8000/api/checkup/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setCheckups(res.data.checkups || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching checkups:", err);
      setLoading(false);
    });
  }, [userId, token]);

  const downloadFile = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileUrl.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="d-flex">
      <UserSidebar />
      <Container className="mt-4" style={{ marginLeft: '300px' }}>
        <h2 className="mb-4 text-primary">📋 My Checkups</h2>
        
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="shadow">
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>Lab Name</th>
                <th>Date</th>
                <th>Prescription</th>
                <th>Status</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {checkups.length > 0 ? (
                checkups.slice().reverse().map((checkup) => (
                  <tr key={checkup._id} className="text-center">
                    <td>{checkup.lab.labName || 'N/A'}</td>
                    <td>{new Date(checkup.createdAt).toLocaleDateString()}</td>
                    <td>
                      {checkup.prescription ? (
                        <OverlayTrigger overlay={<Tooltip>View Prescription</Tooltip>}>
                          <a
                            href={`http://localhost:8000${checkup.prescription}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary"
                          >
                            <FaEye size={18} />
                          </a>
                        </OverlayTrigger>
                      ) : (
                        <span className="text-secondary">No Prescription</span>
                      )}
                    </td>
                    <td className="fw-bold">{checkup.status}</td>
                    <td>
                      {checkup.result ? (
                        <div className="d-flex justify-content-center gap-3">
                          {/* View Icon */}
                          <OverlayTrigger overlay={<Tooltip>View Result</Tooltip>}>
                            <a
                              href={`http://localhost:8000${checkup.result}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-info"
                            >
                              <FaEye size={18} />
                            </a>
                          </OverlayTrigger>

                          {/* Download Icon */}
                          <OverlayTrigger overlay={<Tooltip>Download Result</Tooltip>}>
                            <Button variant="link" className="p-0 text-success" onClick={() => downloadFile(`http://localhost:8000${checkup.result}`)}>
                              <FaDownload size={18} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      ) : (
                        <span className="text-secondary">{checkup.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-secondary">
                    No checkups found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

export default MyCheckups;
