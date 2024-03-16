  // /* eslint-disable react/prop-types */
  // /* eslint-disable no-unused-vars */
  // import React, { useState } from "react";


  // function Sidebar({ topics, selectTopic }) {
  //   return (
  //     <div className="w-64 bg-gray-800 text-white p-6">
  //       <h2 className="text-xl mb-4">Topics</h2>
  //       {topics.map((topic, index) => (
  //         <button
  //           key={index}
  //           className="text-left w-full text-gray-200 hover:text-white"
  //           onClick={() => selectTopic(topic)}
  //         >
  //           {topic}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // }

  // function Blog({ selectedTopic }) {
  //   return (
  //     <div className="flex-1 p-6">
  //       <h2 className="text-2xl mb-4">Blog</h2>
  //       <div>
  //         {selectedTopic
  //           ? `Selected Topic: ${selectedTopic}`
  //           : "No Topic Selected"}
  //       </div>
  //     </div>
  //   );
  // }

  // export default function HtmlBlog() {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [selectedTopic, setSelectedTopic] = useState(null);
  //   const topics = ["Topic 1", "Topic 2", "Topic 3"];

  //   return (
  //     <div className="flex h-screen bg-gray-200">
  //       <button
  //         className="p-6 flex bg-blue-500 text-white"
  //         onClick={() => setIsOpen(!isOpen)}
  //       >
  //         {isOpen ? "close" : "Menu"}
  //       </button>
  //       {isOpen && <Sidebar topics={topics} selectTopic={setSelectedTopic} />}
  //       <Blog selectedTopic={selectedTopic} />
  //     </div>
  //   );
  // } 

  

  import React, { useState } from "react";
  import { Link } from "react-router-dom";

  function Html() {
    const [isOpen, setIsOpen] = useState(false);
    const topics = [
      { languages: "html", slug: "html blog" },
      { languages: "HTML", slug: "element" },
      { languages: "css", slug: "css basic" },
      { languages: "JavaScript", slug: "basic" },
    ]; // Update topics

    return (
      <div className="flex h-screen bg-gray-200">
        <button
          className="p-6 flex bg-blue-500 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "Menu"}
        </button>
        {isOpen && (
          <div className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-xl mb-4">Topics</h2>
            {topics.map((item, index) => (
              <Link
                key={index}
                to={`/${item.languages}/${item.slug
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="text-left w-full text-gray-200 hover:text-white block"
              >
                {item.languages} - {item.slug}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Html;

