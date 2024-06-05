  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
  import NotificationPopup from './NotificationPopup'
  import "../assets/style/Navbar.css";

  const CustomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState(["Notification 1", "Notification 2"]);


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
    
    return (
      <Navbar bg="light" expand="xl">
        <Container>
          <Navbar.Brand href="#">
            <i className="fa fa-cube"></i> Clean<b>Ease</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse" className="justify-content-start">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Services" id="services-dropdown">
                <NavDropdown.Item href="#services">Commercial</NavDropdown.Item>
                <NavDropdown.Item href="#services">Professional</NavDropdown.Item>
                <NavDropdown.Item href="#services">Carpet</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/Dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <form className="navbar-form form-inline">
              <div className="input-group search-box">
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search by Name"
                />
                <span className="input-group-addon">
                  <i className="material-icons">&#xE8B6;</i>
                </span>
              </div>
            </form>
            <Nav className="ml-auto">
              <Nav.Link href="#" className="notifications" onClick={toggleNotification}>
                <i className="fa fa-bell-o"></i>
                <span className="badge badge-pill badge-danger">{notifications.length}</span>
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title={<span> {userEmail}</span>} id="user-dropdown">
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
