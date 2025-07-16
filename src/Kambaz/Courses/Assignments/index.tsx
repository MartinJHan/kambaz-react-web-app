import { ListGroup } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssnCatControlButtons from "./AssnCatControlButtons";
import AssnControlButtons from "./AssnControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";


export default function Assignments() {
  return (
    <div>
      <AssignmentsControls /><br/><br/><br/><br/>

      <ListGroup id="wd-assignments" className="rounded-0">
        <ListGroup.Item className="wd-assn-cat p-0 mb-5 fs-5 border-gray">
          <div className="wd-category p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssnCatControlButtons /> 
          </div>
          <ListGroup className="wd-assns rounded-0">
            <ListGroup.Item className="wd-assn p-3 ps-1" style={{ borderLeft: "4px solid green" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-danger" />
                <a href="#/Kambaz/Courses/1234/Assignments/123" className="text-decoration-none" style={{ color: "black" }}>A1</a>
                <div className="ms-auto">
                  <AssnControlButtons />
                </div>
              </div>
              <div className="mt-2" style={{ fontSize: "0.875rem", paddingLeft: "2.5rem" }}> 
                <div>
                  <span className="text-danger">Multiple Modules |</span> 
                  <span style={{ color: "gray" }}> <b>Not available until</b> May 6 at 12:00am |</span> 
                  <span style={{ color: "gray" }}> <b>Due</b> May 13 at 11:59pm |</span> 
                  <span style={{ color: "gray" }}> 100 pts</span>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-assn p-3 ps-1" style={{ borderLeft: "4px solid green" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-danger" /> 
                <a href="#/Kambaz/Courses/1234/Assignments/234" className="text-decoration-none" style={{ color: "black" }}>A2</a>
                <div className="ms-auto">
                  <AssnControlButtons />
                </div>
              </div>
              <div className="mt-2" style={{ fontSize: "0.875rem", paddingLeft: "2.5rem" }}> 
                <div>
                  <span className="text-danger">Multiple Modules |</span> 
                  <span style={{ color: "gray" }}> <b>Not available until</b> May 13 at 12:00am |</span> 
                  <span style={{ color: "gray" }}> <b>Due</b> May 20 at 11:59pm |</span> 
                  <span style={{ color: "gray" }}> 100 pts</span>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-assn p-3 ps-1" style={{ borderLeft: "4px solid green" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-danger" /> 
                <a href="#/Kambaz/Courses/1234/Assignments/345" className="text-decoration-none" style={{ color: "black" }}>A3</a>
                <div className="ms-auto">
                  <AssnControlButtons />
                </div>
              </div>
              <div className="mt-2" style={{ fontSize: "0.875rem", paddingLeft: "2.5rem" }}> 
                <div>
                  <span className="text-danger">Multiple Modules |</span> 
                  <span style={{ color: "gray" }}> <b>Not available until</b> May 20 at 12:00am |</span> 
                  <span style={{ color: "gray" }}> <b>Due</b> May 27 at 11:59pm |</span> 
                  <span style={{ color: "gray" }}> 100 pts</span>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
      
 
      
    </div>
);}
