import React, { useState } from 'react';
import axios from 'axios';

const PostJob = ({ onPostJob }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('Pakistan'); // Default location
  const [jobType, setJobType] = useState('Hourly');
  const [budget, setBudget] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tags, setTags] = useState([]); // Tags as an array
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!jobTitle || !jobDescription || !jobType || !budget) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    setIsLoading(true);

    try {
      // Prepare the job data
      const jobData = {
        jobTitle,
        location,
        jobType,
        budget: parseFloat(budget), // Ensure budget is a number
        jobDescription,
        tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated string to array
        proposals: '0', // Default value
        isVerified: false, // Default value
        spent: '0', // Default value
      };

      // Get the token from localStorage
      // Replace 'token' with your actual key

     

      // Send the job data to the backend API
      console.log('Sending job data:', jobData); // Log the job data
      const response = await axios.post('http://localhost:8008/client/jobs', jobData, {
       
        withCredentials: true,
      });
      console.log('Response:', response.data); // Log the response

      // Call the onPostJob function passed from parent (if needed)
      if (onPostJob) {
        onPostJob(response.data.job);
      }

      // Show success pop-up
      setShowSuccessPopup(true);

      // Hide the pop-up after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      // Clear form fields after successful submission
      setJobTitle('');
      setLocation('Pakistan');
      setJobType('Hourly');
      setBudget('');
      setJobDescription('');
      setTags([]);
    } catch (error) {
      console.error('Error posting job:', error);
      setError(error.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Build a responsive website"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Pakistan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="6"
            placeholder="Describe the job in detail..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="Hourly">Hourly</option>
            <option value="Fixed Price">Fixed Price</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., web development, frontend, responsive design"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">Separate tags with commas.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Posting Job...' : 'Post Job'}
        </button>
      </form>

      {/* Success Pop-up */}
      {showSuccessPopup && (
        <div className="fixed top-[8%] right-[45%] bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in">
          Job posted successfully!
        </div>
      )}
    </div>
  );
};

