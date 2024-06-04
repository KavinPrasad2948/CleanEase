import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../assets/style/Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>&copy; 2024 Cleaning Services. All rights reserved.</p>
          <p>Contact us: info@cleaningservices.com</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
