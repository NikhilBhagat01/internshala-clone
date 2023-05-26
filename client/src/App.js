import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import { Jobs } from "./pages/Jobs";
import Footer from "./components/footer/Footer";
import JobDetail from "./pages/JobDetail";
import PageNotFound from "./components/Pagenotfound/PageNotFound";
import { useSelector } from "react-redux";
import CreateJob from "./pages/CreateJob";
import CreateCompany from "./pages/CreateCompany";
import UserCompanies from "./pages/UserCompanies";
import Allbookmarks from "./pages/Allbookmarks";
import Userjobs from "./pages/Userjobs";

function App() {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const { isLogin } = useSelector((state) => state.alerts);

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/createjob"
          element={user?.isHr ? <CreateJob /> : <Navigate to="/" />}
        />
        <Route
          path="/userjobs"
          element={user?.isHr ? <Userjobs /> : <Navigate to="/" />}
        />

        <Route
          path="/createcompany"
          element={user?.isHr ? <CreateCompany /> : <Navigate to="/" />}
        />
        <Route
          path="/usercompanies"
          element={user?.isHr ? <UserCompanies /> : <Navigate to="/" />}
        />
        <Route path="/mybookmarks" element={<Allbookmarks />} />
        <Route path="/jobs/detail/:id" element={<JobDetail />} />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {isLogin && <Login />}

      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
