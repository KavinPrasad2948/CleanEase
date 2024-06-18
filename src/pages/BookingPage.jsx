import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../assets/style/Booking.css";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState([]);
  const [specificRequirements, setSpecificRequirements] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [numBathrooms, setNumBathrooms] = useState(1);
  const [totalSquareFootage, setTotalSquareFootage] = useState(1500);
  const [typeOfResidence, setTypeOfResidence] = useState("Apartment");
  const [typeOfFlooring, setTypeOfFlooring] = useState("Carpet");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
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

  useEffect(() => {
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
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleServiceSelection = (service, price) => {
    const isServiceSelected = selectedService.includes(service);
    if (isServiceSelected) {
      setSelectedService(selectedService.filter((s) => s !== service));
      setServicePrice(servicePrice - price);
    } else {
      setSelectedService([...selectedService, service]);
      setServicePrice(servicePrice + price);
    }
  };
 
  const handleBookingSubmit = () => {
  
    if (selectedDate && selectedService.length > 0 && selectedTime) {
      const bookingData = {
        name: userFullName,
        userEmail: userEmail,
        address: userAddress,
        phoneNumber: userPhoneNumber,
        totalSquareFootage: totalSquareFootage,
        typeOfResidence: typeOfResidence,
        typeOfFlooring: typeOfFlooring,
        numberOfBedrooms: numRooms,
        numberOfBathrooms: numBathrooms,
        service: selectedService[0],
        paymentMethod: paymentMethod,
        date: selectedDate,
        time: selectedTime,
        specificRequirements: specificRequirements,
        price: servicePrice,
      };

     
      

      axios
        .post("https://cleanease-backend.onrender.com/api/bookings", bookingData)
        .then((response) => {
          console.log("Booking created successfully");
          navigate("/payment", { state: { bookingData: response.data } });
        })
        .catch((error) => {
          if (error.response) {
            console.error("Server Error Response:", error.response);
            setError(`Server Error: ${error.response.status} ${error.response.data.error}`);
          } else if (error.request) {
            console.error("Network Error Request:", error.request);
            setError("Network Error: Please check your internet connection.");
          } else {
            console.error("Error Message:", error.message);
            setError(`Error: ${error.message}`);
          }
        });
    } else {
      setError("Please complete all required fields before submitting.");
    }
  };

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
            <label htmlFor="servicesCheckbox">Select Service:</label>
            {services.map((service) => (
              <div key={service.name} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={service.name}
                  onChange={() =>
                    handleServiceSelection(service.name, service.price)
                  }
                />
                <label className="form-check-label" htmlFor={service.name}>
                  {service.name}
                </label>
              </div>
            ))}
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
                <label htmlFor="userPhoneNumber">Phone Number:</label>
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

          <div className="form-group">
            <label htmlFor="totalSquareFootage">Total Square Footage:</label>
            <input
              type="number"
              id="totalSquareFootage"
              min="1"
              value={totalSquareFootage}
              onChange={(e) => setTotalSquareFootage(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="typeOfResidence">Type of Residence:</label>
            <input
              type="text"
              id="typeOfResidence"
              value={typeOfResidence}
              onChange={(e) => setTypeOfResidence(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="typeOfFlooring">Type of Flooring:</label>
            <input
              type="text"
              id="typeOfFlooring"
              value={typeOfFlooring}
              onChange={(e) => setTypeOfFlooring(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <input
              type="text"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
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
