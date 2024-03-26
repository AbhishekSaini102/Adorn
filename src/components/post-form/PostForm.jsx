/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import authService from "../../appwrite/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ReactSelect from "react-select";

// export default function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//         authorName: post?.authorName || "",
//         authorEmail: post?.authorEmail || "",
//       },
//     });

//   const navigate = useNavigate();
//   let userData = useSelector((state) => state.auth.userData);

//   const language = ["html", "css", "javascript", "python", "java", "c++"];
//   const topics = ["<p> tag", "app development", "game development"];

//   const submit = async (data) => {
//     // Fetch current user's data if userData is not available
//     if (!userData) {
//       userData = await authService.getCurrentUser();
//     }

//     if (post) {
//       const file = data.image[0]
//         ? appwriteService.uploadFile(data.image[0])
//         : null;

//       if (file) {
//         appwriteService.deleteFile(post.featuredImage);
//       }

//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       });

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     } else {
//       const file = await appwriteService.uploadFile(data.image[0]);

//       if (file) {
//         const fileId = file.$id;
//         data.featuredImage = fileId;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           userId: userData.$id,
//           authorName: userData.name,
//           authorEmail: userData.email,
//         });

//         if (dbPost) {
//           navigate(`/post/${dbPost.$id}`);
//         }
//       }
//     }
//   };

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);

//   React.useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         {/* <label
//           htmlFor="language"
//           className="block text-gray-700 text-base  ml-1 mb-2"
//         >
//           Language :
//         </label>
//         <select
//           className="w-full px-2  py-2.5 mb-2 border border-gray-200 rounded-md text-gray-400"
//           {...register("language", { required: true })}
//         >
//           <option value="" >Select Language</option>
//           {language.map((lang, index) => (
//             <option className="text-black" key={index} value={lang}>
//               {lang}
//             </option>
//           ))}
//         </select> */}

//        {/* <label
//           htmlFor="language"
//           className="block text-gray-700 text-base  ml-1 mb-2"
//         >
//           Language :
//         </label>
//         <ReactSelect
//           id="language"
//           className="mb-4 z-20"
//           placeholder="Select Language"
//           options={language.map((lang) => ({ value: lang, label: lang }))}
//           styles={{
//             option: (provided, state) => ({
//               ...provided,
//               color: state.isSelected ? "black" : provided.color,
//             }),
//           }}
//           {...register("language", { required: true })}
//         />  */}

//         {/* <label
//           htmlFor="topics"
//           className="block text-gray-700 text-base ml-1 mb-2"
//         >
//           Topic :
//         </label>
//         <ReactSelect
//           id="topics"
//           className="mb-4 z-10"
//           placeholder="Select Topic"
//           options={topics.map((topic) => ({ value: topic, label: topic }))}
//           styles={{
//             option: (provided, state) => ({
//               ...provided,
//               color: state.isSelected ? "black" : provided.color,
//             }),
//           }}
//           {...register("topic", { required: true })}
//         /> */}

//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <label
//           htmlFor="status"
//           className="block text-gray-700 text-base ml-1 mb-2"
//         >
//           Status :
//         </label>
//         <ReactSelect
//           id="status"
//           className="mb-4 z-10"
//           placeholder="Select Status"
//           options={["active", "inactive"].map((status) => ({
//             value: status,
//             label: status,
//           }))}
//           styles={{
//             option: (provided, state) => ({
//               ...provided,
//               color: state.isSelected ? "black" : provided.color,
//             }),
//           }}
//           {...register("status", { required: true })}
//         />

//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update Post" : "Add Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }



// import React, { useCallback, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import authService from "../../appwrite/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ReactSelect from "react-select";

// export default function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         language: post?.language || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//         authorName: post?.authorName || "",
//         authorEmail: post?.authorEmail || "",
//       },
//     });

//   const navigate = useNavigate();
//   let userData = useSelector((state) => state.auth.userData);

//   const language = ["html", "css", "javascript", "python", "java", "c++"];
//   const topicsByLanguage = {
//     html: ["<p> tag", "HTML Element", "HTML Attribute"],
//     css: ["CSS Selector", "CSS Box Model", "CSS Flexbox"],
//     javascript: [
//       "JavaScript Variable",
//       "JavaScript Function",
//       "JavaScript Array",
//     ],
//     python: ["Python List", "Python Tuple", "Python Dictionary"],
//     java: ["Java Class", "Java Interface", "Java Exception"],
//     "c++": ["C++ Class", "C++ Pointer", "C++ Reference"],
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState(language[0]);

//   const handleLanguageChange = (selectedOption) => {
//     setSelectedLanguage(selectedOption.value);
//   };

//   // const submit = async (data) => {
//   //   // Fetch current user's data if userData is not available
//   //   if (!userData) {
//   //     userData = await authService.getCurrentUser();
//   //   }

