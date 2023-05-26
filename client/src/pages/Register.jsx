import { useDispatch } from "react-redux";
import "./register.css";
import { showLogin } from "../redux/features/alertSlice";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../url";

const Register = ({ setLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isregistering, setIsRegistering] = useState(false);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName) {
      return alert("please enter all fields");
    }

    try {
      setIsRegistering(true);
      const { data } = await axios.post(`${BASE_URL}/auth/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      setIsRegistering(false);
      if (data.success) {
        alert(data.message);
        navigate("/");
        dispach(showLogin());
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="register">
      <div className="register_container">
        <div className="register_wrapper">
          <div className="register_heading">Sign-up and apply for free</div>
          <div className="register_subheading">
            1,50,000+ companies hiring on Internshala
          </div>
          <div className="registration_container_right">
            <form className="form_container" onSubmit={handleRegister}>
              <div className="input">
                <label>Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <label>password</label>
                <input
                  type="password"
                  required
                  placeholder="must be atleast 6 characters"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="half_container">
                <div className="input">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="label_toc">
                By signing up, you agree to our{" "}
                <span>Terms and Conditions.</span>
              </div>
              <button
                disabled={isregistering}
                type="submit "
                className="signup_btn"
              >
                {isregistering ? "Registering...." : "Sign up"}
              </button>
              <div className="login-link-container">
                Already registered?{" "}
                <span onClick={() => dispach(showLogin())}>Login</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
