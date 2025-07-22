import { FaPlus } from "react-icons/fa6";
import { Button, Form } from "react-bootstrap";
import SearchIcon from "./SearchIcon";

export default function AssignmentsControls() {
  return (
    <div className="d-flex">
      <SearchIcon />
      <Form.Control
        type="text"
        placeholder="Search..."
        id="wd-search-assignments"
        className="mb-1 ms-1 w-25"
        style={{ paddingLeft: "2rem" }}
      />
      <div className="ms-auto d-flex">
        <Button
          id="wd-add-assignments-cat"
          variant="secondary"
          size="lg"
          className="me-1"
        >
          <FaPlus className="me-2" />
          Group
        </Button>

        <Button
          id="wd-add-assignments"
          variant="danger"
          size="lg"
        >
          <FaPlus className="me-2" />
          Assignment
        </Button>
      </div>
    </div>
  );
}