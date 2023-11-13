// import "./studentView.css";
import "../../../common.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { setIsActive } from "../../../features/student/studentSlice";
import { fetchStudents } from "../../../features/student/studentSlice";
import Loading from "../../loading/loading";

function StudentView() {
  const dispatch = useDispatch();

  const { students, status, show } = useSelector((state) => state.students);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
    dispatch(setIsActive("student"));
  }, [dispatch]);

  const alphabeticSortedStudent = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <Loading show={show} />
      <h1>Student List</h1>
      <div className="addComponent">
        <Link className="addLink" to="/studentForm/add/''">
          <h2>
            <IoPersonAddOutline className="icon" />
            Add Student
          </h2>
        </Link>
      </div>

      <div className="List">
        {alphabeticSortedStudent.length <= 0 ? (
          <div className="notFoundMsg">
            <div className="message">No Student added Yet !</div>
          </div>
        ) : (
          alphabeticSortedStudent?.map((student) => (
            <li key={student._id}>
              <div className="profile">
                <Link
                  className="detailLink"
                  to={`/studentDetails/${student._id}`}
                >
                  <p className="value">
                    name:
                    <b className="textValue">{student.name}</b>
                  </p>
                  <p className="value">
                    age:
                    <b className="textValue">{student.age} years</b>
                  </p>

                  <p className="value">
                    garde:
                    <b className="textValue">{student.grade}th</b>
                  </p>
                </Link>
              </div>
            </li>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentView;
