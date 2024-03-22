// /* eslint-disable no-unused-vars */
// import React, {useId} from 'react'

// const Input = React.forwardRef(function Input({

//     label,
//     type = 'text',
//     // id,
//     // name,
//     // placeholder,
//     className = '',
//     ...props

// }, ref){

//     const id = useId()
//     return (
//         <div className='w-full '>
//             {label && <label 
//             className=' inline-block mb-1 pl-1'
//             htmlFor={id}>
//                 {label}
//             </label>}

//             <input
//             type={type}
//             id={id}
//             ref={ref}
//             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
//             {...props}
//             />
//         </div>
//     )
// })


// export default Input


import React, { useState } from "react";

const Input = React.forwardRef(function Input({ 
    
    label, 
    type = "text", 
    id, className = "", 
    ...props 
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  const handleShowPasswordClick = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full ">
      {label && (
        <label className=" inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}

      {isPassword ? (
        <div style={{ position: "relative" }}>
          <input
            type={inputType}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
            {...props}
          />

          <button
            onClick={handleShowPasswordClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 text-black px-1 py-2.5 rounded-r-lg font-semibold text-sm duration-200 hover:bg-gray-200 w-12 mr-0.2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          ref={ref} 
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
          {...props}
        />
      )}
    </div>
  );
});

export default Input;

