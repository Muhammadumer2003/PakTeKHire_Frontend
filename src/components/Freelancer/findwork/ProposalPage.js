import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProposalPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('1 week');
  const [coverLetter, setCoverLetter] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charactersLeft, setCharactersLeft] = useState(3000);

  const auth = useSelector((store) => store.auth);
  const freelancerId = auth?.user?._id;
  const freelancerName = auth?.user?.fullname;

  // const GROQ_API_KEY="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"
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8008/jobs/${jobId}`,
          { withCredentials: true }
        );
        setJobDetails(response.data.job); // Adjust to match the response structure if needed
        await generateCoverLetter(response.data.job);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error fetching job details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const generateCoverLetter = async (job) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a professional cover letter writer. Generate a concise cover letter (within 3000 characters) tailored to the job description provided, introducing the freelancer as an experienced professional seeking to contribute to the project.'
            },
            {
              role: 'user',
              content: `Job Title: ${job.jobTitle}\nDescription: ${job.jobDescription}\nSkills Required: ${job.skills?.join(', ') || 'Not specified'}\nFreelancer ID: ${freelancerName}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const generatedText = data.choices[0].message.content.trim();
      if (generatedText.length <= 3000) {
        setCoverLetter(generatedText);
        setCharactersLeft(3000 - generatedText.length);
      } else {
        setCoverLetter(generatedText.slice(0, 3000));
        setCharactersLeft(0);
      }
    } catch (err) {
      console.error('Error generating cover letter:', err);
      setCoverLetter('Unable to generate cover letter. Please write your own.');
      setCharactersLeft(3000);
    }
  };

  const handleCoverLetterChange = (e) => {
    const text = e.target.value;
    if (text.length <= 3000) {
      setCoverLetter(text);
      setCharactersLeft(3000 - text.length);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!freelancerId) {
        throw new Error('Unauthorized: Please log in');
      }

      const formData = new FormData();
      formData.append('proposalText', proposalText);
      formData.append('bidAmount', bidAmount);
      formData.append('coverLetter', coverLetter);
      formData.append('estimatedDuration', estimatedDuration);

      for (let i = 0; i < attachments.length; i++) {
        formData.append('attachments', attachments[i]);
      }

      const response = await axios.post(
        `http://localhost:8008/api/proposals/${jobId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log('Proposal Submitted:', response?.data);
        navigate('/applied-jobs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit proposal');
      console.error('Error submitting proposal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Job Details Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{jobDetails?.jobTitle || 'Job Title'}</h1>
              <p className="text-green-600 font-medium mt-1">
                {jobDetails?.category || 'Category'} - {jobDetails?.expertise || 'Expertise Level'}
              </p>
              <p className="text-gray-500 text-sm mt-1">Posted {jobDetails?.createdAt ? new Date(jobDetails.createdAt).toLocaleDateString() : 'recently'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-700 font-medium">Budget: <span className="text-black">PKR {jobDetails?.budget || 'Not specified'}</span></p>
              <p className="text-gray-600 text-sm">{jobDetails?.jobType || 'Contract'}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <p className="text-gray-700 whitespace-pre-line">{jobDetails?.jobDescription || 'No description provided'}</p>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <h3 className="font-medium text-gray-800">Skills Required</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {jobDetails?.skills?.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              )) || <span className="text-gray-500 text-sm">No specific skills mentioned</span>}
            </div>
          </div>
        </div>

        {/* Proposal Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Submit a Proposal</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Terms Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Terms</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Your bid amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">PKR</span>
                    </div>
                    <input
                      type="number"
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is the full amount the client will see
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Estimated duration
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                  >
                    <option value="1 week">Less than 1 week</option>
                    <option value="1-2 weeks">1 to 2 weeks</option>
                    <option value="3-4 weeks">3 to 4 weeks</option>
                    <option value="1-3 months">1 to 3 months</option>
                    <option value="3+ months">More than 3 months</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Cover Letter Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Cover Letter</h3>
              <div className="mb-2">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  rows="8"
                  placeholder="Introduce yourself and explain why you're a good fit for this job..."
                  value={coverLetter}
                  onChange={handleCoverLetterChange}
                  required
                />
                <p className="text-xs text-gray-500 text-right mt-1">
                  {charactersLeft} characters left
                </p>
              </div>
            </div>
            
            {/* Additional Details Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Project approach
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  rows="4"
                  placeholder="Explain how you'll approach this project and your implementation strategy..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Attachments Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Attachments</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-green-600">Click to upload files</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PNG, JPG (Max 5 files)</p>
                  </div>
                </label>
                {attachments.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">{attachments.length} file(s) selected:</p>
                    <ul className="text-sm text-gray-600">
                      {Array.from(attachments).map((file, index) => (
                        <li key={index} className="mb-1 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end border-t border-gray-200 pt-6">
              <button
                type="button"
                className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Proposal'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;