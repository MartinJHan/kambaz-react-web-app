






import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments
}

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        availableDate: assignment.availableDate,
        dueDate: assignment.dueDate,
        points: assignment.points,
        available: assignment.available,
        due: assignment.due
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    }
  }
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentSlice.actions;

export default assignmentSlice.reducer;

