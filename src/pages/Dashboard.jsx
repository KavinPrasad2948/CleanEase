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
    const query = searchParams.get('query');
    fetchBookings(query);
  }, [location.search]);

  const fetchBookings = async (query) => {
    const token = getToken();
    if (!token) {
      console.error("JWT token not found.");
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const url = query ? `https://cleanease-backend.onrender.com/api/bookings/search?query=${query}` : "https://cleanease-backend.onrender.com/api/bookings";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate("/Booking");
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) {
      console.error("JWT token not found.");
      return;
    }

    try {
      const response = await fetch(`https://cleanease-backend.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
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
            <button onClick={handleNavigate}>Add Booking</button>
          </div>
          <div className="bookings-container">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div className="booking-card" key={booking._id}>
                  <h3>{booking.service}</h3>
                  <p>Service: {booking.service}</p>
                  <p>Status: {booking.status}</p>
                  <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p>Time: {new Date(booking.date).toLocaleTimeString()}</p>
                  <button onClick={() => handleDelete(booking._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
