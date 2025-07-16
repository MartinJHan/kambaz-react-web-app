import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <ListGroup className="rounded-0 wd">
      <ListGroup.Item as={Link} to="/Kambaz/Account/Signin"
      className="active border border-0"> Signin </ListGroup.Item>

      <ListGroup.Item as={Link} to="/Kambaz/Account/Signup" 
      className="text-danger border border-0"> Signup </ListGroup.Item>

      <ListGroup.Item as={Link} to="/Kambaz/Account/Profile"
      className="text-danger border border-0"> Profile </ListGroup.Item>

    </ListGroup>
);}
