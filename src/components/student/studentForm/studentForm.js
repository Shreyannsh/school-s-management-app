import "../../../styles/addEditForm.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";

import {
  addStudentAsync,
  updateStudentAsync,
} from "../../../features/student/studentSlice";
import Loading from "../../loading/loading";

function StudentForm() {
  const show = useSelector((state) => state.students.show);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const student = state;

  const { mode, id } = useParams();

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  });

  const handleAddStudent = () => {
    if (mode === "edit") {
      dispatch(updateStudentAsync({ id, studentInfo }));
      navigate(`/studentDetails/${id}`);
    } else {
      const values = Object.values(studentInfo).slice(0, 4);
      if (values.includes("")) {
        toast.error("a field is missing");
      } else {
        dispatch(addStudentAsync(studentInfo));
        setStudentInfo({
          name: "",
          age: "",
          grade: "",
          gender: "",
          attendance: 0,
          marks: 0,
        });
      }
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setStudentInfo({
        name: student?.name,
        age: student?.age,
        grade: student?.grade,
        gender: student?.gender,
        attendance: student?.attendance,
        marks: student?.marks,
      });
    }
  }, [mode]);

  return (
    <div className="parent">
      <Loading show={show} />
      <Link className="backBtn" to="/">
        back
      </Link>
      <h1>{mode === "edit" ? "Edit Student" : "Add Student"}</h1>
      <div className="addForm">
        <div className="inputSection">
          <label className="formTitle">
            <span>Name:</span>
            <input
              className="forminput"
              type="text"
              placeholder="student name"
              value={studentInfo.name}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, name: e.target.value })
              }
            />
          </label>
          <label className="formTitle">
            Age:
            <input
              className="forminput"
              type="number"
              placeholder="student Age"
              value={studentInfo.age}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, age: e.target.value })
              }
            />
          </label>
        </div>
        <div className="inputSection">
          <label className="formTitle">
            Gender:
            <input
              className="forminputRadio"
              type="radio"
              name="gender"
              value="Male"
              checked={studentInfo.gender === "Male" ? true : ""}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, gender: e.target.value })
              }
            />
            Male
            <input
              className="forminputRadio"
              type="radio"
              name="gender"
              value="Female"
              checked={studentInfo.gender === "Female" ? true : ""}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, gender: e.target.value })
              }
            />
            Female
          </label>

          <label className="formTitle">
            Grade:
            <select
              className="forminputSelect"
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, grade: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
              <option value="7">7th</option>
              <option value="8">8th</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
            </select>
          </label>
        </div>

        {mode === "edit" && (
          <div className="inputSection">
            <label className="formTitle">
              Attendance:
              <input
                className="forminput"
                type="number"
                placeholder="attendance"
                value={studentInfo.attendance}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, attendance: e.target.value })
                }
              />
            </label>
            <label className="formTitle">
              Marks:
              <input
                className="forminput"
                type="number"
                placeholder="marks"
                value={studentInfo.marks}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, marks: e.target.value })
                }
              />
            </label>
          </div>
        )}
      </div>
      <div>
        <button className="addBtn" onClick={() => handleAddStudent()}>
          {mode === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default StudentForm;
