import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const isCandidate = user?.role === "candidate";
  const isRecruiter = user?.role === "recruiter";

  // Mock data for demonstration
  const [candidateData, setCandidateData] = useState({
    resumeText: "",
    jobDescription: "",
    analysisResult: null,
    isAnalyzing: false,
    history: [
      { date: "2024-01-15", score: 85, position: "Senior Developer" },
      { date: "2024-01-10", score: 78, position: "Frontend Developer" },
      { date: "2024-01-05", score: 92, position: "Full Stack Developer" }
    ],
    stats: {
      totalAnalyzed: 12,
      averageScore: 85,
      bestScore: 95
    }
  });

  const [recruiterData, setRecruiterData] = useState({
    resumes: [],
    jobDescription: "",
    isAnalyzing: false,
    results: [
      { name: "John Doe", score: 92, skills: ["React", "Node.js", "TypeScript"], missing: ["GraphQL"] },
      { name: "Jane Smith", score: 88, skills: ["Vue.js", "Python", "Django"], missing: ["AWS"] },
      { name: "Mike Johnson", score: 85, skills: ["Angular", "Java", "Spring"], missing: ["Docker"] },
      { name: "Sarah Williams", score: 90, skills: ["React", "GraphQL", "AWS"], missing: [] }
    ]
  });

  const handleAnalyzeResume = () => {
    if (!candidateData.resumeText || !candidateData.jobDescription) {
      alert("Please upload resume and enter job description");
      return;
    }

    setCandidateData(prev => ({ ...prev, isAnalyzing: true }));

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        finalScore: 87,
        breakdown: {
          overallMatch: 87,
          skillMatch: 92,
          experience: 82
        },
        matchingSkills: ["React", "JavaScript", "TypeScript", "Node.js", "MongoDB"],
        missingSkills: ["GraphQL", "AWS", "Docker"],
        suggestions: [
          "Add GraphQL experience to your resume",
          "Consider getting AWS certification",
          "Include more project descriptions with quantifiable results",
          "Highlight your experience with microservices architecture"
        ],
        highlightedResume: candidateData.resumeText
      };

      setCandidateData(prev => ({
        ...prev,
        analysisResult: mockResult,
        isAnalyzing: false
      }));
    }, 2000);
  };

  const handleRecruiterAnalysis = () => {
    if (!recruiterData.jobDescription) {
      alert("Please enter job description");
      return;
    }

    setRecruiterData(prev => ({ ...prev, isAnalyzing: true }));

    // Simulate API call
    setTimeout(() => {
      setRecruiterData(prev => ({ ...prev, isAnalyzing: false }));
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCandidateData(prev => ({ ...prev, resumeText: e.target.result }));
      };
      reader.readAsText(file);
    }
  };

  const handleMultipleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newResumes = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      content: `Resume content for ${file.name}`,
      score: Math.floor(Math.random() * 30) + 70
    }));
    
    setRecruiterData(prev => ({
      ...prev,
      resumes: [...prev.resumes, ...newResumes]
    }));
  };

  const renderSidebar = () => (
    <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💼</span>
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-gray-900">SmartHire</span>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {isSidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveTab("analysis")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "analysis" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {isSidebarOpen && <span>{isCandidate ? "Resume Analysis" : "Candidate Analysis"}</span>}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "history" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isSidebarOpen && <span>History</span>}
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "stats" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a3 3 0 003 3h0a3 3 0 003-3v-1m3-10V4a3 3 0 00-3-3h0a3 3 0 00-3 3v3m0 10h6m-6 0h6" />
            </svg>
            {isSidebarOpen && <span>Statistics</span>}
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-sm">
              {user?.fullName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </span>
          </div>
          {isSidebarOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCandidateDashboard = () => {
    if (activeTab === "dashboard") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName || user?.email}!</h2>
            <p className="text-blue-100">Ready to optimize your resume for your dream job?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{candidateData.stats.totalAnalyzed}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Total Analyzed</h3>
              <p className="text-sm text-gray-600">Resumes analyzed</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{candidateData.stats.averageScore}%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Average Score</h3>
              <p className="text-sm text-gray-600">Match percentage</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">{candidateData.stats.bestScore}%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Best Score</h3>
              <p className="text-sm text-gray-600">Highest match</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {candidateData.history.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.position}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      item.score >= 90 ? 'text-green-600' : 
                      item.score >= 80 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {item.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "analysis") {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                  </label>
                </div>
                {candidateData.resumeText && (
                  <p className="mt-2 text-sm text-green-600">✅ Resume uploaded successfully</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  value={candidateData.jobDescription}
                  onChange={(e) => setCandidateData(prev => ({ ...prev, jobDescription: e.target.value }))}
                  placeholder="Paste the job description here..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyzeResume}
              disabled={candidateData.isAnalyzing}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {candidateData.isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>

          {candidateData.analysisResult && (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Final ATS Score</h3>
                <div className="text-5xl font-bold mb-4">{candidateData.analysisResult.finalScore}%</div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mb-4">
                  <div 
                    className="bg-white rounded-full h-4 transition-all duration-500"
                    style={{ width: `${candidateData.analysisResult.finalScore}%` }}
                  ></div>
                </div>
                <p className="text-blue-100">
                  {candidateData.analysisResult.finalScore >= 90 ? 'Excellent match!' :
                   candidateData.analysisResult.finalScore >= 80 ? 'Good match!' :
                   candidateData.analysisResult.finalScore >= 70 ? 'Fair match!' : 'Needs improvement'}
                </p>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Overall Match</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {candidateData.analysisResult.breakdown.overallMatch}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${candidateData.analysisResult.breakdown.overallMatch}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Skill Match</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {candidateData.analysisResult.breakdown.skillMatch}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${candidateData.analysisResult.breakdown.skillMatch}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {candidateData.analysisResult.breakdown.experience}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${candidateData.analysisResult.breakdown.experience}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 text-green-600">✅ Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.analysisResult.matchingSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 text-red-600">❌ Missing Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.analysisResult.missingSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">💡 Suggestions for Improvement</h4>
                <ul className="space-y-2">
                  {candidateData.analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resume Preview */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">📄 Resume Preview</h4>
                <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {candidateData.analysisResult.highlightedResume}
                  </pre>
                </div>
              </div>

              {/* Download Button */}
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium">
                📥 Download Results (CSV)
              </button>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "history") {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {candidateData.history.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">{item.date}</td>
                    <td className="py-3 px-4 text-gray-700">{item.position}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${
                        item.score >= 90 ? 'text-green-600' : 
                        item.score >= 80 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {item.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "stats") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{candidateData.stats.totalAnalyzed}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Analyzed</h3>
            <p className="text-sm text-gray-600">Resumes analyzed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{candidateData.stats.averageScore}%</span>
            </div>
            <h3 className="font-semibold text-gray-900">Average Score</h3>
            <p className="text-sm text-gray-600">Match percentage</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">{candidateData.stats.bestScore}%</span>
            </div>
            <h3 className="font-semibold text-gray-900">Best Score</h3>
            <p className="text-sm text-gray-600">Highest match</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">85%</span>
            </div>
            <h3 className="font-semibold text-gray-900">Success Rate</h3>
            <p className="text-sm text-gray-600">Interviews landed</p>
          </div>
        </div>
      );
    }
  };

  const renderRecruiterDashboard = () => {
    if (activeTab === "dashboard") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName || user?.email}!</h2>
            <p className="text-orange-100">Find the perfect candidates for your team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">24</span>
              </div>
              <h3 className="font-semibold text-gray-900">Active Jobs</h3>
              <p className="text-sm text-gray-600">Open positions</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <span className="text-2xl font-bold text-green-600">156</span>
              </div>
              <h3 className="font-semibold text-gray-900">Total Candidates</h3>
              <p className="text-sm text-gray-600">In pipeline</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">89%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Match Rate</h3>
              <p className="text-sm text-gray-600">Success rate</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
              <h3 className="font-semibold text-gray-900">Positions Filled</h3>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>

          {/* Top Candidate Highlight */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">🥇 Top Candidate</h3>
                <p className="text-2xl font-bold mb-1">John Doe</p>
                <p className="text-yellow-100">Score: 92% • React Developer</p>
              </div>
              <div className="text-5xl font-bold">92%</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "analysis") {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resumes</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    multiple
                    onChange={handleMultipleFileUpload}
                    className="hidden"
                    id="resume-upload-multiple"
                  />
                  <label htmlFor="resume-upload-multiple" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">Multiple files accepted</p>
                  </label>
                </div>
                {recruiterData.resumes.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">✅ {recruiterData.resumes.length} resumes uploaded</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  value={recruiterData.jobDescription}
                  onChange={(e) => setRecruiterData(prev => ({ ...prev, jobDescription: e.target.value }))}
                  placeholder="Paste the job description here..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleRecruiterAnalysis}
              disabled={recruiterData.isAnalyzing}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {recruiterData.isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Candidates...
                </div>
              ) : (
                "Analyze Candidates"
              )}
            </button>
          </div>

          {/* Results Table */}
          {recruiterData.results.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Skills</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Missing</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruiterData.results.map((candidate, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{candidate.name}</td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${
                            candidate.score >= 90 ? 'text-green-600' : 
                            candidate.score >= 80 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {candidate.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.missing.map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Charts Section */}
          {recruiterData.results.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 Candidate Scores</h3>
                <div className="space-y-3">
                  {recruiterData.results.map((candidate, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm text-gray-700 truncate">{candidate.name}</div>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className={`h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                              candidate.score >= 90 ? 'bg-green-600' : 
                              candidate.score >= 80 ? 'bg-blue-600' : 'bg-orange-600'
                            }`}
                            style={{ width: `${candidate.score}%` }}
                          >
                            {candidate.score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">🥧 Skills Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Matched Skills</span>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-600 rounded-full h-4" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Missing Skills</span>
                    <span className="text-sm font-medium text-red-600">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 rounded-full h-4" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export Button */}
          {recruiterData.results.length > 0 && (
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium">
              📥 Export Candidates (CSV)
            </button>
          )}
        </div>
      );
    }

    if (activeTab === "history") {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis History</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Frontend Developer Position</p>
                <p className="text-sm text-gray-600">45 candidates analyzed</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">2024-01-15</p>
                <p className="text-sm font-medium text-green-600">Completed</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Senior React Developer</p>
                <p className="text-sm text-gray-600">32 candidates analyzed</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">2024-01-10</p>
                <p className="text-sm font-medium text-green-600">Completed</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "stats") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">24</span>
            </div>
            <h3 className="font-semibold text-gray-900">Active Jobs</h3>
            <p className="text-sm text-gray-600">Open positions</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-2xl font-bold text-green-600">156</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Candidates</h3>
            <p className="text-sm text-gray-600">In pipeline</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">89%</span>
            </div>
            <h3 className="font-semibold text-gray-900">Match Rate</h3>
            <p className="text-sm text-gray-600">Success rate</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">12</span>
            </div>
            <h3 className="font-semibold text-gray-900">Positions Filled</h3>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {isCandidate ? "Candidate Dashboard" : "Recruiter Dashboard"}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                {isCandidate && (
                  <Link 
                    to="/candidate" 
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Candidate
                  </Link>
                )}
                {isRecruiter && (
                  <Link 
                    to="/recruiter" 
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Recruiter
                  </Link>
                )}
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">Welcome, {user?.fullName || user?.email}</span>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {isCandidate ? renderCandidateDashboard() : renderRecruiterDashboard()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;