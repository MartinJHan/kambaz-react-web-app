import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";

export default function Dashboard({ courses, selectedCourse, addCourse, deleteCourse, updateCourse, setSelectedCourse }: {
  courses: any[];
  selectedCourse: any;
  addCourse: (course: any) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (course: any) => void;
  setSelectedCourse: (course: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  
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

  React.useEffect(() => {
    if (selectedCourse) setFormCourse(selectedCourse);
  }, [selectedCourse]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard {currentUser?.username}</h1> <hr />

      {isFaculty && (
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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>

                    {isFaculty && (
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
