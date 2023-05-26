import { useState } from "react";
import "./createcompany.css";
import axios from "axios";
import { BASE_URL } from "../url";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");

  const navigate = useNavigate();

  const [companyLoading, setCompanyLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !desc || !url || !logo) {
      return alert("please fill all fields");
    }

    const companyData = {
      name,
      desc,
      url,
      logo,
    };
    try {
      setCompanyLoading(true);
      await axios.post(`${BASE_URL}/company/createcompany`, companyData, {
        headers: {
          Authorization: token,
        },
      });
      setCompanyLoading(false);
      navigate("/createjob");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createcompany">
      <div className="createcompany_container">
        <h2>Create Company</h2>
        <form onSubmit={handleSubmit}>
          <div className="createcompanyform">
            <div className="createcompany_input_container">
              <label>Company name</label>
              <input
                type="text"
                placeholder="Google"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="createcompany_input_container">
              <label>Company Logo</label>
              <input
                type="text"
                placeholder="paste company logo image link"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
            <div className="createcompany_input_container">
              <label>Website</label>
              <input
                type="text"
                placeholder="eg. http://genesisvirtue.com/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="createcompany_input_container">
              <label>Company Description</label>
              <textarea
                name="desc"
                cols="30"
                rows="10"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button disabled={companyLoading}>
              {companyLoading ? "Creating Company..." : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
