import "./certificationCard.css";
import { AiFillStar } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

const CertificationCard = ({ img }) => {
  return (
    <div className="certificationCard">
      <div className="certification_container">
        <img src={img} alt="" />
        <div className="content">
          <span className="duration">8 weeks </span>
          <h6>Web Development </h6>
          <div className="extra_info">
            <AiFillStar color="#FFAE00" />
            <span className="rating">4.1 </span>
            <span className="learners">93740 </span>
          </div>
          <span className="know_more_cta">
            Know more <BsChevronRight size={11} strokeWidth={1} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
