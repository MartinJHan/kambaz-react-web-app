import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import { addCourse, deleteCourse as deleteReduxCourse, updateCourse as updateReduxCourse, setSelectedCourse } from "./Courses/reducer";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";


export default function Kambaz() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const selectedCourse = useSelector((state: any) => state.coursesReducer.selectedCourse);

  const findCoursesForEnrolledUser = async () => {
    try {
      const enrolledCourses = await userClient.findCoursesForEnrolledUser(currentUser._id);
      
      // 确保所有返回的课程都有enrolled: true属性
      const coursesWithEnrolledStatus = enrolledCourses.map((course: any) => ({
        ...course,
        enrolled: true
      }));
      setCourses(coursesWithEnrolledStatus);
    } catch (error) {
      console.error("Error in findCoursesForEnrolledUser:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      
      // 所有用户类型都使用相同的enrollment检查逻辑
      const enrolledCourses = await userClient.findCoursesForEnrolledUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        const isEnrolled = enrolledCourses.find((c: any) => c._id === course._id);
        return { 
          ...course, 
          enrolled: !!isEnrolled  // 明确设置enrolled状态为true或false
        };
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCourse = async (course: any) => {
    const newCourse = await userClient.createCourse(course);
    setCourses((courses) => [...courses, newCourse]);
  };
  
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      // 所有用户类型都调用后端API来管理enrollments
      if (enrolled) {
        await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      } else {
        await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      }
      
      // Update local courses state - 确保所有课程都有明确的enrolled状态
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            // 确保其他课程也有明确的enrolled状态
            return { 
              ...course, 
              enrolled: course.enrolled !== undefined ? course.enrolled : false 
            };
          }
        })
      );
      
      // 如果是enrolling模式，重新获取课程列表以更新enrollment状态
      if (enrolling) {
        await fetchCourses();
      } else {
        // 如果不是enrolling模式（即My Courses模式），重新获取enrolled课程
        await findCoursesForEnrolledUser();
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };
  
  useEffect(() => {
    if (currentUser) {
      if (enrolling) {
        fetchCourses();
      } else {
        findCoursesForEnrolledUser();
      }
    }
    
    // 清理函数：当组件卸载或用户改变时，清理localStorage
    return () => {
      if (currentUser?.role === "ADMIN") {
        // 可以选择是否清理localStorage，这里我们保留状态
        // localStorage.removeItem(`admin_enrollments_${currentUser._id}`);
      }
    };
  }, [currentUser, enrolling]);

  const handleAddCourse = async (course: any) => {
    try {
      await addNewCourse(course);
      dispatch(addCourse(course));
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      dispatch(deleteReduxCourse(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  const updateCourse = async (course: any) => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    }));
  };
  
  const handleUpdateCourse = async (course: any) => {
    try {
      await updateCourse(course);
      dispatch(updateReduxCourse(course));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  const handleSetSelectedCourse = (course: any) => {
    dispatch(setSelectedCourse(course));
  };

  return (
    <Session>
      <div id="wd-kambaz" className="d-flex">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  selectedCourse={selectedCourse}
                  addCourse={handleAddCourse}
                  deleteCourse={handleDeleteCourse}
                  updateCourse={handleUpdateCourse}
                  setSelectedCourse={handleSetSelectedCourse}
                  enrolling={enrolling}
                  setEnrolling={setEnrolling}
                  updateEnrollment={updateEnrollment}
                />
              </ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
