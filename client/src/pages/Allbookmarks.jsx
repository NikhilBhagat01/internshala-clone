import { useEffect, useState } from "react";
import "./allbookmarks.css";
import axios from "axios";
import { BASE_URL } from "../url";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { AiTwotoneDelete } from "react-icons/ai";

const Allbookmarks = () => {
  const { token } = useSelector((state) => state.auth);

  const [allbookmarks, setAllbookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/auth/getallbookmarks`, {
          headers: {
            Authorization: token,
          },
        });
        setLoading(false);
        setAllbookmarks(data.bookmarks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookmarks();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/addbookmark`,
        { jobId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data.success) {
        setAllbookmarks((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="allbookmarks">
      <div className="allbookmarks_container">
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
                <th>Category</th>
                <th>Company</th>
                <th>Number of openings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allbookmarks?.map((b) => (
                <tr key={b._id}>
                  <td
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <Link to={`/jobs/detail/${b._id}`}>{b._id}</Link>
                  </td>

                  <td>{b?.jobTitle?.toUpperCase()}</td>
                  <td>{b?.category?.toUpperCase()}</td>
                  <td>{b?.Company?.name}</td>
                  <td>{b?.numOfOpenings}</td>
                  <td>
                    <AiTwotoneDelete
                      style={{ cursor: "pointer" }}
                      size={19}
                      color="red"
                      onClick={() => handleDelete(b._id)}
                    />
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

export default Allbookmarks;
