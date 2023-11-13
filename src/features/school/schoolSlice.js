import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageMarks: 0,
    averageAttendance: 0,
    highestMarks: {},
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageMarks = action.payload.averageMarks;
      state.averageAttendance = action.payload.averageAttendance;
      state.highestMarks = action.payload.highestMarks;
    },
  },
});

export const { updateSchoolStats } = schoolSlice.actions;

export default schoolSlice.reducer;
