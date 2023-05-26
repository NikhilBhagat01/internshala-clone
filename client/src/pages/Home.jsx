import React, { useState } from "react";
import "./home.css";
import { Card } from "../components/card/Card";
import { InternCard } from "../components/internCard/InternCard";
import CertificationCard from "../components/certificationCard/CertificationCard";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../url";

export const Home = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      const { data } = await axios.get(`${BASE_URL}/jobs/getlatestjobs`);
      setJobs(data.Jobs);
    };
    fetchLatestJobs();
  }, []);

  return (
    <div>
      <div className="mainContainer">
        {/* Main header */}
        {user && (
          <div className="main_header">
            <div className="main_heading">
              <h1>Hi {user.firstName}!</h1>
              <img src="./assets/waving-hand.svg" alt="" />
            </div>
            <h4>Let’s help you land your dream career</h4>
          </div>
        )}
        {/* Trending Section */}
        <div className="trending_section">
          <div className="title">
            <h5>Trending on Internshala</h5>
            <img src="./assets/trending.svg" alt="" />
          </div>
        </div>
        {/* Scroll container */}
        <div className="scroll_container">
          <div className="scroll">
            <Card img={"./assets/trending1.png"} delay={0} />
            <Card img={"./assets/trending2.png"} delay={0.5} />
            <Card img={"./assets/trending3.png"} delay={1} />
          </div>
        </div>
        {/* internships-jobs-section */}
        <div className="internships_jobs_section">
          <div className="internships_jobs_section_container">
            <div className="title">
              <h5>Jobs</h5>
              <p>
                as per your <a href="/">preferences</a>
              </p>
            </div>
            <div className="scroll_container">
              <div className="intership_scroll">
                {jobs?.map((j) => (
                  <InternCard key={j._id} j={j} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* certification-trainings-section */}
        <div className="certification_trainings_section">
          <div className="certification_trainings_container">
            <h5>Certification courses for you</h5>
            <div className="scroll_container">
              <div className="intership_scroll">
                <CertificationCard img={"./assets/c1.webp"} />
                <CertificationCard img={"./assets/c2.webp"} />
                <CertificationCard img={"./assets/c3.webp"} />
                <CertificationCard img={"./assets/c4.webp"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
