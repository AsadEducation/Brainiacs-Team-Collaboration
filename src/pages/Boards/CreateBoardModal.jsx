import { motion } from "framer-motion";

const CreateBoardModal = ({
  isOpen,
  onClose,
  onCreate,
  newBoard,
  setNewBoard,
  description,
  setDescription,
  visibility,
  setVisibility,
  theme,
  setTheme,
  themeOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg bg-white"
        style={{ backgroundColor: theme }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Board</h3>
        <input
          type="text"
          placeholder="Board Name"
          value={newBoard}
          onChange={(e) => setNewBoard(e.target.value)}
          className="input input-bordered w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Board Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="select select-bordered w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Team Only">Team Only</option>
        </select>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Theme Color</label>
          <div className="flex flex-wrap items-center gap-3">
            {themeOptions.map((option) => (
              <div
                key={option.name}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  theme === option.color ? "border-blue-500" : "border-gray-300"
                }`}
                style={{ backgroundColor: option.color }}
                onClick={() => setTheme(option.color)}
                title={option.name}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="btn px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBoardModal;
