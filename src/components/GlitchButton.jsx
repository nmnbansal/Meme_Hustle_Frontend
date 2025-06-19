import React, { useRef } from 'react';

function GlitchButton({ text, onClick, type = 'button' }) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    if (btnRef.current) {
      btnRef.current.classList.remove('glitch-click');
      // Force reflow to restart animation
      void btnRef.current.offsetWidth;
      btnRef.current.classList.add('glitch-click');
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      className="bg-cyber-pink text-black px-4 py-2 rounded hover:bg-cyber-blue transition duration-200"
    >
      {text}
    </button>
  );
}

export default GlitchButton;