import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export default function AssnCatControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="fs-5 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}