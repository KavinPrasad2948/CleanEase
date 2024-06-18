import {useNavigate } from 'react-router-dom';
import CustomNavbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../assets/style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleProtectedClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/Booking');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="cleaning-services">
      <CustomNavbar />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Clean Home Starts Here</h1>
          <p>Professional cleaning services at your fingertips</p>
          <button  className="hero-button"  onClick={(e) => handleProtectedClick(e, '/Booking')}>Book a Cleaning</button>
        </div>
      </header>

      <main>
        <section id="services" className="center-content">
          <h2>Our Services</h2>
          <div className="service-container">
            <div className="service-card">
              <h3>Commercial Cleaning</h3>
              <img src="https://thearchitecturedesigns.com/wp-content/uploads/2021/05/clean-your-house-2.jpg" alt="Commercial Cleaning" />
              <p>Professional cleaning for offices and commercial spaces.</p>
              <p className="price">Price: 600 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Residential Cleaning</h3>
              <img src="https://www.yellowpages.com.au/wp-content/uploads/2022/02/Yellow-Pages-house-cleaning-prices-list-1024x683.jpg" alt="Residential Cleaning" />
              <p>Thorough cleaning services for your home, tailored to your needs.</p>
              <p className="price">Price: 300 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Carpet Cleaning</h3>
              <img src="https://adorable-home.com/wp-content/uploads/2021/03/Vacuuming-the-floor-1024x683.jpeg" alt="Carpet Cleaning" />
              <p>Deep cleaning for carpets to remove dirt, stains, and allergens.</p>
              <p className="price">Price: 200 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Construction Cleaning</h3>
              <img src="https://static.wixstatic.com/media/b3f553_16b778a8997744f381de5371298c2474~mv2.jpeg/v1/fill/w_644,h_430,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b3f553_16b778a8997744f381de5371298c2474~mv2.jpeg" alt="Construction Cleaning" />
              <p>Post-construction cleaning to ensure your new space is spotless.</p>
              <p className="price">Price: 800 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Office Cleaning</h3>
              <img src="https://inhousecorporateservices.com/wp-content/uploads/2023/10/office-cleaning-scaled.jpg" alt="Office Cleaning" />
              <p>Regular cleaning services to keep your office environment pristine.</p> 
              <p className="price">Price: 900 rupees only</p>           
            </div>
            <div className="service-card">
              <h3>Move In/Out Cleaning</h3>
              <img src="https://www.neat-and-net.com/wp-content/uploads/2019/09/MOVE-IN-AND-MOVE-OUT-CLEANING.jpg" alt="Move In/Out Cleaning" />
              <p>Comprehensive cleaning for your move-in or move-out process.</p>
              <p className="price">Price: 700 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Window Cleaning</h3>
              <img src="https://dtkinc.com/wp-content/uploads/2021/03/commercial-window-cleaning-1200x814.jpeg" alt="Window Cleaning" />
              <p>Streak-free window cleaning for a clearer view.</p>
              <p className="price">Price: 250 rupees only</p>
            </div>
            <div className="service-card">
              <h3>Deep Cleaning</h3>
              <img src="https://www.cleanandshine.ae/wp-content/uploads/2023/11/deep-cleaning-and-general-cleaning.jpg  " alt="Deep Cleaning" />
              <p>Intensive cleaning for all areas, ensuring a thorough clean.</p>
              <p className="price">Price: 500 rupees only</p>
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
          <button className="hero-button"  onClick={(e) => handleProtectedClick(e, '/Booking')}>Book Now</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
