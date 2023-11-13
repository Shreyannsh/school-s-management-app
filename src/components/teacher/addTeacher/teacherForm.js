import { useDispatch, useSelector } from "react-redux";
import {
  addTeacherAsync,
  updateTeacherAsync,
} from "../../../features/teacher/teacherSlice";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./teacherForm.css";
import "../../../common.css";

import Loading from "../../loading/loading";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const teacher = state;
  const { mode, id } = useParams();

  const { show } = useSelector((state) => state.teachers);

  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    subject: "",
    contactNumber: "",
  });

  const handleAdd = () => {
    if (mode === "edit") {
      dispatch(updateTeacherAsync({ id, teacherInfo }));
      navigate(`/teacherDetails/${id}`);
    } else {
      const values = Object.values(teacherInfo);
      if (values.includes("")) {
        toast.error("field is missing");
      } else {
        dispatch(addTeacherAsync(teacherInfo));
        setTeacherInfo({
          name: "",
          subject: "",
          contactNumber: "",
        });
      }
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setTeacherInfo({
        name: teacher.name,
        subject: teacher.subject,
        contactNumber: teacher.contactNumber,
      });
    }
  }, [mode]);

  return (
    <div className="parent">
      <Loading show={show} />
      <h1>{mode === "edit" ? "Edit Teacher" : "Add Teacher"}</h1>
      <div className="addTeacherForm">
        <div className="inputSectionTeacher">
          <label className="formTitle">
            <span>Name:</span>
          </label>
          <label className="formTitle">
            <span> Subject:</span>
          </label>
          <label className="formTitle">
            <span>Contact number:</span>
          </label>
        </div>
        <div className="inputSectionTeacher">
          <label className="formTitle">
            <input
              className="forminput"
              placeholder="name"
              type="text"
              value={teacherInfo.name}
              onChange={(e) =>
                setTeacherInfo({ ...teacherInfo, name: e.target.value })
              }
            />
          </label>
          <label className="formTitle">
            <input
              className="forminput"
              placeholder="subject"
              type="text"
              value={teacherInfo.subject}
              onChange={(e) =>
                setTeacherInfo({ ...teacherInfo, subject: e.target.value })
              }
            />
          </label>
          <label className="formTitle">
            <input
              className="forminput"
              placeholder="contact number"
              type="text"
              value={teacherInfo.contactNumber}
              onChange={(e) =>
                setTeacherInfo({
                  ...teacherInfo,
                  contactNumber: e.target.value,
                })
              }
            />
          </label>
        </div>
      </div>
      <div>
        <button className="addBtn" onClick={() => handleAdd()}>
          {" "}
          {mode === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default TeacherForm;
