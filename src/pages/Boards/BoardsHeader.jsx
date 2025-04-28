import { FiSearch, FiPlus } from "react-icons/fi";
import axios from "axios";

const BoardsHeader = ({ onCreateBoard, searchQuery, setSearchQuery, setBoards }) => {
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/boards/search`,
        { params: { query: searchQuery } }
      );
      setBoards(response.data);
    } catch (error) {
      console.error("Error searching boards:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      {/* Search Box */}
      <div className="flex w-full md:w-1/2 items-center bg-white rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search boards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-full border-none focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-secondary hover:bg-secondary/70 cursor-pointer text-white px-4 py-2 flex items-center gap-1"
        >
          <FiSearch className="text-lg" />
          <span>Search</span>
        </button>
      </div>

      {/* Create Board Button */}
      <button
        onClick={onCreateBoard}
        className="flex items-center gap-2 bg-primary hover:bg-primary/70 cursor-pointer text-white px-5 py-2 rounded-lg shadow-md"
      >
        <FiPlus className="text-lg" />
        <span>Create Board</span>
      </button>
    </div>
  );
};

export default BoardsHeader;
