import "./classView.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setFilter,
  setSortBy,
  fetchStudents,
} from "../../features/student/studentSlice";
import { useParams, Link } from "react-router-dom";

function ClassView() {
  const dispatch = useDispatch();

  const { className } = useParams();

  const { students, filter, sortBy } = useSelector((state) => state.students);

  console.log(students);

  const specificClassList = students.filter(
    (student) => student.grade === className
  );

  const filterHandler = specificClassList.filter(({ gender }) => {
    if (filter === "all") return true;
    return gender === filter;
  });

  const sortByHandler = [...filterHandler].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - a.attendance;
    return 0;
  });

  const handleFilterByFunction = (text) => {
    dispatch(setFilter(text));
  };

  const handleSortByFunction = (text) => {
    dispatch(setSortBy(text));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="page">
      <Link className="classBackBtn" to="/classList">
        back
      </Link>
      <h1>Class {className}</h1>

      <div className="filterSection">
        <div>
          <label className="classViewLabel">
            Filter By -
            <select
              className="selectBox"
              onChange={(e) => handleFilterByFunction(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Male">Boys</option>
              <option value="Female">Girls</option>
            </select>
          </label>
        </div>
        <div>
          <label className="classViewLabel">
            Sort By -
            <select
              className="selectBox"
              onChange={(e) => handleSortByFunction(e.target.value)}
            >
              <option value="name">name</option>
              <option value="age"> Age</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </label>
        </div>
      </div>
      <div className="tableSection">
        <table>
          <thead>
            <tr>
              <th>
                <b>S.No.</b>
              </th>
              <th>
                <b>Name</b>
              </th>
              <th>
                <b>Age</b>
              </th>
              <th>
                <b>Gender</b>
              </th>
              <th>
                <b>Grade</b>
              </th>
              <th>
                <b>Marks</b>
              </th>
              <th>
                <b>Attendance</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortByHandler.map(
              ({ name, age, marks, attendance, grade, gender }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{gender ? gender : "-"}</td>
                  <td>{grade}</td>
                  <td>{marks ? marks : "-"}</td>
                  <td>{attendance ? attendance : "-"}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassView;
