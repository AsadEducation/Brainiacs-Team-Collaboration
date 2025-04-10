const BoardsHeader = ({ onCreateBoard, searchQuery, setSearchQuery }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2 w-1/2">
      <input
        type="text"
        placeholder="Search boards..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered flex-grow"
      />
      <button className="btn btn-primary">Search</button>
    </div>
    <button onClick={onCreateBoard} className="btn btn-primary">
      Create Board
    </button>
  </div>
);

export default BoardsHeader;
