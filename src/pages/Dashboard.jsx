import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import { getToken } from "../utils/jwt";
import "../assets/style/Dashboard.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    fetchBookings(query);
  }, [location.search]);

  const fetchBookings = (query) => {
    const token = getToken();
    if (!token) {
      console.error("JWT token not found.");
      return;
    }

    const url = query ? `https://cleanease-backend.onrender.com/api/bookings/search?query=${query}` : "https://cleanease-backend.onrender.com/api/bookings";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching bookings:", error);
      });
  };

  const handlenavigate = () => {
    navigate("/Booking");
  };

  const handleDelete = (id) => {
    const token = getToken();
    if (!token) {
      console.error("JWT token not found.");
      return;
    }

    fetch(`https://cleanease-backend.onrender.com/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete booking");
        }
        
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <CustomNavbar />
      <div className="dashboard">
        <h1>Welcome to CleanEase Dashboard</h1>
        <div className="bookings-section">
          <h2>Bookings</h2>
          <div className="add-booking">
            <button onClick={handlenavigate}>Add Booking</button>
          </div>
          <div className="bookings-container">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h3>{booking.service}</h3>
                <p>Service: {booking.service}</p>
                <p>Status: {booking.status}</p>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Time: {new Date(booking.date).toLocaleTimeString()}</p>
                <button onClick={() => handleDelete(booking._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
