import { BiSend } from "react-icons/bi";
import "./footer.css";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer_wrapper">
        <div className="footer_about_us_container">
          <div className="footer_column">
            <div className="footer_list">
              <div className="footer_listItem">
                <span>About us</span>
              </div>
              <div className="footer_listItem">
                <span>We're hiring</span>
              </div>
              <div className="footer_listItem">
                <span>Hire interns for your company</span>
              </div>
            </div>
          </div>
          <div className="footer_column">
            <div className="footer_list">
              <div className="footer_listItem">
                <span>Team Diary</span>
              </div>
              <div className="footer_listItem">
                <span>Blog</span>
              </div>
              <div className="footer_listItem">
                <span>Our Services</span>
              </div>
            </div>
          </div>
          <div className="footer_column">
            <div className="footer_list">
              <div className="footer_listItem">
                <span>Terms & Conditions</span>
              </div>
              <div className="footer_listItem">
                <span>Privacy</span>
              </div>
              <div className="footer_listItem">
                <span>Contact us</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <div className="footer_bottom_left">
            <div className="get_android_app">
              <BiSend size={20} />
              <span className="android_text">Get Android App</span>
            </div>
            <div className="social_icons">
              <AiOutlineInstagram size={20} />
              <FiTwitter size={20} />
              <AiFillYoutube size={20} />
              <FiLinkedin size={20} />
            </div>
          </div>
          <div className="footer_bottom_right">
            © Copyright {new Date().getFullYear()} Internshala
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
