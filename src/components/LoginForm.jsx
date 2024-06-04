import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../utils/jwt"; // Import JWT utility

const SignInForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const ApiUrl = "https://cleanease-backend.onrender.com/api/auth/login"; // Use HTTP for local development

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch(ApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      const result = await response.json();
      console.log(result);

      alert(result.msg);

      if (response.ok) {
        setToken(result.token); 
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", state.email);
        navigate("/"); 
      }

      setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during the login request:", error);
      alert("There was an error during the login process. Please try again.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h2>Sign in</h2>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/ForgotPassword">Forgot your password?</Link>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
