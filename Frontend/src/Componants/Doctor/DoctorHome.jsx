import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#2c3e50',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    doctorImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    sidebarItem: {
        marginBottom: '15px',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'none',
        color: '#ecf0f1',
        backgroundColor: '#34495e',
        textAlign: 'center',
        transition: 'background-color 0.3s',
        width: '100%',
    },
    content: {
        flex: 1,
        padding: '20px',
    },
    header: {
        backgroundColor: '#1abc9c',
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
};

const DoctorHome = () => {
    const doctorlogId = localStorage.getItem('doctorlogId');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState('home') // Default view

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/doctors/doctorhome/${doctorlogId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                localStorage.setItem('doctorObjId', response.data._id);
                setDoctor(response.data);

            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, []);

    const handleNavigation = (view) => {
        setCurrentView(view);
    };
    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                {loading ? (
                    <p style={{ color: '#ecf0f1' }}>Loading...</p>
                ) : doctor ? (
                    <>
                        <img src={`http://localhost:8000/${doctor.image}`} alt={doctor.name} style={styles.doctorImage} />
                        <h3 style={{ color: '#ecf0f1' }}>{doctor.name}</h3>
                        <p style={{ color: '#bdc3c7' }}>{doctor.specialization}</p>
                        <div style={styles.sidebarItem} onClick={() => handleNavigation('home')}>Home</div>
                        <div style={styles.sidebarItem} onClick={() => handleNavigation('appointments')}>Appointments</div>
                        {/* <div style={styles.sidebarItem} onClick={() => handleNavigation('patients')}>Patients</div> */}
                        <div style={styles.sidebarItem} onClick={() => handleNavigation('profile')}>Profile</div>
                        <div style={styles.sidebarItem} onClick={() => handleNavigation('settings')}>Settings</div>
                        <div style={styles.sidebarItem} onClick={handleLogout}>Logout</div>

                    </>
                ) : (
                    <p style={{ color: '#ecf0f1' }}>No data available</p>
                )}
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                <div style={styles.header}>Welcome to Doctor Dashboard</div>
                {currentView === 'home' && (
                    <div>
                        <div style={styles.card}>
                            <h3>New Patients</h3>
                            <p>3 new patients registered this week.</p>
                        </div>
                        <div style={styles.card}>
                            <h3>Profile</h3>
                            <p>Keep your profile up-to-date.</p>
                        </div>
                        <div style={styles.card}>
                            <h3>Profile</h3>
                            <p>Keep your profile up-to-date.</p>
                        </div>
                    </div>
                )}
                {currentView === 'appointments' && (

                    <DoctorViewAppoinments />

                )}

                {currentView === 'patients' && (
                    <div style={styles.card}>
                        <h3>New Patients</h3>
                        <p>3 new patients registered this week.</p>
                    </div>
                )}

                {currentView === 'profile' && (
                    <div style={styles.card}>
                        <ViewProfile />

                    </div>
                )}

                {currentView === 'settings' && (
                    <div style={styles.card}>
                        <h3>Settings</h3>
                        <p>Manage your account settings.</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default DoctorHome;
