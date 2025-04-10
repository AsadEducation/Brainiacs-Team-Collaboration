const BoardsHeader = ({ onCreateBoard }) => (
  <div className="flex justify-end mb-4">
    <button onClick={onCreateBoard} className="btn btn-primary">
      Create Board
    </button>
  </div>
);

export default BoardsHeader;
