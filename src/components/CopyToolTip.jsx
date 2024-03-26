/* eslint-disable no-unused-vars */
import React from "react";

const CopyTooltip = ({ message }) => {
    
//   console.log(message);
 return (
    <div className=" relative group inline-block right-5 bottom-10 z-10 rounded ">
      {/* <button className=" bg-blue-500 text-white font-semibold  z-10 py-2 mt-2 px-4 rounded">
        Copy
      </button> */}
      <div className="absolute hidden inline-block px-3.5 py-2 whitespace-no-wrap text-sm leading-tight text-white bg-blue-500 font-medium rounded-lg shadow-lg transform -translate-y-full left-1/2 transform -translate-x-1/2 group-hover:block">
        {message}
      </div>
    </div>
  );
};

export default CopyTooltip;
