import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { showLogin } from "../../redux/features/alertSlice";
import { logOut } from "../../redux/features/auth/authSlice";

export const Navbar = ({ user }) => {
  const [showLogOut, setShowLogOut] = useState(false);
  // onClick={() => navigate("/")}

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispach(logOut());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar_container">
        <Link to="/">
          <img
            className="navbar_logo"
            src="https://i.postimg.cc/65PFXXFw/logo.webp"
            alt=""
          />
        </Link>

        <div className="navbar_right">
          <span>
            interships <AiFillCaretDown />
          </span>

          <span>
            Courses <AiFillCaretDown />
          </span>
          <span>
            <Link to={"/jobs"}>
              Jobs <AiFillCaretDown />
            </Link>
          </span>

          {!user ? (
            <>
              <button
                className="btn btn-secodory"
                onClick={() => dispach(showLogin())}
              >
                login
              </button>
              <Link to="/register" className="btn btn-primary ">
                Register <AiFillCaretDown />
              </Link>
            </>
          ) : (
            <>
              <span>Clubs</span>
              <div className="navbar_right_icons">
                <FiBookmark
                  onClick={() => navigate("/mybookmarks")}
                  size={20}
                  style={{ color: "#555555", cursor: "pointer" }}
                />
                <BsChatDots
                  size={20}
                  style={{ color: "#555555", cursor: "pointer" }}
                />
                <div
                  className="user_info"
                  onClick={() => setShowLogOut(!showLogOut)}
                >
                  <div className="user_ne">
                    <div className="name">
                      {user.firstName.substr(0, 1).toUpperCase()}
                    </div>
                    <AiFillCaretDown />
                  </div>
                  <AnimatePresence>
                    {showLogOut && (
                      <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "0", opacity: 1 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: ".3" }}
                        className="dropdown_menu"
                      >
                        <div className="dropdown_menu_wrapper">
                          <div className="user_name_email">
                            <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
                            <span>{user?.email}</span>

                            {user.isHr && (
                              <>
                                <Link to={"/createjob"} className="create_job">
                                  Create Job
                                </Link>
                                <Link to={"/userjobs"} className="create_job">
                                  All Job
                                </Link>
                                <Link
                                  to={"/createcompany"}
                                  className="create_job"
                                >
                                  Create Company
                                </Link>
                                <Link
                                  to={"/usercompanies"}
                                  className="create_job"
                                >
                                  Manage Companies
                                </Link>
                              </>
                            )}
                          </div>
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
