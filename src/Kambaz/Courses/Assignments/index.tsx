





import { ListGroup } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssnCatControlButtons from "./AssnCatControlButtons";
import AssnControlButtons from "./AssnControlButtons";
import AssignmentDeleteConfirm from "./AssignmentDeleteConfirm";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const handleDeleteClick = (assignmentId: string) => {
    const assignment = courseAssignments.find((a: any) => a._id === assignmentId);
    if (assignment) {
      setAssignmentToDelete(assignment);
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      {isFaculty && <AssignmentsControls />}

      <ListGroup className="rounded-0 mt-5">
        <ListGroup.Item className="wd-assn-cat p-0 mb-5 fs-5 border-gray">
          <div className="wd-category p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
            {isFaculty && <AssnCatControlButtons />}
          </div>
          <ListGroup className="wd-assns rounded-0">
            {courseAssignments.map((a: any) => (
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
                  {isFaculty && (
                    <div className="ms-auto">
                      <AssnControlButtons 
                        assignmentId={a._id}
                        onDelete={handleDeleteClick}
                      />
                    </div>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
      
      <AssignmentDeleteConfirm
        show={showDeleteDialog}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        assignmentTitle={assignmentToDelete?.title || ""}
      />
    </div>
  );
}
