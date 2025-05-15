// import React from "react";
// import {useEffect,useState} from "react";
// import { FaSearch, FaUserTie, FaHandshake, FaChevronDown } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "animate.css";

// const LandingPage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const backgroundImages = [
//     "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//     "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//     "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="font-sans">
//        {/* Hero Section */}
//        <section className="relative flex flex-col min-h-screen bg-white">
//       {/* Background Image Carousel */}
//       {backgroundImages.map((image, index) => (
//         <div 
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center z-0 opacity-20 transition-opacity duration-1000 ease-in-out ${
//             index === currentImageIndex ? 'opacity-20' : 'opacity-0'
//           }`}
//           style={{ backgroundImage: `url("${image}")` }}
//         ></div>
//       ))}
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between relative z-10 flex-grow">
//         {/* Left Content */}
//         <div className="w-full md:w-1/2 md:pr-12 space-y-6 mb-10 md:mb-0">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
//             Find the perfect <span className="text-green-600">professionals</span> for your business
//           </h1>
          
//           <p className="text-xl text-gray-600 max-w-xl">
//             PakTekHire: Pakistan's trusted marketplace for connecting businesses with skilled freelancers and top tech talent.
//           </p>
          
//           <div className="pt-4 flex flex-col sm:flex-row gap-4">
//             <button className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md text-lg font-medium transition-all transform hover:scale-102 shadow-md">
//               Find Talent
//             </button>
//             <button className="bg-white hover:bg-gray-100 text-green-700 border border-green-700 py-3 px-6 rounded-md text-lg font-medium transition-all transform hover:scale-102 shadow-sm">
//               Post a Job
//             </button>
//           </div>
          
//           {/* <div className="pt-6">
//             <p className="text-gray-500 text-sm">Trusted by thousands of tech businesses across Pakistan</p>
//             <div className="flex flex-wrap items-center gap-6 mt-4"> */}
//               {/* Replace with actual logos  */}
//                {/* <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
//               <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
//               <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
//             </div>
//           </div> */}
//         </div>  
        
//          {/* Right Side Image */}
//         <div className="w-full md:w-1/2 relative">
//           <img 
//             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
//             alt="Professionals working together" 
//             className="rounded-lg shadow-xl object-cover w-full max-h-96"
//           />
          
//           {/* Floating Stats Card */}
//           <div className="absolute -bottom-8 -left-4 md:-left-12 bg-white p-6 rounded-lg shadow-lg max-w-xs">
//             <div className="flex items-center space-x-4">
//               <div className="rounded-full bg-green-100 p-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-bold text-gray-900 text-2xl">93%</p>
//                 <p className="text-gray-600 text-sm">Client satisfaction rate</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Search Bar Section */}
//       <div className="bg-gray-50 w-full py-8 border-t border-gray-200 relative z-10">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-2 flex flex-col sm:flex-row">
//             <div className="flex-grow p-2">
//               <input 
//                 type="text" 
//                 placeholder="Search for any tech skill..." 
//                 className="w-full px-4 py-3 text-gray-700 focus:outline-none"
//               />
//             </div>
//             <button className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 m-2 rounded-md whitespace-nowrap transition-colors">
//               Find Talent
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//        {/* How It Works Section */}     
//          <section className="bg-gray-100 py-16">
//          <div className="max-w-7xl mx-auto px-6">
//            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//             How PAKTEKHIRE Works
//            </h2>           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//              <div className="text-center">
//                <FaSearch className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
//                <h3 className="text-xl font-semibold mb-2">Find Talent</h3>
//                <p className="text-gray-600">
//                  Search for skilled freelancers across various industries in Pakistan.
//                </p>
//              </div>
//              <div className="text-center">
//                <FaHandshake className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
//                <h3 className="text-xl font-semibold mb-2">Hire with Confidence</h3>
//                <p className="text-gray-600">
//                  Review profiles, portfolios, and ratings to find the perfect match.
//                </p>
//              </div>
//              <div className="text-center">
//                <FaUserTie className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
//                <h3 className="text-xl font-semibold mb-2">Get Work Done</h3>
//                <p className="text-gray-600">
//                  Collaborate seamlessly and achieve your goals together.
//                </p>
//              </div>
//            </div>
//          </div>
//        </section>

//        {/* Featured Clients Section */}
//       <section className="py-16 bg-white">
//          <div className="max-w-7xl mx-auto px-6">
//            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//              Trusted by Leading Companies in Pakistan
//            </h2>
//            <div className="flex justify-center space-x-12">
//              <img
//               src="https://imgs.search.brave.com/Wh-hNkFK_fnS4KI92EcbNRT1Xy2oYVmyh1BlfXbaLk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lNC9OYXRpb25h/bF9Vbml2ZXJzaXR5/X29mX0NvbXB1dGVy/X2FuZF9FbWVyZ2lu/Z19TY2llbmNlc19s/b2dvLnBuZy81MTJw/eC1OYXRpb25hbF9V/bml2ZXJzaXR5X29m/X0NvbXB1dGVyX2Fu/ZF9FbWVyZ2luZ19T/Y2llbmNlc19sb2dv/LnBuZw"
//               alt="Client Logo"
//               className="w-32 grayscale hover:grayscale-0 transition duration-300"
//             />
//             <img
//               src="https://www.syslab.com/wp-content/uploads/2023/02/Logo_SYSLAB_ohneClaim_4c.svg"
//               alt="Client Logo"
//               className="w-32 grayscale hover:grayscale-0 transition duration-300"
//             />
//             <img
//               src="https://imgs.search.brave.com/Wh-hNkFK_fnS4KI92EcbNRT1Xy2oYVmyh1BlfXbaLk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lNC9OYXRpb25h/bF9Vbml2ZXJzaXR5/X29mX0NvbXB1dGVy/X2FuZF9FbWVyZ2lu/Z19TY2llbmNlc19s/b2dvLnBuZy81MTJw/eC1OYXRpb25hbF9V/bml2ZXJzaXR5X29m/X0NvbXB1dGVyX2Fu/ZF9FbWVyZ2luZ19T/Y2llbmNlc19sb2dv/LnBuZw"
//               alt="Client Logo"
//               className="w-32 grayscale hover:grayscale-0 transition duration-300"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="bg-gray-100 py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//             Why Choose PAKTEKHIRE?
//           </h2>
//           <Swiper
//             modules={[Pagination, Navigation, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             pagination={{ clickable: true }}
//             // navigation
//             autoplay={{ delay: 5000 }}
//             loop
//             className="mySwiper"
//           >
//             {/* Slide 1 */}
//             <SwiperSlide>
//               <div className="bg-[#1E3A8A] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-semibold mb-4">Hire Top Talent</h3>
//                   <p className="text-lg">
//                     Access a vast network of skilled professionals in fields like design, development, marketing, and more. Find the perfect match for your project.
//                   </p>
//                 </div>
//                 <div className="flex-1">
//                   <img
//                     src="https://cdn.create.vista.com/api/media/small/277139068/stock-photo-selective-focus-wooden-cubes-bearded-recruiter-office"
//                     alt="Hire Talent"
//                     className="rounded-lg shadow-md"
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//             {/* Slide 2 */}
//             <SwiperSlide>
//               <div className="bg-[#065F46] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-semibold mb-4">Post Jobs Easily</h3>
//                   <p className="text-lg">
//                     Create and manage job posts in minutes. Our platform ensures your job reaches the right freelancers quickly and efficiently.
//                   </p>
//                 </div>
//                 <div className="flex-1">
//                   <img
//                     src="https://media.istockphoto.com/id/1445439274/photo/human-icon-print-screen-on-wooden-cube-block-with-space-for-human-resource-management-and.jpg?s=612x612&w=0&k=20&c=phzGqciihp_hRuOwbGGZGsWDvhQNrXAaie342I733mM="
//                     alt="Post Jobs"
//                     className="rounded-lg shadow-md"
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//             {/* Slide 3 */}
//             <SwiperSlide>
//               <div className="bg-[#F59E0B] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
//                   <p className="text-lg">
//                     Enjoy peace of mind with our secure payment system. We ensure fair transactions and provide dispute resolution for both clients and freelancers.
//                   </p>
//                 </div>
//                 <div className="flex-1">
//                   <img
//                     src="https://media.istockphoto.com/id/1395523535/vector/projection-of-a-credit-card-on-background-of-a-billboard-money-and-payment-target-page-for.jpg?s=612x612&w=0&k=20&c=6KOmtlXkg8De-FAUgavU6dcm-6KQ78jQG_DzIfxSOSg="
//                     alt="Secure Payments"
//                     className="rounded-lg shadow-md"
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//           </Swiper>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//             What Our Users Say
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
//               <p className="text-gray-600 mb-4">
//                 "PAKTEKHIRE has transformed the way we hire talent. The platform is easy to use and the quality of freelancers is exceptional."
//               </p>
//               <p className="text-gray-800 font-semibold">- Ali Raza, CEO TechSolutions</p>
//             </div>
//             <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
//               <p className="text-gray-600 mb-4">
//                 "I found my dream job through PAKTEKHIRE. The process was seamless and the support team was very helpful."
//               </p>
//               <p className="text-gray-800 font-semibold">- Ayesha Khan, Freelance Designer</p>
//             </div>
//             <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
//               <p className="text-gray-600 mb-4">
//                 "The secure payment system and dispute resolution give me peace of mind when working with clients."
//               </p>
//               <p className="text-gray-800 font-semibold">- Bilal Ahmed, Freelance Developer</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
      
//     </div>
//   );
// };

// export default LandingPage;












import React from "react";
import { useEffect, useState } from "react";
import { FaSearch, FaUserTie, FaHandshake } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="font-sans">
       {/* Hero Section */}
       <section className="relative flex flex-col min-h-screen bg-white">
      {/* Background Image Carousel */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-20' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between relative z-10 flex-grow">
        {/* Left Content */}
        <div className="w-full md:w-1/2 md:pr-12 space-y-6 mb-10 md:mb-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Find the perfect <span className="text-green-600">professionals</span> for your business
          </h1>
          
          <p className="text-xl text-gray-600 max-w-xl">
            PakTekHire: Pakistan's trusted marketplace for connecting businesses with skilled freelancers and top tech talent.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md text-lg font-medium transition-all transform hover:scale-102 shadow-md">
              Find Talent
            </button>
            <button className="bg-white hover:bg-gray-100 text-green-700 border border-green-700 py-3 px-6 rounded-md text-lg font-medium transition-all transform hover:scale-102 shadow-sm">
              Post a Job
            </button>
          </div>
        </div>  
        
         {/* Right Side Image */}
        <div className="w-full md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Professionals working together" 
            className="rounded-lg shadow-xl object-cover w-full max-h-96"
          />
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-8 -left-4 md:-left-12 bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-2xl">93%</p>
                <p className="text-gray-600 text-sm">Client satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar Section */}
      <div className="bg-gray-50 w-full py-8 border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-2 flex flex-col sm:flex-row">
            <div className="flex-grow p-2">
              <input 
                type="text" 
                placeholder="Search for any tech skill..." 
                className="w-full px-4 py-3 text-gray-700 focus:outline-none"
              />
            </div>
            <button className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 m-2 rounded-md whitespace-nowrap transition-colors">
              Find Talent
            </button>
          </div>
        </div>
      </div>
    </section>
       {/* How It Works Section */}     
         <section className="bg-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
            How PAKTEKHIRE Works
           </h2>           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center">
               <FaSearch className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
               <h3 className="text-xl font-semibold mb-2">Find Talent</h3>
               <p className="text-gray-600">
                 Search for skilled freelancers across various industries in Pakistan.
               </p>
             </div>
             <div className="text-center">
               <FaHandshake className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
               <h3 className="text-xl font-semibold mb-2">Hire with Confidence</h3>
               <p className="text-gray-600">
                 Review profiles, portfolios, and ratings to find the perfect match.
               </p>
             </div>
             <div className="text-center">
               <FaUserTie className="text-5xl text-[#1E3A8A] mx-auto mb-4" />
               <h3 className="text-xl font-semibold mb-2">Get Work Done</h3>
               <p className="text-gray-600">
                 Collaborate seamlessly and achieve your goals together.
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* Featured Clients Section */}
      <section className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
             Trusted by Leading Companies in Pakistan
           </h2>
           <div className="flex justify-center space-x-12">
             <img
              src="https://imgs.search.brave.com/Wh-hNkFK_fnS4KI92EcbNRT1Xy2oYVmyh1BlfXbaLk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lNC9OYXRpb25h/bF9Vbml2ZXJzaXR5/X29mX0NvbXB1dGVy/X2FuZF9FbWVyZ2lu/Z19TY2llbmNlc19s/b2dvLnBuZy81MTJw/eC1OYXRpb25hbF9V/bml2ZXJzaXR5X29m/X0NvbXB1dGVyX2Fu/ZF9FbWVyZ2luZ19T/Y2llbmNlc19sb2dv/LnBuZw"
              alt="Client Logo"
              className="w-32 grayscale hover:grayscale-0 transition duration-300"
            />
            <img
              src="https://www.syslab.com/wp-content/uploads/2023/02/Logo_SYSLAB_ohneClaim_4c.svg"
              alt="Client Logo"
              className="w-32 grayscale hover:grayscale-0 transition duration-300"
            />
            <img
              src="https://imgs.search.brave.com/Wh-hNkFK_fnS4KI92EcbNRT1Xy2oYVmyh1BlfXbaLk8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lNC9OYXRpb25h/bF9Vbml2ZXJzaXR5/X29mX0NvbXB1dGVy/X2FuZF9FbWVyZ2lu/Z19TY2llbmNlc19s/b2dvLnBuZy81MTJw/eC1OYXRpb25hbF9V/bml2ZXJzaXR5X29m/X0NvbXB1dGVyX2Fu/ZF9FbWVyZ2luZ19T/Y2llbmNlc19sb2dv/LnBuZw"
              alt="Client Logo"
              className="w-32 grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
            Why Choose PAKTEKHIRE?
          </h2>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            loop={true}
            className="mySwiper"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="bg-[#1E3A8A] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">Hire Top Talent</h3>
                  <p className="text-lg">
                    Access a vast network of skilled professionals in fields like design, development, marketing, and more. Find the perfect match for your project.
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src="https://cdn.create.vista.com/api/media/small/277139068/stock-photo-selective-focus-wooden-cubes-bearded-recruiter-office"
                    alt="Hire Talent"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 2 */}
            <SwiperSlide>
              <div className="bg-[#065F46] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">Post Jobs Easily</h3>
                  <p className="text-lg">
                    Create and manage job posts in minutes. Our platform ensures your job reaches the right freelancers quickly and efficiently.
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src="https://media.istockphoto.com/id/1445439274/photo/human-icon-print-screen-on-wooden-cube-block-with-space-for-human-resource-management-and.jpg?s=612x612&w=0&k=20&c=phzGqciihp_hRuOwbGGZGsWDvhQNrXAaie342I733mM="
                    alt="Post Jobs"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 3 */}
            <SwiperSlide>
              <div className="bg-[#F59E0B] text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
                  <p className="text-lg">
                    Enjoy peace of mind with our secure payment system. We ensure fair transactions and provide dispute resolution for both clients and freelancers.
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src="https://media.istockphoto.com/id/1395523535/vector/projection-of-a-credit-card-on-background-of-a-billboard-money-and-payment-target-page-for.jpg?s=612x612&w=0&k=20&c=6KOmtlXkg8De-FAUgavU6dcm-6KQ78jQG_DzIfxSOSg="
                    alt="Secure Payments"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "PAKTEKHIRE has transformed the way we hire talent. The platform is easy to use and the quality of freelancers is exceptional."
              </p>
              <p className="text-gray-800 font-semibold">- Ali Raza, CEO TechSolutions</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "I found my dream job through PAKTEKHIRE. The process was seamless and the support team was very helpful."
              </p>
              <p className="text-gray-800 font-semibold">- Ayesha Khan, Freelance Designer</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "The secure payment system and dispute resolution give me peace of mind when working with clients."
              </p>
              <p className="text-gray-800 font-semibold">- Bilal Ahmed, Freelance Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};

export default LandingPage;






