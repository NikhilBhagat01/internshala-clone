import "./userjobs.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../url";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner/Spinner";

const Userjobs = () => {
  const { token } = useSelector((state) => state.auth);

  const [alluserjobs, setAlluserjobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserjobs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/jobs/getalljobbyuser`, {
          headers: {
            Authorization: token,
          },
        });
        setLoading(false);
        setAlluserjobs(data.allJobsbyuser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserjobs();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/jobs/deletejob/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data.success) {
        setAlluserjobs((prev) => prev.filter((j) => j._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="userjobs">
      <div className="userjobs_container">
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
          <table className="GeneratedTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>CTC</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {alluserjobs?.map((j) => (
                <tr key={j._id}>
                  <td
                    style={{
                      color: "blue",
                    }}
                  >
                    {j._id}
                  </td>

                  <td>{j.jobTitle}</td>
                  <td>{j.ctc}</td>
                  <td>{j.jobType}</td>
                  <td>{j.location}</td>
                  <td>
                    <button onClick={() => handleDelete(j._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Userjobs;