//   //   if (post) {
//   //     const file = data.image[0]
//   //       ? appwriteService.uploadFile(data.image[0])
//   //       : null;

//   //     if (file) {
//   //       appwriteService.deleteFile(post.featuredImage);
//   //     }

//   //     const dbPost = await appwriteService.updatePost(post.$id, {
//   //       ...data,
//   //       featuredImage: file ? file.$id : undefined,
//   //     });

//   //     if (dbPost) {
//   //       navigate(`/html/${dbPost.slug}`);
//   //     }
//   //   } else {
//   //     const file = await appwriteService.uploadFile(data.image[0]);

//   //     if (file) {
//   //       const fileId = file.$id;
//   //       data.featuredImage = fileId;
//   //       const dbPost = await appwriteService.createPost({
//   //         ...data,
//   //         userId: userData.$id,
//   //         authorName: userData.name,
//   //         authorEmail: userData.email,
//   //       });

//   //       if (dbPost) {
//   //         navigate(`/html/${dbPost.slug}`);
//   //       }
//   //     }
//   //   }
//   // };


//   const submit = async (data) => {
//     // Fetch current user's data if userData is not available
//     if (!userData) {
//       userData = await authService.getCurrentUser();
//     }

//     if (post) {
//       const file = data.image[0]
//         ? appwriteService.uploadFile(data.image[0])
//         : null;

//       if (file) {
//         appwriteService.deleteFile(post.featuredImage);
//       }

//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       });

//       if (dbPost) {
//         navigate(`/${selectedLanguage}/${dbPost.slug}`);
//       }
//     } else {
//       const file = await appwriteService.uploadFile(data.image[0]);

//       if (file) {
//         const fileId = file.$id;
//         data.featuredImage = fileId;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           userId: userData.$id,
//           authorName: userData.name,
//           authorEmail: userData.email,
//         });

//         if (dbPost) {
//           navigate(`/${selectedLanguage}/${dbPost.slug}`);
//         }
//       }
//     }
//   };


//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);

//   React.useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <label
//           htmlFor="language"
//           className="block text-gray-700 text-base ml-1 mt-0.5 mb-2"
//         >
//           Language:
//         </label>
//         <Controller
//           name="language"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="language"
//               className="mb-4 z-20"
//               placeholder="Select Language"
//               options={language.map((language) => ({
//                 value: language,
//                 label: language,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={handleLanguageChange}
//               value={language.find(
//                 (language) => language.value === field.value
//               )}
//             />
//           )}
//         />

//         <label
//           htmlFor="topic"
//           className="block text-gray-700 text-base ml-1 mb-1"
//         >
//           Title :
//         </label>
//         <Controller
//           name="title"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="title"
//               className="mb-4 z-10"
//               placeholder="Select Topic"
//               options={topicsByLanguage[selectedLanguage].map((topic) => ({
//                 value: topic,
//                 label: topic,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={(option) => field.onChange(option.value)}
//               value={topicsByLanguage[selectedLanguage].find(
//                 (topic) => topic.value === field.value
//               )}
//             />
//           )}
//         />

//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />

//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <label
//           htmlFor="status"
//           className="block text-gray-700 text-base ml-1 mb-2"
//         >
//           Status :
//         </label>
//         <Controller
//           name="status"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="status"
//               className="mb-4 z-10"
//               placeholder="Select Status"
//               options={["active", "inactive"].map((status) => ({
//                 value: status,
//                 label: status,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={(option) => field.onChange(option.value)}
//               value={["active", "inactive"]
//                 .map((status) => ({
//                   value: status,
//                   label: status,
//                 }))
//                 .find((option) => option.value === field.value)}
//             />
//           )}
//         />

//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update Post" : "Add Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }


// import React, { useCallback, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import authService from "../../appwrite/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ReactSelect from "react-select";

// function SelectWrapper({ options, ...props }) {
//   const { field } = props;
//   return (
//     <ReactSelect
//       {...field}
//       options={options.map((option) => ({ value: option, label: option }))}
//       onChange={(selectedOption) => {
//         field.onChange(selectedOption.value);
//         if (props.onChange) props.onChange(selectedOption);
//       }}
//       value={options
//         .map((option) => ({ value: option, label: option }))
//         .find((option) => option.value === field.value)}
//     />
//   );
// }


// export default function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//         authorName: post?.authorName || "",
//         authorEmail: post?.authorEmail || "",
//         language: post?.languages || "",
//       },
//     });

//   const navigate = useNavigate();
//   let userData = useSelector((state) => state.auth.userData);

