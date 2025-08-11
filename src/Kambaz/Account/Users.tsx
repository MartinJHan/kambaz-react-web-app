import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import PeopleDetails from "../Courses/People/Details";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const createUser = async () => {
    try {
      const userData = {
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT"
      };
      
      await client.createUser(userData);
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const { uid } = useParams();

  const filterUsersByName = async (name: string) => {
    setName(name);
    await applyFilters(role, name);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    await applyFilters(role, name);
  };

  const applyFilters = async (selectedRole: string, selectedName: string) => {
    try {
      let users;

      if (selectedRole && selectedName.trim()) {
        // Combined filtering: filter by both role and name
        const roleUsers = await client.findUsersByRole(selectedRole);
        const nameUsers = await client.findUsersByPartialName(selectedName);

        // Find intersection of two arrays
        const roleUserIds = roleUsers.map((user: any) => user._id.toString());
        users = nameUsers.filter((user: any) => roleUserIds.includes(user._id.toString()));
      } else if (selectedRole) {
        // Filter by role only
        users = await client.findUsersByRole(selectedRole);
      } else if (selectedName.trim()) {
        // Filter by name only
        users = await client.findUsersByPartialName(selectedName);
      } else {
        // No filters, show all users
        users = await client.findAllUsers();
      }

      setUsers(users);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name" />

      <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role" >
        <option value="">All Roles</option>    <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} />
      {uid && <PeopleDetails />}
    </div>
  );
}
