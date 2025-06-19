import React from 'react';

function NeonText({ text, className }) {
  return (
    <span className={`font-mono neon-glow ${className}`}>
      {text}
    </span>
  );
}

export function Loader({ className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="loader-neon"></div>
    </div>
  );
}

export default NeonText;