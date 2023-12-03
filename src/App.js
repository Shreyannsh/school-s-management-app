import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ClassView from "./components/class/classView";
import School from "./components/school/school";
import StudentDetails from "./components/student/studentDetails/studentDetails";
import StudentForm from "./components/student/studentForm/studentForm";
import StudentView from "./components/student/studentList/studentList";
import ClassList from "./components/class/classList";
import { fetchStudents } from "./features/student/studentSlice";
import Teacher from "./components/teacher/teacherList/teacher";
import TeacherForm from "./components/teacher/addTeacher/teacherForm";
import TeacherDetails from "./components/teacher/teacherDeatils/teacherDetails";
import NavBar from "./components/navBar/navBar";

export default function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div className="App">
      <div className="backgroundImage"></div>
      <div className="frontContent">
        <ToastContainer
          position="top-right"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {error && toast.error({ error })}

        <NavBar />

        <div className="allPages">
          <Routes>
            <Route path="/" element={<StudentView />} />
            <Route path="/studentDetails/:id" element={<StudentDetails />} />
            <Route path="/studentForm/:mode/:id" element={<StudentForm />} />
            <Route path="/classList" element={<ClassList />} />
            <Route path="/classView/:className" element={<ClassView />} />
            <Route path="/teacherList" element={<Teacher />} />
            <Route path="/teacherDetails/:id" element={<TeacherDetails />} />
            <Route path="/addTeacher/:mode/:id" element={<addTeacher />} />
            <Route path="/teacherForm/:mode/:id" element={<TeacherForm />} />
            <Route path="/school" element={<School />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
