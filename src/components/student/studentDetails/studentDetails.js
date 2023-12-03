import "../../../styles/detailPage.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { deleteStudentAsync } from "../../../features/student/studentSlice";
import Loading from "../../loading/loading";

function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const particularStudent = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  const { show } = useSelector((state) => state.students);

  if (!particularStudent) {
    return (
      <div className="notFoundMsg">
        <div className="message">Student not found !</div>
      </div>
    );
  }

  return (
    <div className="parent">
      <Loading show={show} />

      <h1>Student Details</h1>
      <Link className="backBtn" to="/">
        back
      </Link>
      <div className="detailPage">
        <div className="subSection1">
          <p>
            <b>Name:</b>
            {particularStudent.name}
          </p>
          <p>
            <b>Age:</b> {particularStudent.age} years
          </p>
          <p>
            <b>Attendance:</b>
            {particularStudent.attendance
              ? `${particularStudent.attendance}%`
              : "N/A"}
          </p>
        </div>
        <div className="subSection2">
          <p>
            <b>Marks:</b>
            {particularStudent.marks ? particularStudent.marks : "N/A"}
          </p>

          <p>
            <b>Garde:</b>
            {particularStudent.grade}th
          </p>
          <p>
            <b>Gender:</b>
            {particularStudent.gender}
          </p>
        </div>
      </div>
      <div className="btnSection">
        <div>
          <Link
            className="editLink"
            to={`/studentForm/edit/${particularStudent._id}`}
            state={particularStudent}
          >
            Edit Student Details
          </Link>
        </div>
        <div>
          <button
            className="deleteBtn"
            onClick={() => dispatch(deleteStudentAsync(id))}
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
