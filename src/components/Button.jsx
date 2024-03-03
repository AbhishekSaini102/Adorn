/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverBgColor = "hover:bg-white hover:text-blue-700 hover:font-semibold hover:border-blue-600 border border-blue-600, ",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${hoverBgColor} ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
