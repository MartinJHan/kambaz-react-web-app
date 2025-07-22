import { ListGroup } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssnCatControlButtons from "./AssnCatControlButtons";
import AssnControlButtons from "./AssnControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";


export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = db.assignments.filter((a) => a.course === cid);
  return (
    <div id="wd-assignments">
      <AssignmentsControls />

      <ListGroup className="rounded-0 mt-5">
        <ListGroup.Item className="wd-assn-cat p-0 mb-5 fs-5 border-gray">
          <div className="wd-category p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssnCatControlButtons />
          </div>
          <ListGroup className="wd-assns rounded-0">
            {courseAssignments.map((a) => (
              <ListGroup.Item key={a._id} className="wd-assn p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-3 fs-3 text-success" />
                  <div>
                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`} className="wd-assn-link">
                      {a.title}
                    </Link><br />
                    <div style={{ fontSize: "0.825rem" }}>
                      <span className="text-danger">
                        Multiple Modules
                      </span> | {" "}
                      <b>Not available until</b> {a.available} | <br />
                      <b>Due</b> {a.due} | {a.points} pts
                    </div>
                  </div>
                  <div className="ms-auto">
                    <AssnControlButtons />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