//   const languages = ["html", "css", "javascript", "python", "java", "c++"];
//   const topicsByLanguage = {
//     html: ["<p> tag", "HTML Element", "HTML Attribute"],
//     css: ["CSS Selector", "CSS Box Model", "CSS Flexbox"],
//     javascript: [
//       "JavaScript Variable",
//       "JavaScript Function",
//       "JavaScript Array",
//     ],
//     python: ["Python List", "Python Tuple", "Python Dictionary"],
//     java: ["Java Class", "Java Interface", "Java Exception"],
//     "c++": ["C++ Class", "C++ Pointer", "C++ Reference"],
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
//   const [selectedTopic, setSelectedTopic] = useState(
//     topicsByLanguage[selectedLanguage][0]
//   );

//   const handleLanguageChange = (selectedOption) => {
//     setSelectedLanguage(selectedOption.value);
//     setSelectedTopic(topicsByLanguage[selectedOption.value][0]);
//   };

//   const handleTopicChange = (selectedOption) => {
//     setSelectedTopic(selectedOption.value);
//     setValue("slug", slugTransform(selectedOption.value), {
//       shouldValidate: true,
//     });
//   };

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);

//   React.useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   const submit = async (data) => {
//     // Fetch current user's data if userData is not available
//     if (!userData) {
//       userData = await authService.getCurrentUser();
//     }
//      console.log("Selected language:", selectedLanguage);
//     if (post) {
//       const file = data.image[0]
//         ? appwriteService.uploadFile(data.image[0])
//         : null;

//       if (file) {
//         appwriteService.deleteFile(post.featuredImage);
//       }

//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         language: selectedLanguage,
//         title: selectedTopic,
//         featuredImage: file ? file.$id : undefined,
//       });
//       console.log("Response:", dbPost); // Log response

//       if (dbPost) {
//         navigate(`/${selectedLanguage}/${dbPost.$id}`);
//       }
//     } else {
//       const file = await appwriteService.uploadFile(data.image[0]);

//       if (file) {
//         const fileId = file.$id;
//         data.featuredImage = fileId;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           language: selectedLanguage,
//           title: selectedTopic,
//           userId: userData.$id,
//           authorName: userData.name,
//           authorEmail: userData.email,
//         });
//         console.log("Response:", dbPost); // Log response

//         if (dbPost) {
//           navigate(`/${selectedLanguage}/${dbPost.$id}`);
//         }
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Controller
//           name="language"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="language"
//               className="mb-4 z-20"
//               placeholder="Select Language"
//               options={languages.map((language) => ({
//                 value: language,
//                 label: language,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={handleLanguageChange}
//               value={languages.find(
//                 (language) => language.value === field.value
//               )}
//             />
//           )}
//         />

//         <Controller
//           name="title"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="title"
//               className="mb-4 z-10"
//               placeholder="Select Topic"
//               options={topicsByLanguage[selectedLanguage].map((topic) => ({
//                 value: topic,
//                 label: topic,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={handleTopicChange}
//               value={topicsByLanguage[selectedLanguage].find(
//                 (topic) => topic.value === field.value
//               )}
//             />
//           )}
//         />

//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />

//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <label
//           htmlFor="status"
//           className="block text-gray-700 text-base ml-1 mb-2"
//         >
//           Status :
//         </label>
//         <Controller
//           name="status"
//           control={control}
//           defaultValue=""
//           rules={{ required: true }}
//           render={({ field }) => (
//             <ReactSelect
//               {...field}
//               id="status"
//               className="mb-4 z-10"
//               placeholder="Select Status"
//               options={["active", "inactive"].map((status) => ({
//                 value: status,
//                 label: status,
//               }))}
//               styles={{
//                 option: (provided, state) => ({
//                   ...provided,
//                   color: state.isSelected ? "black" : provided.color,
//                 }),
//               }}
//               onChange={(option) => field.onChange(option.value)}
//               value={["active", "inactive"]
//                 .map((status) => ({
//                   value: status,
//                   label: status,
//                 }))
//                 .find((option) => option.value === field.value)}
//             />
//           )}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update Post" : "Add Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }


