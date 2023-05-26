import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { hideLogin } from "../../redux/features/alertSlice";
import { useState } from "react";
import { BASE_URL } from "../../url";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToRegister = () => {
    dispach(hideLogin());
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("enter all fields");
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.userInfo));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem(
          "bookmark",
          JSON.stringify(data.userInfo.bookmarks)
        );

        dispach(
          setUser({
            userInfo: data.userInfo,
            token: data.token,
          })
        );
        dispach(hideLogin());
      } else {
        return alert("login failed");
      }
    } catch (error) {
      alert("invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <RxCross1
          className="close"
          onClick={() => dispach(hideLogin())}
          // onClick={() => setLoginVisible(false)}
          color="blue"
        />

        <form onSubmit={handleSubmit}>
          <div className="input">
            <label>Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label>password</label>
            <input
              type="password"
              placeholder="must be atleast 6 characters"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="forgot">Forgot Password?</span>
          <button className="login_btn" type="submit">
            Login
          </button>
          <p>
            New to Internshala? <span onClick={goToRegister}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
