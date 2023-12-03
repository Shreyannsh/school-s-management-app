import "../../../styles/list.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";

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
      <h1>
        <FaUserGraduate className="icon" />
        Student List
      </h1>
      <div className="addComponent">
        <Link className="addLink" to="/studentForm/add/''">
          <h2>
            <IoPersonAddOutline className="icon" />
            Add Student
          </h2>
        </Link>
      </div>

      <div className="list">
        {alphabeticSortedStudent.length <= 0 && show === false ? (
          <div className="notFoundMsg">
            <div className="message">No Student added Yet !</div>
          </div>
        ) : (
          alphabeticSortedStudent?.map((student) => {
            let gradePostfix = "th";
            const gradePostfixFunction = () => {
              if (student.grade === "1") {
                gradePostfix = "st";
              } else if (student.grade === "2") {
                gradePostfix = "nd";
              } else if (student.grade === "3") {
                gradePostfix = "rd";
              }
            };
            gradePostfixFunction();

            return (
              <li key={student._id}>
                <div className="profile">
                  <Link
                    className="detailLink"
                    to={`/studentDetails/${student._id}`}
                  >
                    <p className="value">
                      Name:
                      <b className="textValue">{student.name}</b>
                    </p>
                    <p className="value">
                      Age:
                      <b className="textValue">{student.age} years</b>
                    </p>

                    <p className="value">
                      Grade:
                      <b className="textValue">
                        {student.grade}
                        {gradePostfix}
                      </b>
                    </p>
                  </Link>
                </div>
              </li>
            );
          })
        )}
      </div>
    </div>
  );
}

export default StudentView;
