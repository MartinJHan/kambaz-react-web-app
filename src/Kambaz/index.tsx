import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import { addCourse, deleteCourse, updateCourse, setSelectedCourse } from "./Courses/reducer";

export default function Kambaz() {
  const dispatch = useDispatch();
  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const selectedCourse = useSelector((state: any) => state.coursesReducer.selectedCourse);

  const handleAddCourse = (course: any) => {
    dispatch(addCourse(course));
  };
  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };
  const handleUpdateCourse = (course: any) => {
    dispatch(updateCourse(course));
  };
  const handleSetSelectedCourse = (course: any) => {
    dispatch(setSelectedCourse(course));
  };

  return (
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
  );
}
