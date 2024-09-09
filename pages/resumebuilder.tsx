import React, { useState } from 'react';
import axios from 'axios';
import '../app/globals.css';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''; 
const API_URL = 'https://api.openai.com/v1/completions';

const generateContent = async (prompt: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

const Resumebuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    portfolio: '',
    jobTitle: '',
    experience: '',
    skills: '',
    education: [{ schoolName: '', year: '', degree: '', gpa: '' }],
    projects: [{ title: '', date: '', description: '' }],
    workExperience: [{ companyName: '', role: '', startYear: '', endYear: '', currentlyWorking: false, description: '' }],
  });

  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, section?: string) => {
    const { name, value, type, checked } = e.target;

    if (section === 'education' && index !== undefined) {
      const updatedEducation = [...formData.education];
      updatedEducation[index] = { ...updatedEducation[index], [name]: value };
      setFormData(prevState => ({
        ...prevState,
        education: updatedEducation,
      }));
    } else if (section === 'projects' && index !== undefined) {
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = { ...updatedProjects[index], [name]: value };
      setFormData(prevState => ({
        ...prevState,
        projects: updatedProjects,
      }));
    } else if (section === 'workExperience' && index !== undefined) {
      const updatedWorkExperience = [...formData.workExperience];
      updatedWorkExperience[index] = { ...updatedWorkExperience[index], [name]: type === 'checkbox' ? checked : value };
      setFormData(prevState => ({
        ...prevState,
        workExperience: updatedWorkExperience,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddSection = (section: string) => {
    if (section === 'education') {
      setFormData(prevState => ({
        ...prevState,
        education: [...prevState.education, { schoolName: '', year: '', degree: '', gpa: '' }]
      }));
    } else if (section === 'projects') {
      setFormData(prevState => ({
        ...prevState,
        projects: [...prevState.projects, { title: '', date: '', description: '' }]
      }));
    } else if (section === 'workExperience') {
      setFormData(prevState => ({
        ...prevState,
        workExperience: [...prevState.workExperience, { companyName: '', role: '', startYear: '', endYear: '', currentlyWorking: false, description: '' }]
      }));
    }
  };

  const handleGenerate = async () => {
    const { firstName, lastName, phoneNumber, email, portfolio, jobTitle, experience, skills, education, projects, workExperience } = formData;
    if (!firstName || !lastName || !phoneNumber || !email || !jobTitle || !experience || !skills) {
      alert('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Create a professional ATS-friendly resume for ${firstName} ${lastName}, 
      Phone: ${phoneNumber}, Email: ${email}, Portfolio: ${portfolio ? portfolio : 'N/A'}, 
      Job Title: ${jobTitle}, Experience: ${experience}, Skills: ${skills}. 
      The resume should be structured with a summary, work experience, skills, and education. 
      Education Details: ${education.map(e => `School: ${e.schoolName}, Year: ${e.year}, Degree: ${e.degree}, GPA: ${e.gpa}`).join('; ')}. 
      Projects: ${projects.map(p => `Title: ${p.title}, Date: ${p.date}, Description: ${p.description}`).join('; ')}. 
      Work Experience: ${workExperience.map(w => `Company: ${w.companyName}, Role: ${w.role}, Start Year: ${w.startYear}, End Year: ${w.endYear ? w.endYear : 'Present'}, Currently Working: ${w.currentlyWorking ? 'Yes' : 'No'}, Description: ${w.description}`).join('; ')}.`;

      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;

    const blob = new Blob([generatedContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${formData.firstName}_${formData.lastName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="container mx-auto text-start px-4">
        <h2 className="text-2xl font-semibold text-left mt-10 mb-6 text-gray-800">
          Craft Your Professional Resume with AI Effortlessly
        </h2>
        <p className="text-lg mb-6 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent text-left">
          Input your career details to get a professionally crafted resume tailored to your needs. This AI-powered tool enhances your resume with personalized content to boost your career prospects.
        </p>

        {!showForm && (
          <div className="flex justify-Start">
            <button
              onClick={() => setShowForm(true)}
              className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-200"
            >
              Create Resume
            </button>
          </div>
        )}

        {showForm && (
          <div>
             <h3 className="text-xl font-bold mt-8 mb-4">Enter Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-lg font-medium mb-2">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-lg font-medium mb-2">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="portfolio" className="block text-lg font-medium mb-2">Portfolio Link (optional)</label>
                <input
                  id="portfolio"
                  name="portfolio"
                  type="text"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-lg font-medium mb-2">Job Title</label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="experience" className="block text-lg font-medium mb-2">Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="skills" className="block text-lg font-medium mb-2">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-8">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-lg font-medium mb-2">School Name</label>
                  <input
                    name="schoolName"
                    type="text"
                    value={edu.schoolName}
                    onChange={(e) => handleChange(e, index, 'education')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Year</label>
                  <input
                    name="year"
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleChange(e, index, 'education')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Degree</label>
                  <input
                    name="degree"
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, index, 'education')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">GPA</label>
                  <input
                    name="gpa"
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => handleChange(e, index, 'education')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddSection('education')}
              className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44  hover:bg-gray-200  mt-4 rounded"
            >
              Add Education
            </button>

            <h3 className="text-xl font-bold mt-8">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-lg font-medium mb-2">Project Title</label>
                  <input
                    name="title"
                    type="text"
                    value={project.title}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Date</label>
                  <input
                    name="date"
                    type="text"
                    value={project.date}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-lg font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={project.description}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddSection('projects')}
              className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 hover:bg-gray-200 mt-4 rounded"
            >
              Add Project
            </button>

            <h3 className="text-xl font-bold mt-8">Work Experience</h3>
            {formData.workExperience.map((work, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-lg font-medium mb-2">Company Name</label>
                  <input
                    name="companyName"
                    type="text"
                    value={work.companyName}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Role</label>
                  <input
                    name="role"
                    type="text"
                    value={work.role}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Start Year</label>
                  <input
                    name="startYear"
                    type="text"
                    value={work.startYear}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">End Year</label>
                  <input
                    name="endYear"
                    type="text"
                    value={work.endYear}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-start">
                <input
                    type="checkbox"
                    name="currentlyWorking"
                    checked={work.currentlyWorking}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="ml-2"
                  />
                  <label className="text-lg ml-2 font-medium">Currently Working</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-lg font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={work.description}
                    onChange={(e) => handleChange(e, index, 'workExperience')}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddSection('workExperience')}
              className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 hover:bg-gray-200 mt-4 rounded"
            >
              Add Experience
            </button>

            <div className="mt-8 flex items-center justify-center ">
              <button
                onClick={handleGenerate}
                className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Resume'}
              </button>
            </div>
          </div>
        )}

        {generatedContent && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold">Generated Resume:</h3>
            <pre className="whitespace-pre-wrap mt-4 p-4 border border-gray-300 bg-gray-100 rounded">
              {generatedContent}
            </pre>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumebuilder;
