import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const fetchTeacher = createAsyncThunk("teachers", async () => {
  const response = await axios(
    "https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/teachers"
  );

  return response.data;
});

export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeacher",
  async (newTeacher) => {
    const response = await axios.post(
      "https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/teachers",
      newTeacher
    );

    return response.data;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, teacherInfo }) => {
    const response = await axios.put(
      `https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/teachers/${id}`,
      teacherInfo
    );

    return response.data;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    const response = await axios.delete(
      `https://reduxtoolkit-example-student-management-forked.shreyanshtiwar2.repl.co/teachers/${id}`
    );

    return response.data;
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
  show: false,
};
console.log(initialState);
export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeacher.pending]: (state) => {
      state.state = "pending";
      state.show = true;
    },
    [fetchTeacher.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.teachers = action.payload;
      state.show = false;
    },
    [fetchTeacher.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.show = false;
    },
    [addTeacherAsync.pending]: (state) => {
      state.state = "pending";
      state.show = true;
    },
    [addTeacherAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
      state.teachers = [...state.teachers, action.payload];
      console.log(state.teachers);
      state.show = false;
      toast.success("Teacher added suceessfully");
    },
    [addTeacherAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.show = false;
    },
    [updateTeacherAsync.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [updateTeacherAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      const updatedTeacher = action.payload;
      console.log(updatedTeacher);
      const teacherIndex = state.teachers.findIndex(
        (teacher) => teacher._id === updatedTeacher._id
      );
      console.log(teacherIndex, typeof teacherIndex);
      if (teacherIndex !== -1) {
        console.log("yes");
        state.teachers[teacherIndex] = updatedTeacher;
      }

      toast.success("Details updated suceessfully");
    },
    [updateTeacherAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.show = false;
    },
    [deleteTeacherAsync.pending]: (state) => {
      state.status = "pending";
      state.show = true;
    },
    [deleteTeacherAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.show = false;
      console.log(action);
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload.teacher._id
      );

      toast.success("Teacher deleted suceessfully");
    },
    [deleteTeacherAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload.message;
      state.show = false;
    },
  },
});

export default teacherSlice.reducer;
