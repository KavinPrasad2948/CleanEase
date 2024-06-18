import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { NavDropdown } from "react-bootstrap";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../assets/style/Booking.css";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [specificRequirements, setSpecificRequirements] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [numBathrooms, setNumBathrooms] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedFullName = localStorage.getItem("userFullName");
    const storedAddress = localStorage.getItem("userAddress");
    const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
    if (storedEmail) setUserEmail(storedEmail);
    if (storedFullName) setUserFullName(storedFullName);
    if (storedAddress) setUserAddress(storedAddress);
    if (storedPhoneNumber) setUserPhoneNumber(storedPhoneNumber);
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleServiceSelection = (service, price) => {
    setSelectedService(service);
    setServicePrice(price);
  };

  const handleBookingSubmit = () => {
    if (selectedDate && selectedService && selectedTime) {
      const bookingData = {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        specificRequirements: specificRequirements,
        price: servicePrice,
        userEmail: userEmail,
        userFullName: userFullName,
        userAddress: userAddress,
        userPhoneNumber: userPhoneNumber,
        numRooms: numRooms,
        numBathrooms: numBathrooms,
      };

      axios
        .post(
          "https://cleanease-backend.onrender.com/api/bookings",
          bookingData
        )
        .then((response) => {
          console.log("Booking created successfully:", response.data);
          navigate("/payment", { state: { bookingData: response.data } });
        })
        .catch((error) => {
          if (error.response) {
            setError(
              `Server Error: ${error.response.status} ${error.response.data}`
            );
          } else if (error.request) {
            setError("Network Error: Please check your internet connection.");
          } else {
            setError(`Error: ${error.message}`);
          }
        });
    } else {
      setError("Please complete all required fields before submitting.");
    }
  };
  axios
    .get("https://cleanease-backend.onrender.com/api/profile")
    .then((response) => {
      setUserEmail(response.data.email);
      setUserFullName(response.data.name);
      setUserAddress(response.data.address);
      setUserPhoneNumber(response.data.phone);
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });

  const services = [
    { name: "Commercial Cleaning", price: 600 },
    { name: "Residential Cleaning", price: 300 },
    { name: "Carpet Cleaning", price: 200 },
    { name: "Construction Cleaning", price: 800 },
    { name: "Office Cleaning", price: 900 },
    { name: "Move In/Out Cleaning", price: 700 },
    { name: "Window Cleaning", price: 250 },
    { name: "Deep Cleaning", price: 500 },
  ];

  const handleAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setUserPhoneNumber(e.target.value);
  };
  
  return (
    <div>
      <CustomNavbar />
      <div className="booking-page">
        <h1>Book Your Cleaning Appointment</h1>

        {error && <p className="error">{error}</p>}

        <div className="booking-form">
          <div className="form-group">
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="date"
              id="selectedDate"
              value={selectedDate || ""}
              onChange={(e) => handleDateSelection(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectedTime">Select Time:</label>
            <input
              type="time"
              id="selectedTime"
              value={selectedTime || ""}
              onChange={(e) => handleTimeSelection(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicesDropdown">Select Service:</label>
            <NavDropdown title="Services" id="services-dropdown">
              {services.map((service) => (
                <NavDropdown.Item
                  key={service.name}
                  onClick={() =>
                    handleServiceSelection(service.name, service.price)
                  }
                >
                  {service.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>

          <div className="form-group">
            <label htmlFor="specificRequirements">Specific Requirements:</label>
            <textarea
              id="specificRequirements"
              placeholder="Any specific requirements?"
              value={specificRequirements}
              onChange={(e) => setSpecificRequirements(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Email:</label>
            <p>{userEmail}</p>
          </div>
<div className="form-group">
          {userAddress ? (
            <p>Address: {userAddress}</p>
          ) : (
            <div>
            <label htmlFor="userAddress">Address:</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="form-control"
              value={userAddress}
              onChange={handleAddressChange}
            />
            </div>
          )}
          </div>

<div className="form-group">
          {userPhoneNumber ? (
            <p>Phone Number: {userPhoneNumber}</p>
          ) : (
            <div>
               <label htmlFor="userPhoneNumber">PhoneNumber :</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="form-control"
              value={userPhoneNumber}
              onChange={handlePhoneNumberChange}
            />
            </div>
          )}
          </div>

          <div className="form-group">
            <label htmlFor="userFullName">Full Name:</label>
            <p>{userFullName}</p>
          </div>

          <div className="form-group">
            <label htmlFor="numRooms">Number of Bedrooms:</label>
            <input
              type="number"
              id="numRooms"
              min="1"
              value={numRooms}
              onChange={(e) => setNumRooms(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numBathrooms">Number of Bathrooms:</label>
            <input
              type="number"
              id="numBathrooms"
              min="1"
              value={numBathrooms}
              onChange={(e) => setNumBathrooms(e.target.value)}
              className="form-control"
            />
          </div>

          <button onClick={handleBookingSubmit} className="btn btn-primary">
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
