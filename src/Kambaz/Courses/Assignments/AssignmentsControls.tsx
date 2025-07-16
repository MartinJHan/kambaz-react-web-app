import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

export default function AssignmentsControls() {
 return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <Form className="float-start me-3" style={{ position: "relative" }}>
        <Form.Control
          type="text"
          placeholder="Search..."
          className="mb-2"
          style={{ width: "300px", paddingLeft: "35px" }} 
        />
        <FaSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "43%",
            transform: "translateY(-50%)",
            color: "gray",
          }}
        />
      </Form>
    	<Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
      	<FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      	Assignment
      </Button>
			<Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
      	<FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      	Group
      </Button>

		</div>

 );
}