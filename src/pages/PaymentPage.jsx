import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "../utils/axiosInstance";
import "../assets/style/Payments.css";

const stripePromise = loadStripe("kavin_prasad_stripe_key");

const PaymentForm = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "client-secret",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: bookingData.userEmail,
          },
        },
      }
    );

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setSucceeded(true);
      setProcessing(false);

      // Optionally, update your server about the successful payment
      axios
        .post("/bookings/payment-success", { bookingId: bookingData._id })
        .then((response) => {
          console.log("Payment success recorded:", response.data);
        })
        .catch((error) => {
          console.error("Error recording payment success:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={processing || !stripe || !elements}>
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <div>{error}</div>}
      {succeeded && <div>Payment succeeded!</div>}
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { bookingData } = location.state;

  return (
    <div>
      <CustomNavbar />
      <div className="payment-page">
        <h1>Payment Page</h1>
        <p>Service: {bookingData.service}</p>
        <p>Date: {bookingData.date}</p>
        <p>
          Price:{" "}
          {bookingData.service === "Commercial Cleaning"
            ? 600
            : bookingData.service === "Professional Cleaning"
            ? 300
            : 200}{" "}
          Rupees
        </p>
        <Elements stripe={stripePromise}>
          <PaymentForm bookingData={bookingData} />
        </Elements>
      </div>
      <Footer />
    </div>
  );
};

PaymentForm.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default PaymentPage;
