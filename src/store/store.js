import { configureStore } from "@reduxjs/toolkit";

import { studentSlice } from "../features/student/studentSlice";

import { schoolSlice } from "../features/school/schoolSlice";

import { teacherSlice } from "../features/teacher/teacherSlice";

export default configureStore({
  reducer: {
    students: studentSlice.reducer,
    school: schoolSlice.reducer,
    teachers: teacherSlice.reducer,
  },
});
