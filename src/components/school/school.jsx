import "./school.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSchool } from "react-icons/fa";

import { updateSchoolStats } from "../../features/school/schoolSlice";
import { setIsActive } from "../../features/student/studentSlice";

function School() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const { totalStudents, averageAttendance, averageMarks, highestMarks } =
    useSelector((state) => state.school);

  useEffect(() => {
    const totalStudents = students.length;
    const totalAttendance = students.reduce(
      (acc, crr) => (crr.attendance ? acc + crr.attendance : acc + 0),
      0
    );
    const averageAttendance = totalAttendance / totalStudents;
    const totalMarks = students.reduce(
      (acc, crr) => (acc = crr.marks ? acc + crr.marks : acc + 0),
      0
    );

    const averageMarks = totalMarks / totalStudents;

    const highestMarks = students.reduce(
      (acc, crr) => {
        acc = crr.marks && crr.marks > acc.marks ? crr : acc;
        return acc;
      },
      { marks: 0 }
    );
    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        highestMarks,
      })
    );

    dispatch(setIsActive("school"));
  }, [dispatch, students]);

  return (
    <div>
      <h1 className="schoolTitle">
        {" "}
        <FaSchool className="icon" />
        School Statistic
      </h1>
      <div className="parentSchool">
        <div className="schoolStat">
          <p>{totalStudents}</p>
          <b>Total Students </b>
        </div>
        <div className="schoolStat">
          <p>{averageAttendance.toFixed(2)} %</p>
          <b>Average Attendance</b>
        </div>
        <div className="schoolStat">
          <p>{averageMarks.toFixed(2)}</p>
          <b>Average Marks</b>
        </div>
        <div className="schoolStat">
          <p>
            {highestMarks.name} <i>{highestMarks.marks} </i>
          </p>
          <b>Highest Marks </b>
        </div>
      </div>
    </div>
  );
}

export default School;
