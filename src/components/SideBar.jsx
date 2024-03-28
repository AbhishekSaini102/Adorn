import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const topics = [
    { languages: "html", slug: "html blog" },
    { languages: "HTML", slug: "element" },
    { languages: "css", slug: "css basic" },
    { languages: "JavaScript", slug: "basic" },
  ];

  return (
    <div>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : "☰"}
      </button>
      {isOpen && (
        <div className="sidebar">
          <ul>
            {topics.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.languages}/${item.slug
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/${post_Id}`}
                >
                  {item.languages} - {item.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
