import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "./actions/user";
import AdminPanel from "./components/Admin/AdminPanel";
import Timeline from "./components/Admin/Timeline";
import Youtube from "./components/Admin/Youtube";
import Project from "./components/Admin/Project";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login); // isAuthenticated form state.login  . because this is present on state.login on  -->frontend\src\reducers\user.js 27,32
  const { loading, user } = useSelector((state) => state.user);// loading & user from state.user . because this is present on state.user in --> frontend\src\reducers\user.js 8,11  
//  when app load then this(getUser) data will be ready
  useEffect(() => {
    dispatch(getUser()); // this is getUser actions from line 12 . this is show case of every one who landing my page 
    dispatch(loadUser());// this is loadUser actions from line 12 . but this one only show by me
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  youtubes={user.youtube}
                  timelines={user.timeline}
                  skills={user.skills}
                />
              }
            />
            <Route path="/about" element={<About about={user.about} />} />
            <Route
              path="/projects"
              element={<Projects projects={user.projects} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/account"
              element={isAuthenticated ? <AdminPanel /> : <Login />} // hear is Authenticated  so go to AdminPanel page other wise go to  login page  
            />
            <Route
              path="/admin/timeline"
              element={isAuthenticated ? <Timeline /> : <Login />}
            />
            <Route
              path="/admin/youtube"
              element={isAuthenticated ? <Youtube /> : <Login />}
            />

            <Route
              path="/admin/project"
              element={isAuthenticated ? <Project /> : <Login />}
            />
          </Routes>

          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
