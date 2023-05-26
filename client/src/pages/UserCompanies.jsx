import { useEffect, useState } from "react";
import "./usercompanies.css";
import axios from "axios";
import { BASE_URL } from "../url";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner/Spinner";

const UserCompanies = () => {
  const { token } = useSelector((state) => state.auth);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectcompany = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };
  const fetchUserCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/company/getuserscompany`, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      if (data.success) {
        setCompanies(data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserCompanies();
    // eslint-disable-next-line
  }, [token]);
  return (
    <div className="usercompanies">
      <div className="usercompanies_container">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner />
          </div>
        ) : (
          <table className="GeneratedTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Website</th>
                <th>Logo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies?.map((c) => (
                <tr key={c._id}>
                  <td style={{ width: "10%" }}>{c._id}</td>
                  <td style={{ width: "20%" }}>{c.name}</td>
                  <td style={{ width: "30%" }}>{c.desc.substr(0, 100)}</td>
                  <td style={{ width: "10%" }}>
                    <a href={c.url} target="_blank" rel="noreferrer">
                      {c.url}
                    </a>
                  </td>
                  <td style={{ width: "10%" }}>
                    <img src={c.logo} alt="" />
                  </td>
                  <td>
                    <button onClick={() => handleSelectcompany(c)}>EDIT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          selectedCompany={selectedCompany}
          fetchUserCompanies={fetchUserCompanies}
        />
      )}
    </div>
  );
};

const Modal = ({ setShowModal, selectedCompany, fetchUserCompanies }) => {
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState(selectedCompany.name);
  const [desc, setDesc] = useState(selectedCompany.desc);
  const [url, setUrl] = useState(selectedCompany.url);
  const [logo, setLogo] = useState(selectedCompany.logo);

  // const [companyLoading, setCompanyLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { name, desc, url, logo };

    try {
      const { data } = await axios.put(
        `${BASE_URL}/company/updatecompany/${selectedCompany._id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        alert(data.message);
        setShowModal(false);
        fetchUserCompanies();
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <>
      <div className="modalbox">
        <section className="modal hidden">
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
              <button type="submit">
                Update
                {/* {companyLoading ? "Creating Company..." : "Update Company"} */}
              </button>
            </div>
          </form>
          <span className="close-button" onClick={() => setShowModal(false)}>
            X
          </span>
        </section>
      </div>

      <div className="overlay hidden"></div>
    </>
  );
};
export default UserCompanies;
