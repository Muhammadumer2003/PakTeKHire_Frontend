import React from "react";

const Logo = () => {
    const handleclick = () => {
        window.location.href = "/find-work";
        
    };
  return (
    <div className="text-2xl font-bold text-green-500 cursor-pointer font-inter"
    onClick={handleclick}>

      {/* <img src="\PNG.png" alt="logo"/> */}
      Pak<span className="text-white">TekHire.com</span>
    </div>
  );
};

export default Logo;



// import React from "react";

// const Logo = () => {
//   const handleClick = () => {
//     window.location.href = "/find-work";
//   };

//   return (
//     <div 
//       onClick={handleClick} 
//       className="cursor-pointer flex items-center font-bold text-xl"
//     >
//       <span className="text-green-600">Pak</span>
//       <span className="text-blue-700">Tek</span>
//       <span className="text-green-600">Hire</span>
//       <span className="text-gray-700">.com</span>
//     </div>
//   );
// };

// export default Logo;






// import React from "react";

// const Logo = () => {
//     const handleclick = () => {
//         window.location.href = "/find-work";
//     };

//     return (
//         <div
//             className="flex items-center h-full cursor-pointer"
//             onClick={handleclick}
//         >
//             <img 
//                 src="/PNG.png" 
//                 alt="logo" 
//                 className="h-10 w-auto max-h-full object-contain text-white" 
//             />
//             {/* Uncomment the line below if you want text alongside the logo */}
//             {/* <span className="ml-2 text-2xl font-bold text-green-500">Pak<span className="text-white">TekHire.com</span></span> */}
//         </div>
//     );
// };

// export default Logo;
