import React, { useState } from 'react';

const PinMessageModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleConfirm = () => {
    if (selectedDuration) {
      onConfirm(selectedDuration);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Select Pin Duration</h3>
        <div className="flex flex-col gap-2">
          {[1, 3, 7, 15].map((duration) => (
            <button
              key={duration}
              className={`px-4 py-2 rounded ${
                selectedDuration === duration
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary hover:text-white transition'
              }`}
              onClick={() => setSelectedDuration(duration)}
            >
              {duration} {duration === 1 ? 'Day' : 'Days'}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinMessageModal;
