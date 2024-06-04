import store from "./redux/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import Authform from "./components/Authform";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Booking" element={<BookingPage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Authform />} />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
          <Route path="/reset/:token" element={<ResetPasswordForm />} />
          <Route path="/payment" element={<PaymentPage />} />
          
        </Routes>
      </Provider>
    </div>
  );
}
