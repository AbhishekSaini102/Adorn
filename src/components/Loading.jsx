/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "../App.css";

function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for 'loading' events
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    window.addEventListener("loading", start);
    window.addEventListener("loaded", end);

    // Clean up event listeners
    return () => {
      window.removeEventListener("loading", start);
      window.removeEventListener("loaded", end);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-bar">
      <div className="fixed top-18 left-0 w-full h-0.5 bg-blue-500 z-50"></div>;
    </div>
  );
}

export default Loading;
 