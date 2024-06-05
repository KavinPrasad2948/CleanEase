import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { NavDropdown } from "react-bootstrap";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import '../assets/style/Booking.css';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);

    switch (service) {
      case "Commercial Cleaning":
        setServicePrice(600);
        break;
      case "Professional Cleaning":
        setServicePrice(300);
        break;
      case "Carpet Cleaning":
        setServicePrice(200);
        break;
      default:
        setServicePrice(0);
    }
  };

  const handleBookingSubmit = () => {
    if (selectedDate && selectedService) {
      const bookingData = {
        service: selectedService,
        date: selectedDate,
        price: servicePrice,
        userEmail: userEmail,
      };

      
      axios.post("https://cleanease-backend.onrender.com/api/bookings", bookingData)  
        .then((response) => {
          console.log("Booking created successfully:", response.data);
          navigate("/payment", { state: { bookingData: response.data } });
        })
        .catch((error) => {
          if (error.response) {
            console.error("Server Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("Network Error:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    } else {
      console.error("Please select a date and service before submitting.");
    }
  };

  return (
    <div>
      <CustomNavbar />
      <div className="booking-page">
        <h1>Book Your Cleaning Appointment</h1>

        <p>Select a date for your cleaning service:</p>
        <div className="card">
          <input
            type="date"
            value={selectedDate || ""}
            onChange={(e) => handleDateSelection(e.target.value)}
          />

          <NavDropdown title="Services" id="services-dropdown">
            <NavDropdown.Item
              onClick={() => handleServiceSelection("Commercial Cleaning")}
              style={{ color: "#333" }}
            >
              Commercial Cleaning
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleServiceSelection("Professional Cleaning")}
            >
              Professional Cleaning
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => handleServiceSelection("Carpet Cleaning")}
            >
              Carpet Cleaning
            </NavDropdown.Item>
          </NavDropdown>

          <p>Price: Rs {servicePrice}</p>

          <button onClick={handleBookingSubmit}>Book Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
