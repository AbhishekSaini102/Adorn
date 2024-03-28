/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AdornEditor from "../components/AdornEditor";
import Select from "react-select";
import { compileAndRun } from "../components/EditorApi"; // import the function
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config"; // import your appwrite service

const editorLanguages = [
  "plaintext",
  "abap",
  "apex",
  "azcli",
  "bat",
  "cameligo",
  "clojure",
  "coffee",
  "c",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "kotlin",
  "less",
  "lexon",
  "lua",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "ruby",
  "rust",
  "sb",
  "scheme",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
];
const themes = ["vs ", "vs-dark", "hc-black"];


function CompileCodeEditor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [editorLanguage, setEditorLanguage] = useState(null);
  const [editorTheme, setEditorTheme] = useState(null);

  const { post_Id } = useParams(); // get the post_Id from the URL

  // fetch the post details when the component mounts
  useEffect(() => {
    appwriteService.getPost(post_Id).then((post) => {
      setCode(post.code);
      setEditorLanguage(post.languageforeditor);
      setEditorTheme(post.theme);
    });
  }, [post_Id]);

  const runCode = async () => {
    // make this function async
    const result = await compileAndRun(editorLanguage, code); // use the function

    if (result.error) {
      setOutput(`Error: ${result.error}`);
    } else {
      setOutput(result.output);
    }
  };

  return (
    <div className="flex flex-col space-y-2 h-90vh">
      <div className="flex justify-around mt-1 w-full">
        <div className="flex space-x-2 mr-40">
          <div className="w-96">
            <Select
              id="language"
              placeholder="Select Language"
              options={editorLanguages.map((language) => ({
                value: language,
                label: language,
              }))}
              value={
                editorLanguage && {
                  value: editorLanguage,
                  label: editorLanguage,
                }
              } // set the initial value to languageforeditor
              onChange={(option) => setEditorLanguage(option.value)}
              styles={{ control: (base) => ({ ...base, height: 30 }) }}
            />
          </div>
          <div className="w-96">
            <Select
              id="theme"
              placeholder="Select Theme"
              options={themes.map((theme) => ({ value: theme, label: theme }))}
              value={editorTheme && { value: editorTheme, label: editorTheme }} // set the initial value to theme
              onChange={(option) => setEditorTheme(option.value)}
              styles={{ control: (base) => ({ ...base, height: 30 }) }}
            />
          </div>
        </div>
        <div className="flex space-x-2 mr-20 ">
          <button
            onClick={runCode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
          >
            Run
          </button>
          <button
            // onClick={runCode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
          >
            Input
          </button>
        </div>
      </div>
      <div className="flex space-x-2 h-full">
        <div className="w-2/3 h-full border rounded">
          <AdornEditor
            language={editorLanguage}
            theme={editorTheme}
            value={code}
            onChange={setCode} // pass setCode to AdornEditor to update code state when the editor's value changes
          />
        </div>
        <div className="w-1/3 px-0 pt-4 pb-2 border rounded-lg overflow-auto ">
          <h2 className="text-lg mb-4 ml-3 ">Output</h2>
          <div className="p-4 border h-full rounded overflow-auto bg-gray-100 z-10">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompileCodeEditor;
