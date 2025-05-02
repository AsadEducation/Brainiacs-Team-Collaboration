import React, { useState } from "react";

const PollCreationModal = ({
  isOpen,
  onClose,
  onCreate,
  currentUser, // Accept currentUser as a prop
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill in all fields.");
      return;
    }

    const pollData = {
      question,
      options: options.map((text) => ({ text: text.trim(), votes: [] })),
      createdBy: currentUser._id, // Use the actual user ID
    };

    onCreate(pollData); // Call the onCreate function
    setQuestion(""); // Reset question
    setOptions(["", ""]); // Reset options
    onClose(); // Close the modal
  };

  const handleCancel = () => {
    setQuestion(""); // Reset question
    setOptions(["", ""]); // Reset options
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Create a Poll</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-primary hover:text-accent mt-2"
          >
            + Add Option
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-accent"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollCreationModal;
