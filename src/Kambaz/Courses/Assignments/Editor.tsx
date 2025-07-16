import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const [submissionType, setSubmissionType] = useState("Online");

  return (
    <div className="container mt-4">
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <Form id="wd-assignments-editor">
      <Form.Group controlId="wd-name">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue="A1" />
      </Form.Group>

      <Form.Group controlId="wd-description" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          defaultValue="The assignment is available online"
        />
      </Form.Group>

      <Form.Group controlId="wd-points" className="mt-3">
        <Form.Label>Points</Form.Label>
        <Form.Control type="number" defaultValue={100} />
      </Form.Group>

      <Form.Group controlId="wd-assignment-group" className="mt-3">
        <Form.Label>Assignment Group</Form.Label>
        <Form.Select>
          <option>ASSIGNMENTS</option>
          <option>QUIZZES</option>
          <option>PROJECT</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="wd-display-grade" className="mt-3">
        <Form.Label>Display Grade as</Form.Label>
        <Form.Select>
          <option>Percentage</option>
          <option>Points</option>
          <option>Complete/Incomplete</option>
        </Form.Select>
      </Form.Group>

      <Form.Label className="mt-3">Submission Type</Form.Label>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "5px",
        }}
        className="mt-3"
      >
        <Form.Group controlId="wd-submission-type">
          <Form.Select
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
          >
            <option>Online</option>
            <option>On Paper</option>
            <option>No Submission</option>
          </Form.Select>

          {submissionType === "Online" && (
            <div className="mt-3">
              <Form.Label>Online Entry Options</Form.Label>
              <Form.Check type="checkbox" label="Text Entry" />
              <Form.Check type="checkbox" label="Website URL" />
              <Form.Check type="checkbox" label="Media Recordings" />
              <Form.Check type="checkbox" label="Student Annotation" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          )}
        </Form.Group>
      </div>

      <Form.Label className="mt-3">Assign</Form.Label>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "5px",
        }}
        className="mt-3"
      >
        <Form.Group controlId="wd-assign-to">
          <Form.Label>Assign To</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
        </Form.Group>

        <Form.Group controlId="wd-due" className="mt-3">
          <Form.Label>Due</Form.Label>
          <Form.Control type="date" defaultValue="2024-05-13" />
        </Form.Group>

        <Form.Group controlId="wd-available-from" className="mt-3">
          <Form.Label>Available from</Form.Label>
          <Form.Control type="date" defaultValue="2024-05-06" />
          <Form.Label className="mt-2">Until</Form.Label>
          <Form.Control type="date" defaultValue="2024-05-20" />
        </Form.Group>
      </div>

      <div className="mt-3">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="primary">Save</Button>
      </div>
        </Form>
      </div>
    </div>
  );
}