export default PostJob;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PostJob = ({ onPostJob }) => {
//   // Form state
//   const [jobTitle, setJobTitle] = useState('');
//   const [location, setLocation] = useState('Remote');
//   const [jobType, setJobType] = useState('Hourly');
//   const [budget, setBudget] = useState('');
//   const [hourlyRate, setHourlyRate] = useState({ min: '', max: '' });
//   const [duration, setDuration] = useState('Less than 1 month');
//   const [expertise, setExpertise] = useState('Entry Level');
//   const [jobDescription, setJobDescription] = useState('');
//   const [skills, setSkills] = useState('');
//   const [availableSkills, setAvailableSkills] = useState([
//     'React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Express', 
//     'MongoDB', 'SQL', 'Python', 'UI/UX Design', 'Responsive Design'
//   ]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [attachments, setAttachments] = useState([]);
//   const [questions, setQuestions] = useState(['']);
  
//   // UI state
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [step, setStep] = useState(1);
//   const [skillSearch, setSkillSearch] = useState('');

//   // Filter skills based on search
//   const filteredSkills = skillSearch 
//     ? availableSkills.filter(skill => 
//         skill.toLowerCase().includes(skillSearch.toLowerCase()) && 
//         !selectedSkills.includes(skill)
//       )
//     : [];

//   // Add a skill to selected skills
//   const addSkill = (skill) => {
//     if (!selectedSkills.includes(skill) && selectedSkills.length < 10) {
//       setSelectedSkills([...selectedSkills, skill]);
//       setSkillSearch('');
//     }
//   };

//   // Remove a skill from selected skills
//   const removeSkill = (skill) => {
//     setSelectedSkills(selectedSkills.filter(s => s !== skill));
//   };

//   // Add a screening question
//   const addQuestion = () => {
//     if (questions.length < 5) {
//       setQuestions([...questions, '']);
//     }
//   };

//   // Update a screening question
//   const updateQuestion = (index, value) => {
//     const newQuestions = [...questions];
//     newQuestions[index] = value;
//     setQuestions(newQuestions);
//   };

//   // Remove a screening question
//   const removeQuestion = (index) => {
//     if (questions.length > 1) {
//       const newQuestions = [...questions];
//       newQuestions.splice(index, 1);
//       setQuestions(newQuestions);
//     }
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (attachments.length + files.length <= 5) {
//       const newAttachments = files.map(file => ({
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         file: file
//       }));
//       setAttachments([...attachments, ...newAttachments]);
//     } else {
//       setError('Maximum 5 files allowed');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   // Remove an attachment
//   const removeAttachment = (index) => {
//     const newAttachments = [...attachments];
//     newAttachments.splice(index, 1);
//     setAttachments(newAttachments);
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + ' bytes';
//     else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
//     else return (bytes / 1048576).toFixed(1) + ' MB';
//   };

//   // Next step
//   const nextStep = () => {
//     // Basic validation
//     if (step === 1) {
//       if (!jobTitle || !jobDescription) {
//         setError('Please fill in the required fields');
//         return;
//       }
//     } else if (step === 2) {
//       if (jobType === 'Fixed Price' && !budget) {
//         setError('Please specify your budget');
//         return;
//       }
//       if (jobType === 'Hourly' && (!hourlyRate.min || !hourlyRate.max)) {
//         setError('Please specify hourly rate range');
//         return;
//       }
//     }
    
//     setError('');
//     setStep(step + 1);
//   };

//   // Previous step
//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   // Handle form submission


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate final step
//     if (selectedSkills.length === 0) {
//       setError('Please select at least one skill');
//       return;
//     }
  
//     setError('');
//     setIsLoading(true);
  
//     try {
//       // Prepare the job data
//       const jobData = {
//         jobTitle,
//         location,
//         jobType,
//         expertise,
//         duration,
//         budget: jobType === 'Fixed Price' ? parseFloat(budget) : null,
//         hourlyRate: jobType === 'Hourly' ? {
//           min: parseFloat(hourlyRate.min),
//           max: parseFloat(hourlyRate.max),
//         } : null,
//         jobDescription,
//         skills: selectedSkills,
//         screeningQuestions: questions.filter(q => q.trim() !== ''), // Ensure this is an array
//         proposals: 0,
//         isVerified: false,
//         spent: 0,
//       };
  
//       console.log('Sending job data:', jobData);
  
//       // Create FormData for file uploads
//       const formData = new FormData();
//       formData.append('jobData', JSON.stringify(jobData)); // Append jobData as a JSON string
//       attachments.forEach((attachment, index) => {
//         formData.append('attachments', attachment.file); // Append files
//       });
  
//       // Get the token from localStorage
//       const token = localStorage.getItem('token'); // Replace with your token key
  
//       // Send the job data to the backend API
//       const response = await axios.post('http://localhost:8008/client/jobs', formData, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`, // Add the token
//         },
//       });
  
//       console.log('Response:', response.data);
  
//       // Call the onPostJob function passed from parent (if needed)
//       if (onPostJob) {
//         onPostJob(response.data.job);
//       }
  
//       // Show success pop-up
//       setShowSuccessPopup(true);
  
//       // Hide the pop-up after 3 seconds
//       setTimeout(() => {
//         setShowSuccessPopup(false);
//         // Reset form and go back to step 1
//         resetForm();
//       }, 3000);
//     } catch (error) {
//       console.error('Error posting job:', error);
//       setError(error.response?.data?.message || 'Failed to post job. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setJobTitle('');
//     setLocation('Remote');
//     setJobType('Hourly');
//     setBudget('');
//     setHourlyRate({ min: '', max: '' });
//     setDuration('Less than 1 month');
//     setExpertise('Entry Level');
//     setJobDescription('');
//     setSelectedSkills([]);
//     setAttachments([]);
//     setQuestions(['']);
//     setStep(1);
//   };

//   // Form Steps
//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-800">Step 1: Job Details</h3>

//       {/* Job Title */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           placeholder="e.g., Build a responsive website"
//           value={jobTitle}
//           onChange={(e) => setJobTitle(e.target.value)}
//           required
//         />
//       </div>

//       {/* Job Description */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Job Description <span className="text-red-500">*</span></label>
//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           rows="8"
//           placeholder="Describe your job in detail. Include your goals, deliverables, and any specific requirements."
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           required
//         />
//         <p className="text-sm text-gray-500 mt-1">Minimum 50 characters. Be specific and detailed to attract the right freelancers.</p>
//       </div>

//       {/* Attachments */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Optional)</label>
//         <div className="border border-dashed border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors">
//           <div className="flex flex-col items-center justify-center">
//             <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//             </svg>
//             <p className="mt-1 text-sm text-gray-500">Drag and drop files here or</p>
//             <input
//               type="file"
//               id="file-upload"
//               multiple
//               className="hidden"
//               onChange={handleFileChange}
//               accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
//             />
//             <label
//               htmlFor="file-upload"
//               className="mt-2 cursor-pointer bg-white text-green-600 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50 transition-colors text-sm font-medium"
//             >
//               Choose Files
//             </label>
//             <p className="mt-1 text-xs text-gray-500">Max 5 files. PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 25MB each)</p>
//           </div>
//         </div>
        
//         {/* Attachment List */}
//         {attachments.length > 0 && (
//           <div className="mt-3">
//             <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
//             <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
//               {attachments.map((file, index) => (
//                 <li key={index} className="px-4 py-3 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//                     </svg>
//                     <div>
//                       <p className="text-sm font-medium text-gray-800 truncate" style={{maxWidth: "200px"}}>{file.name}</p>
//                       <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeAttachment(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                     </svg>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-800">Step 2: Project Details</h3>

//       {/* Job Type */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">How do you want to pay? <span className="text-red-500">*</span></label>
//         <div className="grid grid-cols-2 gap-4">
//           <button
//             type="button"
//             className={`py-3 px-4 border ${jobType === 'Hourly' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md flex flex-col items-start justify-center`}
//             onClick={() => setJobType('Hourly')}
//           >
//             <span className="text-sm font-medium">Pay by the hour</span>
//             <span className="text-xs text-gray-500">Pay hourly for ongoing work or when project duration is uncertain</span>
//           </button>
//           <button
//             type="button"
//             className={`py-3 px-4 border ${jobType === 'Fixed Price' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md flex flex-col items-start justify-center`}
//             onClick={() => setJobType('Fixed Price')}
//           >
//             <span className="text-sm font-medium">Pay a fixed price</span>
//             <span className="text-xs text-gray-500">Pay a fixed price for clearly defined deliverables</span>
//           </button>
//         </div>
//       </div>

//       {/* Hourly Rate Range */}
//       {jobType === 'Hourly' && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate Range <span className="text-red-500">*</span></label>
//           <div className="flex items-center space-x-4">
//             <div className="relative w-full">
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
//               <input
//                 type="number"
//                 className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Min"
//                 value={hourlyRate.min}
//                 onChange={(e) => setHourlyRate({...hourlyRate, min: e.target.value})}
//                 min="1"
//                 required={jobType === 'Hourly'}
//               />
//             </div>
//             <span className="text-gray-500">to</span>
//             <div className="relative w-full">
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
//               <input
//                 type="number"
//                 className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Max"
//                 value={hourlyRate.max}
//                 onChange={(e) => setHourlyRate({...hourlyRate, max: e.target.value})}
//                 min={hourlyRate.min || 1}
//                 required={jobType === 'Hourly'}
//               />
//             </div>
//             <span className="text-gray-500">/hr</span>
//           </div>
//           <p className="text-sm text-gray-500 mt-1">The average hourly rate for similar jobs is $15-25/hr</p>
//         </div>
//       )}

//       {/* Fixed Price Budget */}
//       {jobType === 'Fixed Price' && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Budget <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
//             <input
//               type="number"
//               className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., 500"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               min="5"
//               required={jobType === 'Fixed Price'}
//             />
//           </div>
//           <p className="text-sm text-gray-500 mt-1">Set a reasonable budget to attract quality freelancers</p>
//         </div>
//       )}

//       {/* Project Duration */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Expected Duration <span className="text-red-500">*</span></label>
//         <select
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           required
//         >
//           <option value="Less than 1 month">Less than 1 month</option>
//           <option value="1 to 3 months">1 to 3 months</option>
//           <option value="3 to 6 months">3 to 6 months</option>
//           <option value="More than 6 months">More than 6 months</option>
//         </select>
//       </div>

//       {/* Expertise Level */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level <span className="text-red-500">*</span></label>
//         <div className="grid grid-cols-3 gap-3">
//           <button
//             type="button"
//             className={`py-2 px-3 border ${expertise === 'Entry Level' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md text-sm`}
//             onClick={() => setExpertise('Entry Level')}
//           >
//             Entry Level
//           </button>
//           <button
//             type="button"
//             className={`py-2 px-3 border ${expertise === 'Intermediate' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md text-sm`}
//             onClick={() => setExpertise('Intermediate')}
//           >
//             Intermediate
//           </button>
//           <button
//             type="button"
//             className={`py-2 px-3 border ${expertise === 'Expert' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md text-sm`}
//             onClick={() => setExpertise('Expert')}
//           >
//             Expert
//           </button>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">This helps match your job with freelancers of the right experience level</p>
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
//         <select
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         >
//           <option value="Remote">Remote (Anywhere)</option>
//           <option value="United States">United States</option>
//           <option value="United Kingdom">United Kingdom</option>
//           <option value="Canada">Canada</option>
//           <option value="Australia">Australia</option>
//           <option value="India">India</option>
//           <option value="Pakistan">Pakistan</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-800">Step 3: Skills and Questions</h3>

//       {/* Skills */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required <span className="text-red-500">*</span></label>
//         <div className="relative">
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="Search for skills..."
//             value={skillSearch}
//             onChange={(e) => setSkillSearch(e.target.value)}
//           />
//           {filteredSkills.length > 0 && (
//             <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-40 overflow-y-auto">
//               {filteredSkills.map((skill, index) => (
//                 <div
//                   key={index}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => addSkill(skill)}
//                 >
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {selectedSkills.length > 0 && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {selectedSkills.map((skill, index) => (
//               <div key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
//                 {skill}
//                 <button
//                   type="button"
//                   className="ml-1 focus:outline-none"
//                   onClick={() => removeSkill(skill)}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <p className="text-sm text-gray-500 mt-1">Choose up to 10 skills that best describe your job requirements</p>
//       </div>

//       {/* Screening Questions */}
//       <div>
//         <div className="flex justify-between items-center mb-2">
//           <label className="block text-sm font-medium text-gray-700">Screening Questions (Optional)</label>
//           {questions.length < 5 && (
//             <button
//               type="button"
//               onClick={addQuestion}
//               className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
//             >
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//               Add Question
//             </button>
//           )}
//         </div>
//         <div className="space-y-3">
//           {questions.map((question, index) => (
//             <div key={index} className="relative">
//               <textarea
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 rows="2"
//                 placeholder={`Question ${index + 1} (e.g., What experience do you have with similar projects?)`}
//                 value={question}
//                 onChange={(e) => updateQuestion(index, e.target.value)}
//               />
//               {questions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeQuestion(index)}
//                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         <p className="text-sm text-gray-500 mt-1">Add questions to help identify the best freelancers (up to 5)</p>
//       </div>
//     </div>
//   );

//   // Render Summary before posting
//   const renderSummary = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-800">Review Job Details</h3>

//       <div className="bg-gray-50 rounded-lg p-4 space-y-4">
//         <div>
//           <h4 className="text-sm font-medium text-gray-500">Job Title</h4>
//           <p className="text-base text-gray-800">{jobTitle}</p>
//         </div>

//         <div>
//           <h4 className="text-sm font-medium text-gray-500">Job Type</h4>
//           <p className="text-base text-gray-800">
//             {jobType === 'Hourly' 
//               ? `Hourly: $${hourlyRate.min} - $${hourlyRate.max}/hr` 
//               : `Fixed Price: $${budget}`
//             }
//           </p>
//         </div>

//         <div>
//           <h4 className="text-sm font-medium text-gray-500">Duration & Expertise</h4>
//           <p className="text-base text-gray-800">{duration} • {expertise}</p>
//         </div>

//         <div>
//           <h4 className="text-sm font-medium text-gray-500">Skills Required</h4>
//           <div className="flex flex-wrap gap-2 mt-1">
//             {selectedSkills.map((skill, index) => (
//               <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm">
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="text-sm font-medium text-gray-500">Job Description</h4>
//           <p className="text-base text-gray-800 whitespace-pre-line">
//             {jobDescription.length > 200 
//               ? jobDescription.substring(0, 200) + '...' 
//               : jobDescription
//             }
//           </p>
//         </div>

//         {attachments.length > 0 && (
//           <div>
//             <h4 className="text-sm font-medium text-gray-500">Attachments</h4>
//             <p className="text-base text-gray-800">{attachments.length} files attached</p>
//           </div>
//         )}

//         {questions.filter(q => q.trim() !== '').length > 0 && (
//           <div>
//             <h4 className="text-sm font-medium text-gray-500">Screening Questions</h4>
//             <p className="text-base text-gray-800">{questions.filter(q => q.trim() !== '').length} questions added</p>
//           </div>
//         )}
//       </div>

//       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-yellow-700">
//               You will not be able to edit core job details after posting. Please review carefully.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post a Job</h2>
      
//       {/* Step Indicator */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center">
//           <div className="flex space-x-2">
//             {[1, 2, 3, 4].map((num) => (
//               <div
//                 key={num}
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                   step === num
//                     ? 'bg-green-600 text-white'
//                     : 'bg-gray-100 text-gray-500'
//                 }`}
//               >
//                 {num}
//               </div>
//             ))}
//           </div>
//           <p className="text-sm text-gray-500">Step {step} of 4</p>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg
//                 className="h-5 w-5 text-red-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Form Steps */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {step === 1 && renderStep1()}
//         {step === 2 && renderStep2()}
//         {step === 3 && renderStep3()}
//         {step === 4 && renderSummary()}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between">
//           {step > 1 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
//             >
//               Previous
//             </button>
//           )}
//           {step < 4 ? (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
//             >
//               {isLoading ? 'Posting Job...' : 'Post Job'}
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Success Pop-up */}
//       {showSuccessPopup && (
//         <div className="fixed top-[8%] right-[45%] bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in">
//           Job posted successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostJob;
