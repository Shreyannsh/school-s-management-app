import "./classList.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsActive } from "../../features/student/studentSlice";
import { useEffect } from "react";

function ClassList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const classList = students.reduce((acc, crr) => {
    if (!acc.includes(crr.grade)) {
      acc = [...acc, crr.grade];
    }
    return acc;
  }, []);

  useEffect(() => {
    dispatch(setIsActive("class"));
  }, []);

  return (
    <div>
      <h1>Classes</h1>
      <div className="classList">
        {classList.length <= 0 ? (
          <div className="notFoundMsg">
            <div className="message">
              Class list will not appear without student list !
            </div>
          </div>
        ) : (
          classList.map((className) => (
            <li key={className} className="classComponent">
              <Link className="classLink" to={`/classView/${className}`}>
                <p>{className}th</p>
                <p className="classSpell">class</p>
              </Link>
            </li>
          ))
        )}
      </div>
    </div>
  );
}

export default ClassList;
