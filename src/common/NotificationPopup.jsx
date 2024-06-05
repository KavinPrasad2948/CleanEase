import PropTypes from 'prop-types';
import { Modal, Button } from "react-bootstrap";

const NotificationPopup = ({ show, onHide, notifications }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifications.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
NotificationPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default NotificationPopup;
