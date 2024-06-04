import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../utils/jwt"; // Import JWT utility

const ResetPassword = () => {
  const { token: rawToken } = useParams();
  const Token = rawToken.replace(/^:/, "");
  console.log("Token:", Token); // Check if the token is correctly extracted
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault(); 

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset/${Token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the JWT in the request headers
          },
          body: JSON.stringify({ password }),
        }
      );
      console.log("Request URL:", `https://cleanease-backend.onrender.com/api/auth/reset/${Token}`); // Check the request URL
      const result = await response.json();
      console.log("Response:", result); // Check the response from the backend
      const alertMessage = result.msg;
      console.log(alertMessage);
      if (response.ok) {
        setMessage("Password updated successfully");
        navigate("/");
      } else {
        setMessage(result.message || "Error resetting password");
      }
    } catch (err) {
      setMessage("Error resetting password");
    }
  };
  return (
    <div className="container">
      <h2 className="reseth2">Reset Password</h2>
      <div className="reset">
        Create a strong password that includes a mix of uppercase and lowercase
        letters, numbers, and special characters
      </div>
      {message && <p>{message}</p>}
      <form className="Forgotfrom" onSubmit={handleSubmit}>
        <div>
          <br />
          <input
            className="resetpass"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            className="resetpass"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="resetButton">
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