/* eslint-disable react/prop-types */
import React, { useCallback, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, RTE, Select, AdornEditor} from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        postId: post?.$id || "",
        slug: post?.slug || "",
        content: post?.content || "",
        code: post?.code || "",
        status: post?.status || "active",
        authorName: post?.authorName || "",
        authorEmail: post?.authorEmail || "",
        languages: post?.languages || "",
        topics: post?.topics || "",
        languageforeditor: post?.languageforeditor || "",
        theme: post?.theme || "",
      },
    });

  const navigate = useNavigate();
  let userData = useSelector((state) => state.auth.userData);

  // const [editorContent, setEditorContent] = useState(post?.content || "");
  const [editorCode, setEditorCode] = useState(post?.code || "");

  const handleEditorChange = (value, event) => {
    setEditorCode(value);
    setValue("code", value);
  };

  const languages = ["html", "css"];
  const topics = {
    html: ["Html Element", "Topic2"],
    css: ["Css Basic", "Sujet2"],
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    post?.languages || ""
  );


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

  // const [editorLanguage, setEditorLanguage] = useState(editorLanguages[0]);
  // const [editorTheme, setEditorTheme] = useState(themes[0]);
  const [editorLanguage, setEditorLanguage] = useState(post?.languageforeditor|| "");
  const [editorTheme, setEditorTheme] = useState(post?.theme || "");

  const findOption = (options, value) =>
    options.find((option) => option.value === value);

  const submit = async (data) => {
    // Fetch current user's data if userData is not available
    if (!userData) {
      userData = await authService.getCurrentUser();
    }
    data.languageforeditor = editorLanguage;
    data.theme = editorTheme;
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        // navigate(`/post/${dbPost.$id}`);
        navigate(`/post/${dbPost.slug}/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          // post_Id: userData.$id,
          authorName: userData.name,
          authorEmail: userData.email,

          // languages: userData.languages,
        });

        if (dbPost) {
          // navigate(`/post/${dbPost.$id}`);
          navigate(`/post/${dbPost.slug}/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "topics") {
        setValue("slug", slugTransform(value.topics), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full px-2">
        
        <label
          htmlFor="status"
          className="block text-gray-700 text-base ml-1 mb-2"
        >
          Language :
        </label>
        <Controller
          name="languages"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              id="languages"
              className="mb-4 z-20"
              placeholder="Select Language"
              options={languages.map((language) => ({
                value: language,
                label: language,
              }))}
              onChange={(option) => {
                field.onChange(option.value);
                setSelectedLanguage(option.value);
              }}
              value={
                languages.find((val) => val === field.value)
                  ? {
                      value: field.value,
                      label:
                        field.value.charAt(0).toUpperCase() +
                        field.value.slice(1),
                    }
                  : null
              }
            />
          )}
        />
        <label
          htmlFor="status"
          className="block text-gray-700 text-base ml-1 mb-2"
        >
          Topics :
        </label>
        <Controller
          name="topics"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              id="topics"
              className="mb-4 z-10"
              placeholder="Select Topic"
              options={
                topics[selectedLanguage]
                  ? topics[selectedLanguage].map((topic) => ({
                      value: topic,
                      label: topic,
                    }))
                  : []
              }
              onChange={(option) => field.onChange(option.value)}
              value={
                topics[selectedLanguage] &&
                topics[selectedLanguage].find((val) => val === field.value)
                  ? {
                      value: field.value,
                      label:
                        field.value.charAt(0).toUpperCase() +
                        field.value.slice(1),
                    }
                  : null
              }
            />
          )}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <Input
          label="Title/Description :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        
        <div className="flex justify-between mt-8">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="language"
              className="block text-gray-700 text-base ml-1 mb-2"
            >
              Language:
            </label>
            <ReactSelect
              id="language"
              className="mb-4 z-20 w-full"
              placeholder="Select Language"
              value={findOption(
                editorLanguages.map((language) => ({
                  value: language,
                  label: language,
                })),
                editorLanguage
              )}
              options={editorLanguages.map((language) => ({
                value: language,
                label: language,
              }))}
              onChange={(option) => setEditorLanguage(option.value)}
            />
          </div>

          <div className="w-1/2 pl-2">
            <label
              htmlFor="theme"
              className="block text-gray-700 text-base ml-1 mb-2"
            >
              Theme:
            </label>
            <ReactSelect
              id="theme"
              className="mb-4 z-20 w-full"
              placeholder="Select Theme"
              value={findOption(
                themes.map((theme) => ({ value: theme, label: theme })),
                editorTheme
              )}
              options={themes.map((theme) => ({ value: theme, label: theme }))}
              onChange={(option) => setEditorTheme(option.value)}
            />
          </div>
        </div>

        
        <div className="bg-gray-200 px-4 py-4 rounded-lg">
          <AdornEditor
            value={editorCode}
            language={editorLanguage}
            theme={editorTheme}
            onChange={handleEditorChange}
          />
        </div>
        
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        /> */}

        <label
          htmlFor="status"
          className="block text-gray-700 text-base ml-1 mb-2"
        >
          Status :
        </label>
        <Controller
          name="status"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              id="status"
              className="mb-4 z-10"
              placeholder="Select Status"
              options={["active", "inactive"].map((status) => ({
                value: status,
                label: status,
              }))}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "black" : provided.color,
                }),
              }}
              onChange={(option) => field.onChange(option.value)}
              value={["active", "inactive"]
                .map((status) => ({
                  value: status,
                  label: status,
                }))
                .find((option) => option.value === field.value)}
            />
          )}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update Post" : "Add Post"}
        </Button>
      </div>
    </form>
  );
}