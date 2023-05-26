import { useEffect, useState } from "react";
import "./createjob.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();

  const [allCompanies, setAllCompanies] = useState([]);

  const [jobLoading, setJobLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [numOfOpenings, setNumOfOpenings] = useState("");
  const [ctc, setCtc] = useState("");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/company/getuserscompany`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setAllCompanies(data.companies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !jobTitle ||
      !Company ||
      !location ||
      !category ||
      !experience ||
      !jobType ||
      !numOfOpenings ||
      !ctc
    ) {
      return alert("please fill all fields");
    }
    const jobData = {
      jobTitle,
      Company,
      location,
      category,
      experience: Number(experience),
      jobType,
      numOfOpenings: Number(numOfOpenings),
      ctc,
    };

    try {
      setJobLoading(true);
      await axios.post(`${BASE_URL}/jobs/createjob`, jobData, {
        headers: {
          Authorization: token,
        },
      });
      setJobLoading(false);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createjob">
      <div className="createjob_container">
        <form onSubmit={handleSubmit}>
          <div className="createjobform">
            <div className="createjob_input_container">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="FrontEnd developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="createjob_input_container selectField">
              <label>Location</label>
              <select
                name="location"
                id="location"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">-- Please choose location --</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
            </div>
            <div className="createjob_input_container selectField">
              <label>Company</label>
              <select
                name="Company"
                id="Company"
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">-- Please choose an Company --</option>
                {allCompanies?.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="createjob_input_container selectField">
              <label>Category</label>
              <select
                name="Category"
                id="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Please choose Category --</option>

                <option value="full stack">Full Stack</option>
                <option value="software engineer">Software Engineer</option>
                <option value="backend">Backend</option>
                <option value="frontend">FrontEnd</option>
                <option value="data science">Data Science</option>
              </select>
            </div>

            <div className="createjob_input_container selectField">
              <label>Experience</label>
              <select
                name="Experience"
                id="Experience"
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">-- Please choose Experience --</option>

                <option value="0">Fresher</option>
                <option value="1">1 year</option>
                <option value="2">2 year</option>
                <option value="3">3 year</option>
                <option value="4">4 year</option>
                <option value="5">5 year</option>
                <option value="more">5+ year</option>
              </select>
            </div>

            <div className="createjob_input_container selectField">
              <label>Job Type</label>
              <select
                name="jobtype"
                id="jobtype"
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">-- Please choose Job Type --</option>

                <option value="Full Time">Full Time</option>
                <option value="wfh">Work from home</option>
              </select>
            </div>

            <div className="createjob_input_container selectField">
              <label>Number of Openings</label>
              <select
                name="noofopening"
                id="noofopening"
                onChange={(e) => setNumOfOpenings(e.target.value)}
              >
                <option value="">-- Please choose a number --</option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>

            <div className="createjob_input_container">
              <label>CTC</label>
              <input
                type="text"
                placeholder="2 - 4 LPA"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
              />
            </div>
          </div>
          <button disabled={jobLoading} type="submit">
            {jobLoading ? "Creating Job..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
