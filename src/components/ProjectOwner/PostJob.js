import React, { useState } from 'react';
import axios from 'axios';

const PostJob = ({ onPostJob }) => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [jobType, setJobType] = useState('hourly');
  const [experienceLevel, setExperienceLevel] = useState('entry');
  const [projectScope, setProjectScope] = useState('small');
  const [duration, setDuration] = useState('less_than_1_month');
  const [budget, setBudget] = useState({ min: '', max: '' });
  const [fixedBudget, setFixedBudget] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [location, setLocation] = useState('worldwide');
  const [languages, setLanguages] = useState([]);
  const [screeningQuestions, setScreeningQuestions] = useState(['']);
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const categories = [
    { id: 'web_dev', name: 'Web Development', subcategories: ['Frontend', 'Backend', 'Full Stack'] },
    { id: 'mobile_dev', name: 'Mobile Development', subcategories: ['iOS', 'Android', 'Cross-Platform'] },
    { id: 'design', name: 'Design', subcategories: ['UI Design', 'UX Design', 'Graphic Design'] },
  ];

  const suggestedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML', 'CSS',
    'Angular', 'Vue.js', 'TypeScript', 'PHP', 'Laravel', 'MongoDB'
  ];

  const handleAddSkill = (skill) => {
    if (!skills.includes(skill) && skills.length < 10) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddQuestion = () => {
    if (screeningQuestions.length < 5) {
      setScreeningQuestions([...screeningQuestions, '']);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...screeningQuestions];
    newQuestions[index] = value;
    setScreeningQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = screeningQuestions.filter((_, i) => i !== index);
    setScreeningQuestions(newQuestions);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (attachments.length + files.length <= 5) {
      setAttachments([...attachments, ...files]);
    }
  };

  const handleRemoveFile = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!jobTitle || !jobDescription || !category) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
      case 2:
        if (jobType === 'hourly') {
          if (!budget.min || !budget.max || budget.min === '' || budget.max === '') {
            setError('Please specify a valid hourly rate range');
            return false;
          }
          const min = parseFloat(budget.min);
          const max = parseFloat(budget.max);
          if (isNaN(min) || isNaN(max) || min > max || min <= 0 || max <= 0) {
            setError('Hourly rate range must be valid numbers with min <= max and both > 0');
            return false;
          }
        } else if (jobType === 'fixed') {
          if (!fixedBudget || fixedBudget === '') {
            setError('Please specify a valid fixed budget');
            return false;
          }
          const fixed = parseFloat(fixedBudget);
          if (isNaN(fixed) || fixed <= 0) {
            setError('Fixed budget must be a valid positive number greater than 0');
            return false;
          }
        }
        break;
      case 3:
        if (skills.length === 0) {
          setError('Please add at least one required skill');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      let validatedBudget;
      if (jobType === 'hourly') {
        const minValue = Number(budget.min);
        const maxValue = Number(budget.max);
        if (isNaN(minValue) || isNaN(maxValue) || minValue > maxValue || minValue <= 0 || maxValue <= 0) {
          throw new Error('Invalid hourly rate range');
        }
        validatedBudget = { min: minValue, max: maxValue };
      } else {
        const fixedValue = Number(fixedBudget);
        if (isNaN(fixedValue) || fixedValue <= 0) {
          throw new Error('Invalid fixed budget');
        }
        validatedBudget = fixedValue;
      }

      const jobData = {
        title: jobTitle.trim(),
        description: jobDescription.trim(),
        category: category || undefined,
        subCategory: subCategory || undefined,
        jobType: jobType || 'hourly',
        experienceLevel: experienceLevel || 'entry',
        projectScope: projectScope || 'small',
        duration: duration || 'less_than_1_month',
        budget: validatedBudget,
        skills: skills.filter(Boolean),
        location: location || 'worldwide',
        languages: languages.filter(Boolean),
        screeningQuestions: screeningQuestions.filter(q => q.trim()),
        createdAt: new Date().toISOString(),
        proposals: 0,
        isVerified: false,
        spent: 0
      };

      // Enhanced logging
      console.log('Final Job Data:', JSON.stringify(jobData, null, 2));
      console.log('Job Type:', jobType);
      console.log('Budget:', validatedBudget);
      console.log('Budget Type:', typeof validatedBudget);
      if (jobType === 'hourly') {
        console.log('Min Value:', validatedBudget.min, 'Type:', typeof validatedBudget.min);
        console.log('Max Value:', validatedBudget.max, 'Type:', typeof validatedBudget.max);
      }

      Object.keys(jobData).forEach(key => {
        if (jobData[key] === undefined) {
          delete jobData[key];
        }
      });

      const formData = new FormData();
      formData.append('jobData', JSON.stringify(jobData));
      attachments.forEach((file, index) => {
        formData.append('attachments', file);
      });

      console.log('Sending FormData Entries:', [...formData.entries()]);

      const response = await axios.post('http://51.21.200.232:8008/client/jobs', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response.data);

      if (onPostJob) {
        onPostJob(response.data.job);
      }

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Tell us what you need done</h3>
        <p className="text-gray-600 mt-1">This helps us match you with the right talent.</p>
      </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose a name for your job post <span className="text-red-500">*</span>
        </label>
          <input
            type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
          placeholder="e.g. Build a responsive WordPress site"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose a category <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {category && (
          <select
            className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Select a subcategory</option>
            {categories.find(cat => cat.id === category)?.subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe your job <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
          rows="8"
          placeholder="Start with a bit about your business and your project goals. Be as specific as you can about what you need."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Be descriptive</span>
          <span>{jobDescription.length}/5000</span>
        </div>
      </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload relevant files (optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-[#14a800] hover:text-[#14a800]/80">
              Choose Files
            </div>
            <p className="text-sm text-gray-500 mt-1">or drag and drop files here</p>
            <p className="text-xs text-gray-400 mt-1">Maximum file size: 100 MB</p>
          </label>
        </div>
        {attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Tell us about your budget</h3>
        <p className="text-gray-600 mt-1">This will help us match you with talent within your range.</p>
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How would you like to pay? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`p-4 border rounded-lg text-left ${
              jobType === 'hourly'
                ? 'border-[#14a800] bg-[#14a800]/5'
                : 'border-gray-300'
            }`}
            onClick={() => setJobType('hourly')}
          >
            <div className="font-medium">Pay by the hour</div>
            <div className="text-sm text-gray-500 mt-1">Pay hourly to easily scale up and down.</div>
          </button>
          <button
            type="button"
            className={`p-4 border rounded-lg text-left ${
              jobType === 'fixed'
                ? 'border-[#14a800] bg-[#14a800]/5'
                : 'border-gray-300'
            }`}
            onClick={() => setJobType('fixed')}
          >
            <div className="font-medium">Pay a fixed price</div>
            <div className="text-sm text-gray-500 mt-1">Pay by the project and release payment on milestones.</div>
          </button>
        </div>
        </div>

      {jobType === 'hourly' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly rate range <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
                placeholder="Min"
                value={budget.min}
                onChange={(e) => setBudget({ ...budget, min: e.target.value })}
                min="1"
                step="0.01"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
                placeholder="Max"
                value={budget.max}
                onChange={(e) => setBudget({ ...budget, max: e.target.value })}
                min="1"
                step="0.01"
              />
            </div>
            <span className="text-gray-500">/hr</span>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
              placeholder="Enter your budget"
              value={fixedBudget}
              onChange={(e) => setFixedBudget(e.target.value)}
              min="1"
              step="0.01"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected project duration <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="less_than_1_month">Less than 1 month</option>
          <option value="1_to_3_months">1 to 3 months</option>
          <option value="3_to_6_months">3 to 6 months</option>
          <option value="more_than_6_months">More than 6 months</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience level <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['entry', 'intermediate', 'expert'].map((level) => (
            <button
              key={level}
              type="button"
              className={`p-3 border rounded-lg text-center ${
                experienceLevel === level
                  ? 'border-[#14a800] bg-[#14a800]/5'
                  : 'border-gray-300'
              }`}
              onClick={() => setExperienceLevel(level)}
            >
              <div className="font-medium capitalize">{level}</div>
              <div className="text-sm text-gray-500 mt-1">
                {level === 'entry' && '$ Entry Level'}
                {level === 'intermediate' && '$$ Intermediate'}
                {level === 'expert' && '$$$ Expert'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">What skills are required?</h3>
        <p className="text-gray-600 mt-1">Add skills that best describe your project requirements.</p>
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search or add up to 10 skills <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
            placeholder="Type to search skills..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          {skillInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestedSkills
                .filter(skill => 
                  skill?.toLowerCase().includes(skillInput?.toLowerCase()) &&
                  !skills?.includes(skill)
                )
                .map((skill, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#14a800]/10 text-[#14a800]"
              >
                {skill}
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Screening questions (Optional)
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Add up to 5 questions to help you screen candidates.
        </p>
        {screeningQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-start">
              <textarea
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
                rows="2"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              {screeningQuestions.length > 1 && (
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
        {screeningQuestions.length < 5 && (
        <button
            type="button"
            className="text-[#14a800] hover:text-[#14a800]/80 text-sm font-medium"
            onClick={handleAddQuestion}
          >
            + Add a question
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred location (Optional)
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="worldwide">Worldwide</option>
          <option value="us_only">United States Only</option>
          <option value="uk_only">United Kingdom Only</option>
          <option value="pakistan">Pakistan</option>
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Review your job post</h3>
        <p className="text-gray-600 mt-1">Make sure everything looks good before posting.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">{jobTitle}</h4>
          <p className="text-sm text-gray-500 mt-1">{category} - {subCategory}</p>
        </div>

        <div className="prose max-w-none text-gray-600">
          {jobDescription}
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Experience Level</div>
            <div className="font-medium capitalize">{experienceLevel}</div>
          </div>
          <div>
            <div className="text-gray-500">Project Duration</div>
            <div className="font-medium">{duration.replace(/_/g, ' ')}</div>
          </div>
          <div>
            <div className="text-gray-500">Budget</div>
            <div className="font-medium">
              {jobType === 'hourly'
                ? `$${budget.min} - $${budget.max}/hr`
                : `$${fixedBudget} Fixed Price`
              }
            </div>
          </div>
          <div>
            <div className="text-gray-500">Location</div>
            <div className="font-medium capitalize">{location.replace(/_/g, ' ')}</div>
          </div>
        </div>

        {attachments.length > 0 && (
          <div>
            <div className="text-gray-500 text-sm mb-2">Attachments</div>
            <div className="space-y-1">
              {attachments.map((file, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {screeningQuestions.filter(q => q.trim()).length > 0 && (
          <div>
            <div className="text-gray-500 text-sm mb-2">Screening Questions</div>
            <div className="space-y-2">
              {screeningQuestions
                .filter(q => q.trim())
                .map((question, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {index + 1}. {question}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {['Job Details', 'Budget', 'Skills', 'Review'].map((label, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${
                step > index ? 'text-[#14a800]' : 'text-gray-500'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#14a800] rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={step === 4 ? handleSubmit : handleNext}
            className="ml-auto px-6 py-2 bg-[#14a800] text-white rounded-md hover:bg-[#14a800]/90"
            disabled={isLoading}
          >
            {isLoading
              ? 'Posting...'
              : step === 4
              ? 'Post Job'
              : 'Continue'}
        </button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          Job posted successfully!
        </div>
      )}
    </div>
  );
};

export default PostJob;