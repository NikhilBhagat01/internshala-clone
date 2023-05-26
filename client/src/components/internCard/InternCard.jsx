import "./intern.css";
import { BiRupee, BiTrendingUp } from "react-icons/bi";
import {} from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsBag, BsChevronRight } from "react-icons/bs";
import {} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export const InternCard = ({ j }) => {
  const navigate = useNavigate();

  const handleNavigat = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/jobs/detail/${j._id}`);
  };
  return (
    <div className="intern_card">
      <div className="intern_card_container">
        <div className="actively_hiring_label">
          <BiTrendingUp color="#5DB5E8" />
          <span>Actively hiring</span>
        </div>
        <div className="heading">
          <div className="content">
            <h6>{j.jobTitle}</h6>
            <span>{j.Company.name}</span>
          </div>
        </div>
        <ul>
          <li>
            <CiLocationOn color="#8A8A8A" size={15} />
            {j.location}
          </li>
          <li>
            <BsBag />
            <BiRupee />
            {j.ctc}
          </li>
        </ul>
        <div className="footer">
          <span className="job_label">
            {j.jobType ? j.jobType : "Full Time"} job
          </span>
          <span onClick={handleNavigat} className="view_detail_cta">
            View Details <BsChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
};
