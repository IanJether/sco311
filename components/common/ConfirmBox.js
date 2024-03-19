



import React from 'react';
import PropTypes from 'prop-types';

function ConfirmationBox({ onConfirm, onCancel, message }) {
  return (
    <div className="fixed top-[0] left-[0] z-20 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="text-[13px] font-semibold text-neutral-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationBox.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationBox;