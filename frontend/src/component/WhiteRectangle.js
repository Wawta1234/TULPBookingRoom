// WhiteRectangle.js
import React from 'react';
import './WhiteRectangle.css';



const WhiteRectangle = ({ children }) => {
  return (
    <div className="white-rectangle">
      {children}
    </div>
  );
};

export default WhiteRectangle;
