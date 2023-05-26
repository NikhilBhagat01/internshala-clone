import { CiFilter } from "react-icons/ci";
import "./jobs.css";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import JobsCard from "../components/jobsCard/JobsCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../url";
import { hideJobLoading, showJobLoading } from "../redux/features/alertSlice";
import Skeleton from "../components/skeleton/Skeleton";
import { useNavigate } from "react-router-dom";

export const Jobs = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [search, setSearch] = useState("");
  const [allJobs, setAllJobs] = useState([]);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const { isJobLoading } = useSelector((state) => state.alerts);

  const fetchJobs = async () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    dispach(showJobLoading());
    const { data } = await axios.get(
      `${BASE_URL}/jobs/getalljobs?search=${search}`
    );

    setSearch("");

    setAllJobs(data);

    dispach(hideJobLoading());
  };

  const handleSearch = (e) => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    e.preventDefault();
    fetchJobs();
  };

  const handleClearFilter = () => {
    fetchJobs();
    setCategory("");
    setLocation("");
    setExperience("");
    setSearch("");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispach(showJobLoading());
      const { data } = await axios.get(
        `${BASE_URL}/jobs/getalljobs?category=${category}&location=${location}&experience=${experience}`
      );
      setAllJobs(data);
      dispach(hideJobLoading());
    };

    fetchJobs();
  }, [dispach, category, location, experience]);

  return (
    <div className="jobs">
      <div className="jobs_container">
        <div className="breadcrumb_nav">
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home{" "}
          </span>
          <span>{">"}</span>
          <span>Jobs</span>
        </div>
        <h1 className="jobs_heading">
          {allJobs?.jobsCount} Jobs {location && `in ${location}`}
        </h1>
        <div className="jobs_and_filters">
          <div className="jobs_left">
            <div className="jobs_wrapper">
              <div className="fiterUi">
                <CiFilter color="#56B1E6" />
                <span>Filters</span>
              </div>
              {/* CATEGORY */}
              <label htmlFor="category">Category</label>

              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Please choose category --</option>
                <option value="All">All</option>
                <option value="full stack">Full Stack</option>
                <option value="software engineer">Software Engineer</option>
                <option value="backend">Backend</option>
                <option value="frontend">FrontEnd</option>
                <option value="data science">Data Science</option>
              </select>

              {/* LOCATION */}
              <label htmlFor="location">Location</label>

              <select
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">-- Please choose location --</option>
                <option value="All">All</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
              </select>

              {/* EXPERIENCE */}
              <label htmlFor="experience">Experience</label>

              <select
                name="experience"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">-- Please choose an experience --</option>
                <option value="All">All</option>
                <option value="0">Fresher</option>
                <option value="1">1 year</option>
                <option value="2">2 year</option>
                <option value="3">3 year</option>
                <option value="4">4 year</option>
                <option value="5">5 year</option>
                <option value="more">5+ year</option>
              </select>
              <form onSubmit={handleSearch}>
                <label htmlFor="search">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button>Search</button>
              </form>
              <button className="clear_filter_btn" onClick={handleClearFilter}>
                Clear Filters
              </button>
            </div>
          </div>
          <div className="jobs_right">
            <div className="internship_list_marketing">
              <div className="internship_list_wrapper">
                <div className="internship_meta">
                  <div className="individual_internship_header">
                    <div className="main_heading">
                      Get 100% Guaranteed Internship in Full Stack Development
                    </div>
                    <div className="logo_container">
                      <div className="logo">New</div>
                    </div>
                  </div>
                  <div className="individual_internship_details">
                    <div className="bullet_list">
                      <div className="bullet_point">
                        <div className="bullet"></div>
                        Learn 10+ skills
                      </div>
                      <div className="bullet_point">
                        <div className="bullet"></div>
                        Money-back promise if not hired
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button_container">
                  <div className="tags_container">
                    <div className="label_container">
                      Placement Guarantee Course
                    </div>
                  </div>
                  <span className="view_detail_button">
                    Know more <BsChevronRight />
                  </span>
                </div>
              </div>
            </div>
            {/* INTERNSHIP CARDS */}

            {isJobLoading ? (
              <Skeleton />
            ) : (
              allJobs?.jobs?.map((j) => <JobsCard j={j} key={j._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
