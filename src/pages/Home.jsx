import { Link } from 'react-router-dom';
import CustomNavbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../assets/style/Home.css';

const Home = () => {
  return (
    <div className="cleaning-services">
      <CustomNavbar />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Clean Home Starts Here</h1>
          <p>Professional cleaning services at your fingertips</p>
          <Link to="/Booking" className="hero-button">Book a Cleaning</Link>
        </div>
      </header>

      <main>
        <section id="services" className="center-content">
          <h2>Our Services</h2>
          <div className="service-container">
            <div className="service-card">
              <h3>Commercial Cleaning</h3>
              <img src="/public/img1.webp" alt="Commercial Cleaning" />
              <p>Professional cleaning for offices and commercial spaces.</p>
              <p className="price">Price: 600 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Professional Cleaning</h3>
              <img src="/public/img2.jpeg" alt="Professional Cleaning" />
              <p>Expert cleaning services for specialized needs.</p>
              <p className="price">Price: 300 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Carpet Cleaning</h3>
              <img src="/public/img3.jpeg" alt="Carpet Cleaning" />
              <p>Deep cleaning for carpets to remove dirt and stains.</p>
              <p className="price">Price: 200 rupees only</p>
            </div>
          </div>
        </section>

        <section id="about" className="center-content">
          <div className="about-content">
            <h2>About Us</h2>
            <p>We are a dedicated cleaning company with years of experience in providing high-quality services. Our team is committed to ensuring customer satisfaction with every clean.</p>
          </div>
        </section>

        <section id="testimonials" className="center-content">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-container">
            <div className="testimonial">
              <p>CleanEase did an amazing job with our office. Highly recommend! - Kavin K.</p>
            </div>
            <div className="testimonial">
              <p>My house has never been cleaner. Fantastic service! - Walter K.</p>
            </div>
            <div className="testimonial">
              <p>Great attention to detail and very professional. - Mike W.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="center-content">
          <h2>Contact Us</h2>
          <p>Email: kavinprasad2948@gmail.com</p>
          <p>Phone: +91 9159663743</p>
        </section>

        <div className="booking-link">
          <Link to="/Booking">Book Now</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
