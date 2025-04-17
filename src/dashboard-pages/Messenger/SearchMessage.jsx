import React, { useState } from "react";

const SearchMessage = ({ messages, onScrollToMessage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const foundMessage = messages.find((msg) =>
      msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundMessage) {
      onScrollToMessage(foundMessage.messageId);
    } else {
      alert("Message not found");
    }
  };

  return (
    <div className="search-message">
      <input
        type="text"
        placeholder="Search messages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchMessage;
