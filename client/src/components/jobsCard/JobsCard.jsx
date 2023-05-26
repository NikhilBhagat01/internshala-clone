import { BiRupee, BiTrendingUp } from "react-icons/bi";
import "./jobscard.css";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsBag, BsClock } from "react-icons/bs";
import { TiShoppingBag } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const JobsCard = ({ j }) => {
  const navigate = useNavigate();
  const goToSingleJob = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/jobs/detail/${j._id}`);
  };

  const jobDate = moment(j.createdAt).fromNow();
  const recent =
    jobDate.includes("minute") ||
    jobDate.includes("minutes") ||
    jobDate.includes("seconds") ||
    jobDate.includes("hours") ||
    jobDate.includes("hour");
  return (
    <div className="individual_internship">
      <div className="internship_meta">
        <div className="actively_hiring_badge">
          <BiTrendingUp color="#3498DE" />
          <span>Actively hiring</span>
        </div>
        <div className="individual_internship_header">
          <div className="company">
            <h3 className="heading_4_5">{j.jobTitle}</h3>
            <h4 className="heading_6">{j.Company.name}</h4>
          </div>
          <div className="internship_logo">
            <img src={j.Company.logo} alt="" />
          </div>
        </div>
        <div className="individual_internship_details">
          <p className="location_names">
            <CiLocationOn color="rgb(40 40 40)" size={15} />
            <span>{j.location}</span>
          </p>
          <div className="internship_other_details_container">
            <div className="other_detail_item_row">
              <div className="other_detail_item">
                <div className="item_heading">
                  <AiOutlinePlayCircle />
                  <span>Start date</span>
                </div>
                <div className="item_body">
                  <span className="start_immediately_mobile">Immediately</span>
                </div>
              </div>
              <div className="other_detail_item">
                <div className="item_heading">
                  <BsBag />
                  <span>CTC</span>
                </div>
                <div className="item_body salary">
                  <BiRupee />
                  {j.ctc}
                </div>
              </div>
              <div className="other_detail_item">
                <div className="item_heading">
                  <TiShoppingBag />
                  <span>Experience</span>
                </div>
                <div className="item_body">
                  {j.experience ? `0-${j.experience} years` : "0-2 years"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tags_container_outer">
          <div className="posted_by_container">
            <div className="status-container">
              <div className={`${recent && "stgreen"} status`}>
                <BsClock />
                {moment(j.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="other_label_container">
            <div className="status-container">
              <div className="status">Job</div>
            </div>
          </div>
        </div>
      </div>
      <div className="button_container_card">
        <div className="cta_container">
          <button
            onClick={goToSingleJob}
            className="view_detail_button_outline"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
