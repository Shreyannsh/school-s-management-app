//import "./studentDetails.css";
import "../../../common.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { deleteTeacherAsync } from "../../../features/teacher/teacherSlice";
import Loading from "../../loading/loading";

function TeacherDetails() {
  const { show, status, teachers } = useSelector((state) => state.teachers);

  console.log(show, "show");
  console.log(status, "status");
  console.log(teachers, "teachers list");

  const { id } = useParams();

  const dispatch = useDispatch();

  const particularTeacher = useSelector((state) =>
    state.teachers.teachers.find((teacher) => teacher._id === id)
  );

  if (!particularTeacher) {
    return (
      <div>
        <div className="notFoundMsg">
          <div className="message">Teacher not found !</div>
        </div>
      </div>
    );
  }

  return (
    <div className="parent">
      <Loading show={show} />
      <h1>Teacher Details</h1>
      <div className="detailPage">
        <div className="subSection1">
          <p>
            <b>Name:</b>
          </p>
          <p>
            <b>Subject:</b>
          </p>
          <p>
            <b>Contact number:</b>
          </p>
        </div>
        <div className="subSection2">
          <p>{particularTeacher.name}</p>
          <p>{particularTeacher.subject}</p>
          <p>{particularTeacher.contactNumber}</p>
        </div>
      </div>
      <div className="btnSection">
        <div>
          <Link
            className="editLink"
            to={`/teacherForm/edit/${particularTeacher._id}`}
            state={particularTeacher}
          >
            Edit Student Details
          </Link>
        </div>
        <div>
          <button
            className="deleteBtn"
            onClick={() => dispatch(deleteTeacherAsync(id))}
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;
