import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/students"
    );

    return response.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      "https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/students",
      newStudent
    );

    return response.data;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentInfo }) => {
    const response = await axios.put(
      `https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/students/${id}`,
      studentInfo
    );

    return response.data;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const response = await axios.delete(
      `https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/students/${id}`
    );

    return response.data;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
  filter: "all",
  sortBy: "name",
  show: false,
  isActive: "",
};

export const studentSlice = createSlice({
  name: "students",

  initialState,

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
  },

  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    },

    [addStudentAsync.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      state.students = [...state.students, action.payload];
      toast.success("Student added successfully");
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.show = false;
      state.error = action.error.message;
    },
    [updateStudentAsync.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      const updatedStudent = action.payload;
      const studentIndex = state.students.findIndex(
        (student) => student._id === updatedStudent._id
      );

      if (studentIndex !== -1) {
        state.students[studentIndex] = updatedStudent;
      }
      toast.success("Details updated Successfully");
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.show = false;
      state.error = action.error.message;
    },
    [deleteStudentAsync.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [deleteStudentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      state.students = state.students.filter(({ _id }) => {
        return _id !== action.payload.student._id;
      });
      toast("Student deleted");
    },
    [deleteStudentAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.show = false;
      state.error = action.error.message;
    },
  },
});

export const { setFilter, setSortBy, setIsActive, setShow } =
  studentSlice.actions;

export default studentSlice.reducer;
