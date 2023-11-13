// import "./studentForm.css";
import "../../../common.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    gender: "boy",
    attendance: "",
    marks: "",
  });

  // const [editInfo, setEditInfo] = useState({
  //   name: "",
  //   age: "",
  //   grade: "",
  //   gender: "boy",
  //   attendance: "",
  //   marks: "",
  // });

  // const [isTrue, setIsTrue] = useState([]);

  // const isEqual = () => {
  //   const studentKeys = Object.keys(studentInfo);
  //   const editKeys = Object.keys(editInfo);

  //   for (let key of studentKeys) {
  //     if (studentKeys[key] === editKeys[key]) {
  //       setIsTrue([...isTrue, true]);
  //     } else {
  //       setIsTrue([...isTrue, false]);
  //     }
  //   }
  // };

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
          gender: "boy",
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

      // setEditInfo({
      //   name: student?.name,
      //   age: student?.age,
      //   grade: student?.grade,
      //   gender: student?.gender,
      //   attendance: student?.attendance,
      //   marks: student?.marks,
      // });
    }
  }, [mode]);

  // useEffect(() => {
  //   isEqual();
  // }, [studentInfo]);

  return (
    <div className="parent">
      <Loading show={show} />
      <h1>{mode === "edit" ? "Edit Student" : "Add Student"}</h1>
      <div className="addForm">
        <div className="inputSection">
          <label className="formTitle">
            <span>Name:</span>
            <input
              className="forminputName"
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
          <div>
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
            </label>

            <label>
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
          </div>
          <label className="formTitle">
            Grade:
            <input
              className="forminput"
              type="text"
              placeholder="Student Grade"
              value={studentInfo.grade}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, grade: e.target.value })
              }
            />
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
