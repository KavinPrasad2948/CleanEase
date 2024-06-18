import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../assets/style/Navbar.css";
// import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([
    "Please ensure that someone will be available at the location during the scheduled time. If you need to make any changes or have any questions, please contact us",
    "Please ensure that someone will be available at the location during the scheduled time. If you need to make any changes or have any questions, please contact us",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = localStorage.getItem("token");
  

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");

    if (loggedInStatus && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail("");
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://cleanease-backend.onrender.com/api/bookings/search?search=${searchQuery}`);
      const bookings = await response.json();
     

const filteredBookings = bookings.filter(booking => {
  
  return (
    booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.date.includes(searchQuery) || 
    booking.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );
});
console.log(filteredBookings);


      
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
    const handleProtectedClick = (e) => {
      e.preventDefault();
      if (isAuthenticated) {
        navigate("/Dashboard");
      } else {
        navigate("/login");
      }
    };
    return (
      <Navbar bg="light" expand="xl">
        <Container>
          <Navbar.Brand href="#">
            <i className="fa fa-cube"></i> Clean<b>Ease</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse
            id="navbarCollapse"
            className="justify-content-start"
          >
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Services" id="services-dropdown">
                <NavDropdown.Item href="#services">Commercial</NavDropdown.Item>
                <NavDropdown.Item href="#services">
                  Professional
                </NavDropdown.Item>
                <NavDropdown.Item href="#services">Carpet</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={Link}
                onClick={(e) => handleProtectedClick(e, "/Dashboard")}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <form className="navbar-form form-inline" onSubmit={handleSearch}>
              <div className="input-group search-box">
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search by Name"
                  />
                <span
                  className="input-group-addon"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  
                >
                  <i className="material-icons">&#xE8B6;</i>
                </span>
              </div>
            </form>
            <Nav className="ml-auto">
              <Nav.Link
                href="#"
                className="notifications"
                onClick={toggleNotification}
              >
                <i className="fa fa-bell-o"></i>
                <span className="badge badge-pill badge-danger">
                  {notifications.length}
                </span>
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown
                  title={<span> {userEmail}</span>}
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/Profile">
                    <i className="fa fa-user-o"></i> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fa fa-sign-in"></i> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };


export default CustomNavbar;
