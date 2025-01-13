import React from "react";

function Button({ children, className, onClick, type }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
