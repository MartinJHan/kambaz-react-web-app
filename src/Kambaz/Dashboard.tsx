import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { 
  loadEnrollments
} from "./Enrollments/reducer";
import type { AppDispatch } from "./store";

export default function Dashboard({ courses, selectedCourse, addCourse, deleteCourse, updateCourse, setSelectedCourse, enrolling, setEnrolling, updateEnrollment }: {
  courses: any[];
  selectedCourse: any;
  addCourse: (course: any) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (course: any) => void;
  setSelectedCourse: (course: any) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const loading = useSelector((state: any) => state.enrollmentsReducer.loading);
  const error = useSelector((state: any) => state.enrollmentsReducer.error);
  const isFaculty = currentUser?.role === "FACULTY";
  const isAdmin = currentUser?.role === "ADMIN";
  
  const [formCourse, setFormCourse] = useState<any>(selectedCourse || {
    _id: "",
    name: "",
    description: "",
    number: "",
    startDate: "",
    endDate: "",
    image: "",
    department: "",
    credits: 0,
  });

  useEffect(() => {
    if (selectedCourse) setFormCourse(selectedCourse);
  }, [selectedCourse]);

  useEffect(() => {
    // Load all enrollments so we can check enrollment status for all courses
    dispatch(loadEnrollments());
  }, [dispatch]);

  const isEnrolledInCourse = (courseId: string) => {
    // 所有用户类型都使用相同的enrollment检查逻辑
    return enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);
  };

  // 修复filteredCourses逻辑，确保状态一致性
  const filteredCourses = enrolling 
    ? courses  // All Courses模式：显示所有课程
    : courses.filter((course) => {
        // My Courses模式：显示enrolled的课程
        // 优先使用course.enrolled属性，如果没有则检查Redux store
        if (course.enrolled !== undefined) {
          return course.enrolled;
        }
        return isEnrolledInCourse(course._id);
      });

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">Error: {error}</div>;
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard {currentUser?.username}
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary">
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      {(isFaculty || isAdmin) && (
        <>
          <h5>New/Edit Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                if (!formCourse._id) {
                  addCourse({ ...formCourse, _id: new Date().getTime().toString() });
                } else {
                  updateCourse(formCourse);
                }
                setFormCourse({ _id: "", name: "", description: "", number: "", startDate: "", endDate: "", image: "", department: "", credits: 0 });
                setSelectedCourse(null);
              }} > {formCourse._id ? "Update" : "Add"} </button>
            {formCourse._id && (
              <button className="btn btn-secondary float-end me-2" onClick={() => {
                setFormCourse({ _id: "", name: "", description: "", number: "", startDate: "", endDate: "", image: "", department: "", credits: 0 });
                setSelectedCourse(null);
              }}>Cancel</button>
            )}
          </h5><br />
          <input value={formCourse.name}
            className="form-control mb-2"
            placeholder="Enter course name"
            onChange={(e) => setFormCourse({ ...formCourse, name: e.target.value })} />
          <textarea value={formCourse.description}
            onChange={(e) => setFormCourse({ ...formCourse, description: e.target.value })}
            className="form-control"
            placeholder="Enter course description"
            rows={3} /><hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "Enrolled Courses"} ({filteredCourses.length})
      </h2> 
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {enrolling && (
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !isEnrolledInCourse(course._id));
                          }}
                          className={`btn ${isEnrolledInCourse(course._id) ? "btn-danger" : "btn-success"} float-end`}
                        >
                          {isEnrolledInCourse(course._id) ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>

                    {(isFaculty || isAdmin) && (
                      <>
                        <Button variant="danger" className="float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteCourse(course._id);
                          }}> Delete </Button>

                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setSelectedCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )}

                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
