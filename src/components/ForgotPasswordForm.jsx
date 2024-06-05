import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://cleanease-backend.onrender.com/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.token) {
        navigate(`/reset/${result.token}`);
        console.log(result.token);
        // alert(result.msg);
      } else {
        alert(result.msg || "Error sending reset token");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2 className="passh2">Forgot Password</h2>
      <h5 className="passp">
        Enter your email address and we`ll send you a link to reset your password.
      </h5>
      <form className="Forgotfrom" onSubmit={handleSubmit}>
        <br />
        <input
          type="email"
          className="Forgotpass"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
