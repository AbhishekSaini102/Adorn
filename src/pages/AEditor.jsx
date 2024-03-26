/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Box, VStack, ChakraProvider, Button, HStack } from "@chakra-ui/react";
// import AdornEditor from "../../src/components/AdornEditor";
// import Select from "react-select";

// const editorLanguages = ["javascript", "python", "java", "cpp", "csharp"];
// const themes = ["vs-dark", "vs-light"];

// function AEditor() {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [editorLanguage, setEditorLanguage] = useState("javascript");
//   const [editorTheme, setEditorTheme] = useState("vs-dark");

//   const runCode = () => {
//     try {
//       // eslint-disable-next-line no-eval
//       const result = eval(code);
//       setOutput(result.toString());
//     } catch (error) {
//       setOutput(`Error: ${error}`);
//     }
//   };

//   return (
//     <ChakraProvider>
//       <VStack spacing={2}>
//         <HStack width="100%" justifyContent="space-between">
//           <Select
//             id="language"
//             placeholder="Select Language"
//             options={editorLanguages.map((language) => ({
//               value: language,
//               label: language,
//             }))}
//             onChange={(option) => setEditorLanguage(option.value)}
//           />
//           <Select
//             id="theme"
//             placeholder="Select Theme"
//             options={themes.map((theme) => ({ value: theme, label: theme }))}
//             onChange={(option) => setEditorTheme(option.value)}
//           />
//         </HStack>
//         <Box
//           w="100%"
//           h="45vh"
//           borderWidth="1px"
//           borderRadius="lg"
//           overflow="hidden"
//         >
//           <AdornEditor
//             language={editorLanguage}
//             theme={editorTheme}
//             value={code}
//             onChange={(newCode) => setCode(newCode)}
//           />
//         </Box>
//         <Button onClick={runCode}>Run</Button>
//         <Box
//           w="100%"
//           h="45vh"
//           p={4}
//           borderWidth="1px"
//           borderRadius="lg"
//           overflow="auto"
//         >
//           {output}
//         </Box>
//       </VStack>
//     </ChakraProvider>
//   );
// }

// export default AEditor;


// import React, { useState } from "react";
// import { Box, VStack, ChakraProvider, Button, HStack } from "@chakra-ui/react";
// import AdornEditor from "../../src/components/AdornEditor";
// import Select from "react-select";
// import { compileAndRun } from "../../src/components/EditorApi"; // import the function

// const editorLanguages = ["javascript", "python", "java", "cpp", "csharp"];
// const themes = ["vs-dark", "vs-light"];

// function AEditor() {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [editorLanguage, setEditorLanguage] = useState("javascript");
//   const [editorTheme, setEditorTheme] = useState("vs-dark");

//   const runCode = async () => {
//     // make this function async
//     const result = await compileAndRun(editorLanguage, code); // use the function

//     if (result.error) {
//       setOutput(`Error: ${result.error}`);
//     } else {
//       setOutput(result.output);
//     }
//   };

//   return (
//     <ChakraProvider>
//       <VStack spacing={2}>
//         <HStack width="100%" justifyContent="space-between">
//           <Select
//             id="language"
//             placeholder="Select Language"
//             options={editorLanguages.map((language) => ({
//               value: language,
//               label: language,
//             }))}
//             onChange={(option) => setEditorLanguage(option.value)}
//           />
//           <Select
//             id="theme"
//             placeholder="Select Theme"
//             options={themes.map((theme) => ({ value: theme, label: theme }))}
//             onChange={(option) => setEditorTheme(option.value)}
//           />
//         </HStack>
//         <Box
//           w="100%"
//           h="45vh"
//           borderWidth="1px"
//           borderRadius="lg"
//           overflow="hidden"
//         >
//           <AdornEditor
//             language={editorLanguage}
//             theme={editorTheme}
//             value={code}
//             onChange={(newCode) => setCode(newCode)}
//           />
//         </Box>
//         <Button onClick={runCode}>Run</Button>
//         <Box
//           w="100%"
//           h="45vh"
//           p={4}
//           borderWidth="1px"
//           borderRadius="lg"
//           overflow="auto"
//         >
//           {output}
//         </Box>
//       </VStack>
//     </ChakraProvider>
//   );
// }

// export default AEditor;




import React, { useState } from "react";
import AdornEditor from "../../src/components/AdornEditor";
import Select from "react-select";
import { compileAndRun } from "../../src/components/EditorApi"; // import the function


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


function AEditor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [editorTheme, setEditorTheme] = useState("vs-dark");


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
              onChange={(option) => setEditorLanguage(option.value)}
              styles={{ control: (base) => ({ ...base, height: 30 }) }}
            />
          </div>
          <div className="w-96">
            <Select
              id="theme"
              placeholder="Select Theme"
              options={themes.map((theme) => ({ value: theme, label: theme }))}
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

          />
        </div>
        <div className="w-1/3 h-screen px-0 pt-4 pb-2 border rounded-lg overflow-auto">
          <h2 className="text-lg mb-4 ml-3">Output</h2>
          <div className="p-4 border h-5/6 rounded overflow-auto bg-gray-100 ">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AEditor;
