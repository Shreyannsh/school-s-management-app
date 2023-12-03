import { useSelector } from "react-redux";
import "./navBar.css";

import { Link } from "react-router-dom";

export default function NavBar() {
  const { isActive } = useSelector((state) => state.students);
  return (
    <div>
      <nav className="navigationBar">
        <div className="title">
          <img
            className="appLogo"
            src="/assests/school managment logo.png"
            alt="logo"
          />
          <h1 className="appTitle">School Management</h1>
        </div>
        <div className="navLinks">
          <Link className={isActive === "student" ? "isActive" : "link"} to="/">
            Students
          </Link>
          <Link
            className={isActive === "class" ? "isActive" : "link"}
            to="/classList"
          >
            Class
          </Link>
          <Link
            className={isActive === "teacher" ? "isActive" : "link"}
            to="/teacherList"
          >
            Teacher
          </Link>
          <Link
            className={isActive === "school" ? "isActive" : "link"}
            to="/school"
          >
            School
          </Link>
        </div>
      </nav>
    </div>
  );
}
