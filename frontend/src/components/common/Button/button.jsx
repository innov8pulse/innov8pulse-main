import React from 'react';
import './button.css'; 

const Button = ({ text, onClick, variant }) => {
    return (
      <button className={`custom-button ${variant}`} onClick={onClick}>
        {text}
      </button>
    );
  };

export default Button;
