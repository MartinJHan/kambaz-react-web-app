import { createSlice } from "@reduxjs/toolkit";
import * as client from "./client";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null
}

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    addEnrollment: (state, { payload: enrollment }) => {
      // 检查是否已存在相同的enrollment
      const exists = state.enrollments.some(
        (e) => e.user === enrollment.user && e.course === enrollment.course
      );
      if (!exists) {
        state.enrollments.push(enrollment);
      }
    },
    removeEnrollment: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
    setLoading: (state, { payload: loading }) => {
      state.loading = loading;
    },
    setError: (state, { payload: error }) => {
      state.error = error;
    }
  }
});

export const { setEnrollments, addEnrollment, removeEnrollment, setLoading, setError } = enrollmentSlice.actions;

export const loadEnrollments = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const enrollments = await client.fetchAllEnrollments();
    dispatch(setEnrollments(enrollments));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError('Failed to load enrollments'));
    dispatch(setLoading(false));
  }
};

export const loadUserEnrollments = (userId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const enrollments = await client.findEnrollmentsForUser(userId);
    dispatch(setEnrollments(enrollments));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError('Failed to load user enrollments'));
    dispatch(setLoading(false));
  }
};

export const enrollUserInCourseAPI = (userId: string, courseId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const enrollment = await client.enrollUserInCourse(userId, courseId);
    // 添加新的enrollment到状态
    dispatch(addEnrollment(enrollment));
    dispatch(setLoading(false));
    return enrollment;
  } catch (error) {
    dispatch(setError('Failed to enroll in course'));
    dispatch(setLoading(false));
    throw error;
  }
};

export const unenrollUserFromCourseAPI = (userId: string, courseId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const result = await client.unenrollUserFromCourse(userId, courseId);
    // 从状态中移除enrollment
    dispatch(removeEnrollment({ userId, courseId }));
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    dispatch(setError('Failed to unenroll from course'));
    dispatch(setLoading(false));
    throw error;
  }
};

export default enrollmentSlice.reducer; 