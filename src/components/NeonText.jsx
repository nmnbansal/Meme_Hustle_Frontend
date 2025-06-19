import React from 'react';

function NeonText({ text, className }) {
  return (
    <span className={`font-mono neon-glow ${className}`}>
      {text}
    </span>
  );
}

export default NeonText;