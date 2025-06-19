import React from 'react';

function GlitchButton({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-cyber-pink text-black px-4 py-2 rounded hover:bg-cyber-blue transition duration-200"
    >
      {text}
    </button>
  );
}

export default GlitchButton;