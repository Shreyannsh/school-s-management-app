import "./classList.css";

import { GiGraduateCap } from "react-icons/gi";

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
    <div className="page">
      <h1>
        <GiGraduateCap className="iconClass" />
        Classes
      </h1>
      <div className="classList">
        {classList.length <= 0 ? (
          <div className="notFoundMsg">
            <div className="message">
              Class list will not appear without student list !
            </div>
          </div>
        ) : (
          classList.map((className) => {
            let gradePostfix = "th";
            const gradePostfixFunction = () => {
              if (className === "1") {
                gradePostfix = "st";
              } else if (className === "2") {
                gradePostfix = "nd";
              } else if (className === "3") {
                gradePostfix = "rd";
              }
            };
            gradePostfixFunction();
            return (
              <li key={className} className="classComponent">
                <Link className="classLink" to={`/classView/${className}`}>
                  <p>
                    {className}
                    {gradePostfix}
                  </p>
                  <p className="classSpell">class</p>
                </Link>
              </li>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ClassList;
