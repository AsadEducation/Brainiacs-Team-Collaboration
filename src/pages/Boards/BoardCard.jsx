import { motion } from "framer-motion";

const BoardCard = ({ board, onEdit, onDelete, navigate }) => (
  <motion.div
    className="p-4 shadow rounded cursor-pointer"
    style={{ backgroundColor: board.theme }}
    onClick={() => navigate(`/dashboard/boards/${board._id}`)}
  >
    <h3 className="text-lg font-bold">{board.name}</h3>
    <p className="text-sm ">{board.visibility}</p>
    <p className="text-sm mt-2">{board.description || "No description provided."}</p>
    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(board);
        }}
        className="btn btn-sm"
      >
        Details
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(board._id);
        }}
        className="btn btn-sm btn-error"
      >
        Delete
      </button>
    </div>
  </motion.div>
);

export default BoardCard;
