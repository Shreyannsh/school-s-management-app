import "../../../styles/list.css";

import { useDispatch, useSelector } from "react-redux";
import { IoPersonAddOutline } from "react-icons/io5";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";

import { fetchTeacher } from "../../../features/teacher/teacherSlice";
import { setIsActive } from "../../../features/student/studentSlice";
import Loading from "../../loading/loading";

function Teacher() {
  const dispatch = useDispatch();

  const { teachers, show, status } = useSelector((state) => state.teachers);

  const alphabeticSortedTeacher = [...teachers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeacher());
    }
    dispatch(setIsActive("teacher"));
  }, [dispatch, teachers]);

  return (
    <div className="page">
      <Loading show={show} />
      <h1>
        {" "}
        <GiTeacher className="icon" />
        Teachers List
      </h1>
      <div className="addComponent">
        <Link className="addLink" to="/teacherForm/add/''">
          <h2>
            <IoPersonAddOutline className="icon" />
            Add Teacher
          </h2>
        </Link>
      </div>

      <div className="list">
        {alphabeticSortedTeacher.length <= 0 && show === false ? (
          <div className="notFoundMsg">
            <div className="message">No Teacher added Yet !</div>
          </div>
        ) : (
          alphabeticSortedTeacher?.map((teacher) => (
            <li key={teacher._id}>
              <div className="profile">
                <Link
                  className="detailLink"
                  to={`/teacherDetails/${teacher._id}`}
                >
                  <p className="value">
                    Name:
                    <b className="textValue">{teacher.name}</b>
                  </p>
                  <p className="value">
                    Subject:
                    <b className="textValue">{teacher.subject}</b>
                  </p>
                  <p className="value">
                    Contact:
                    <b className="textValue"> {teacher.contactNumber}</b>
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

export default Teacher;
