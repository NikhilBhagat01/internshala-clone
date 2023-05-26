import { useParams } from "react-router-dom";
import "./jobDetail.css";
import { BiRupee, BiTrendingUp } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import {
  AiOutlineExperiment,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  BsBag,
  BsBookmark,
  BsBookmarkCheckFill,
  BsClock,
  BsCurrencyRupee,
  BsPeople,
  BsPersonCheck,
} from "react-icons/bs";
import { TiShoppingBag } from "react-icons/ti";
import { FiExternalLink } from "react-icons/fi";
import { TbCalendarTime } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import moment from "moment";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner/Spinner";

const JobDetail = () => {
  const { id } = useParams();
  const [singleJob, setSingleJob] = useState([]);
  const [loading, setIsloading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fethcSingleJob = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`${BASE_URL}/jobs/getjob/${id}`);
        setIsloading(false);
        if (data.success) {
          setSingleJob(data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fethcSingleJob();
  }, [id]);

  useEffect(() => {
    const isbookmark = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/auth/isbookmarked/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setIsBookmarked(data.success);
      } catch (error) {
        console.log(error);
      }
    };

    isbookmark();
    // setIsBookmarked(bookmark.includes(id));
  }, [id, token]);

  const addOrRemoveBookMark = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/addbookmark`,
        {
          jobId: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {}
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className="jobsDetail">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "55px",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className="jobsDetail_wrapper">
          <div className="detail-banner-container">
            <img
              src="https://i.postimg.cc/76pT4b10/jb.webp"
              alt="jb"
              border="0"
            />
          </div>
          <div className="jobDetail_header">
            {singleJob?.jobTitle} Job in {singleJob?.location} at{" "}
            {singleJob?.Company?.name}
          </div>
          <div className="jobDetail_detail_view">
            <div className="individual_jobDetail">
              <div className="internship_meta_jobDetail">
                <div className="actively_hiring_badge">
                  <BiTrendingUp size={19} color="#5DB5E8" />
                  <span>Actively hiring</span>
                </div>
                <div className="individual_internship_header_jobDetail">
                  <div className="company">
                    <h3 className="heading_4_5">
                      <span className="profile_on_detail_page">
                        {singleJob?.jobTitle}
                      </span>
                    </h3>
                    <h4 className="company_name">{singleJob?.Company?.name}</h4>
                  </div>
                  <div className="internship_logo">
                    <img src={singleJob?.Company?.logo} alt="" />
                  </div>
                </div>
                <div className="individual_internship_job">
                  <p className="location_names">
                    <CiLocationOn color="rgb(40 40 40)" size={15} />
                    <span>{singleJob?.location}</span>
                  </p>
                  <div className="internship_other_details_container">
                    <div className="other_detail_item_row">
                      <div className="other_detail_item">
                        <div className="item_heading">
                          <AiOutlinePlayCircle />
                          <span>Start date</span>
                        </div>
                        <div className="item_body">
                          <span className="start_immediately_mobile">
                            Immediately
                          </span>
                        </div>
                      </div>
                      <div className="other_detail_item">
                        <div className="item_heading">
                          <BsBag />
                          <span>CTC</span>
                        </div>
                        <div className="item_body salary">
                          <BiRupee />
                          {singleJob?.ctc}
                        </div>
                      </div>
                      <div className="other_detail_item">
                        <div className="item_heading">
                          <TiShoppingBag />
                          <span>Experience</span>
                        </div>
                        <div className="item_body">
                          {singleJob?.experience
                            ? `0-${singleJob.experience} years`
                            : "0-4 years"}
                        </div>
                      </div>
                      <div className="other_detail_item">
                        <div className="item_heading">
                          <AiOutlineExperiment />
                          <span>APPLY BY</span>
                        </div>
                        <div className="item_body">{singleJob?.startDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tags_container_outer">
                  <div className="posted_by_container">
                    <div className="status_container">
                      <div className="status_small status_success">
                        <BsClock />
                        {moment(singleJob?.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className="other_label_container">
                    <div className="status_container">
                      <div className="status_small">Job</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button_container">
                <div className="applications_message_container">
                  <div className="application_icon">
                    <BsPeople size={23} color="#8a8a8a" />
                  </div>
                  <div className="applications_message">32 applicants</div>
                </div>
                <div className="dropdown-menu-container">
                  <span className="bookmark_button_detail_page">
                    {isBookmarked ? (
                      <BsBookmarkCheckFill
                        size={18}
                        color="#008bdc"
                        onClick={addOrRemoveBookMark}
                      />
                    ) : (
                      <BsBookmark
                        size={18}
                        color="#008bdc"
                        onClick={addOrRemoveBookMark}
                      />
                    )}
                  </span>
                  <span className="share_link">
                    <AiOutlineShareAlt size={18} color="#008bdc" />
                  </span>
                </div>
              </div>
            </div>
            <div className="internship_jobDetail">
              <div className="section_heading">
                About {singleJob?.Company?.name}
              </div>
              <div className="website_link">
                <a
                  href={singleJob?.Company?.url}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Website
                  <FiExternalLink size={12} />
                </a>
              </div>
              <div className="about_company_text_container">
                {singleJob?.Company?.desc}
              </div>
              <div className="activity_section">
                <div className="heading_activity">Activity on Internshala</div>
                <div className="activity_container">
                  <div className="activity">
                    <TbCalendarTime />
                    <div className="body_main">Hiring since November 2017</div>
                  </div>
                  <div className="activity">
                    <TiShoppingBag />
                    <div className="body_main">57 opportunities posted</div>
                  </div>
                  <div className="activity">
                    <BsPersonCheck />
                    <div className="body_main">19 candidates hired</div>
                  </div>
                </div>
              </div>
              <div className="section_heading">About the job</div>
              <div className="text_container">
                Key responsibilities: <br />
                <br /> 1. Analyze application needs and website requirements
                from teams and clients <br /> 2. Write well-designed backend
                code and create backend portals with PHP modules <br /> 3.
                Create efficient, reusable, and reliable PHP code <br /> 4.
                Write clean, well-designed code <br /> 5. Integrate data from
                various back-end services and databases <br /> 6. Stay
                up-to-date with emerging technologies <br /> <br /> Skills &
                Requirements: <br /> <br /> 1. Problem-solving <br /> 2.
                Innovation and best coding practices <br /> 3. Excellent
                communication and interpersonal skills <br /> 4. Critical and
                out-of-the-box thinking <br /> 5. Upgrade skills and adapt to
                changes <br /> 6. Project management <br /> 7. Keen attention to
                details <br /> 8. Ability to work independently as well as a
                part of a team <br /> 9. Strong knowledge of SQL, indexing,
                normalization, database optimization strategies, query plan
                analysis <br /> 10. Expertise in front-end technologies
                including HTML5, CSS3, PHP, MySQL, Bootstrap, JavaScript, and
                jQuery <br /> 11. Working knowledge of managing products with
                large-scale, distributed web applications in a CI/CD environment{" "}
                <br />
                12. Good to have knowledge of Linux Commands, cPanel, Python,
                Node.js, REST API, and Git
              </div>
              <div className="section_heading">Skill(s) required</div>
            </div>
            <div className="round_tabs_container">
              <span className="round_tabs">CSS</span>
              <span className="round_tabs">HTML</span>
              <span className="round_tabs">JavaScript</span>
              <span className="round_tabs">MySQL</span>
              <span className="round_tabs">PHP</span>
            </div>
            <div className="section_heading">Salary</div>
            <div className="text_container">
              <p>
                Annual CTC: <BsCurrencyRupee /> {singleJob?.ctc}
              </p>
            </div>
            <div className="section_heading">Perks</div>
            <div className="round_tabs_container">
              {singleJob?.perks?.length !== 0 ? (
                singleJob?.perks?.map((p, i) => (
                  <div key={i} className="round_tabs">
                    {p}
                  </div>
                ))
              ) : (
                <>
                  <div className="round_tabs">Informal dress code</div>
                  <div className="round_tabs">Free snacks & beverages</div>
                </>
              )}
            </div>
            <div className="section_heading">Number of openings</div>
            <div className="text_container">
              {singleJob?.numOfOpenings ? singleJob.numOfOpenings : 2}
            </div>
            <div className="buttons_container">
              {/* <button>Apply now</button> */}
              {singleJob?.postedBy?.email !== user.email && (
                <ButtonMailto
                  label={"Apply now"}
                  mailto={singleJob?.postedBy?.email}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ButtonMailto = ({ mailto, label }) => {
  return (
    <a href={`mailto:${mailto}`} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
};
export default JobDetail;
