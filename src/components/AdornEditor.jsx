/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
// import Editor from "@monaco-editor/react";

// function AdornEditor() {
//   const handleEditorDidMount = (editor, monaco) => {
//     console.log("editor has mounted");
//   };

//   return (
//     <Editor
//       height="90vh" // By default, it fully fits with its parent
//       theme="vs-dark"
//       language="cpp"
//       value={"// type your code..."}
//       editorDidMount={handleEditorDidMount}
//       options={{
//         autoClosingQuotes: "always",
//         autoClosingBrackets: "always",
//       }}
//     />
//   );
// }

// export default AdornEditor;


// import React, { useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import * as MonacoEditor from "monaco-editor";

// function AdornEditor() {
//   const handleEditorDidMount = (editor, monaco) => {
//     console.log("editor has mounted");

//     MonacoEditor.editor.defineTheme("dark", {
//       base: "vs-dark",
//       inherit: true,
//       rules: [{ background: "EDF9FA" }],
//       colors: {
//         "editor.foreground": "#000000",
//         "editor.background": "#EDF9FA",
//         "editorCursor.foreground": "#8B0000",
//         "editor.lineHighlightBackground": "#0000FF20",
//         "editorLineNumber.foreground": "#008800",
//         "editor.selectionBackground": "#88000030",
//         "editor.inactiveSelectionBackground": "#88000015",
//       },
//     });

//     monaco.editor.setTheme("dark");
//   };

//   return (
//     <Editor
//       height="90vh"
//       theme="vs-dark"
//       language="cpp"
//       value={"// type your code..."}
//       editorDidMount={handleEditorDidMount}
//       options={{
//         autoClosingQuotes: "always",
//         autoClosingBrackets: "always",
//       }}
//     />
//   );
// }

// export default AdornEditor;


// import React from "react";
// import Editor from "@monaco-editor/react";

// function AdornEditor({ language = "cpp", theme = "vs-dark"  }) {
//   const handleEditorDidMount = (editor, monaco) => {
//     console.log("editor has mounted");
//   };

//   return (
//     <Editor
//       height="90vh"
//       theme={theme}
//       language={language}
//       value={"// type your code..."}
//       editorDidMount={handleEditorDidMount}
//       options={{
//         autoClosingQuotes: "always",
//         autoClosingBrackets: "always",
//         scrollBeyondLastLine: false,
//         minimap: { enabled: false },
//         mouseWheelZoom: true,
//         fontSize: 16,
//         fontFamily: "monospace",
//         wordWrap: "on",
//         wrappingIndent: "same",
//         wrappingStrategy: "advanced",
//         wordWrapColumn: 80,
//         wordWrapMinified: true,
//         wordWrapBreakBeforeCharacters: "/([{;,:",
//         wordWrapBreakAfterCharacters: "})]}'\"\\",
//         wordWrapBreakObtrusiveCharacters: ".",
    

//       }}
//     />
//   );
// }

// export default AdornEditor;


import React from "react";
import Editor from "@monaco-editor/react";

function AdornEditor({ language, theme, value, onChange }) {
  const handleEditorChange = (value, event) => {
    onChange(value);
  };
  // const handleLanguageChange = (language, event) => {
  //   onChange(language);
  // };

  // const handleThemeChange = (theme, event) => {
  //   onChange(theme);
  // };

  const handleEditorDidMount = (editor, monaco) => {
    console.log("editor has mounted");
  };

  return (
    <Editor
      height="90vh"
      theme={theme}
      language={language}
      value={value || "// type your code..."}
      onChange={handleEditorChange}
      // onChangeLanguage={handleLanguageChange}
      // onChangeTheme={handleThemeChange}
      editorDidMount={handleEditorDidMount}
      options={{
        autoClosingQuotes: "always",
        autoClosingBrackets: "always",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        mouseWheelZoom: true,
        fontSize: 16,
        fontFamily: "monospace",
        wordWrap: "on",
        wrappingIndent: "same",
        wrappingStrategy: "advanced",
        wordWrapColumn: 80,
        wordWrapMinified: true,
        wordWrapBreakBeforeCharacters: "/([{;,:",
        wordWrapBreakAfterCharacters: "})]}'\"\\",
        wordWrapBreakObtrusiveCharacters: ".",
      }}
    />
  );
}

export default AdornEditor;
