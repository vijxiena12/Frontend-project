import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Charts";
import Card from "../components/JobDescription";
import LoadingSpinner from "../components/ResumePreview";

function Candidate() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file || !jd) {
      alert("Please upload a resume and enter job description");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result for demo
      const mockResult = {
        final_score: 85,
        overall: 85,
        skill_score: 90,
        experience_score: 80,
        matched_skills: ["React", "TypeScript", "Node.js", "MongoDB", "Git"],
        missing_skills: ["Docker", "AWS", "GraphQL"],
        suggestions: [
          "Consider learning Docker for containerization",
          "AWS certification would strengthen your profile",
          "GraphQL experience is increasingly in demand"
        ]
      };
      
      setResult(mockResult);

      // Save history
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.push(mockResult);
      localStorage.setItem("history", JSON.stringify(history));
    } catch (error) {
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💼</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SmartHire</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem("isAuth");
                  navigate("/");
                }}
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Candidate Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Analyze your resume against job descriptions and get personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Upload */}
            <Card>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload Resume
                </h2>
                <p className="text-gray-600">
                  Upload your resume to get started with the analysis
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {file ? file.name : "Click to upload resume"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    PDF, DOC, DOCX (max 10MB)
                  </p>
                </label>
              </div>
            </Card>

            {/* Job Description */}
            <Card>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Job Description
                </h2>
                <p className="text-gray-600">
                  Paste the job description you want to analyze against
                </p>
              </div>
              
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={!file || !jd || isLoading}
                className="w-full mt-4"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            </Card>

            {/* Results Section */}
            {result && (
              <>
                {/* Score Card */}
                <Card>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Analysis Results
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {result.final_score || result.overall}%
                      </div>
                      <p className="text-green-900 font-medium">Overall Match</p>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {result.skill_score}%
                      </div>
                      <p className="text-blue-900 font-medium">Skills Match</p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {result.experience_score}%
                      </div>
                      <p className="text-purple-900 font-medium">Experience Match</p>
                    </div>
                  </div>
                </Card>

                {/* Skills Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <h4 className="text-lg font-semibold text-green-900 mb-4">
                      ✅ Matched Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                  
                  <Card>
                    <h4 className="text-lg font-semibold text-red-900 mb-4">
                      ❌ Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Suggestions */}
                <Card>
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">
                    💡 Recommendations
                  </h4>
                  <div className="space-y-3">
                    {result.suggestions?.map((suggestion, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <p className="text-gray-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Completion</span>
                  <span className="text-green-600 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Applications Sent</span>
                  <span className="font-medium">12</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interviews Scheduled</span>
                  <span className="font-medium">3</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-medium">47</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Resume analyzed for Senior Developer</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Profile updated</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">New skill added: TypeScript</span>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                💡 Pro Tip
              </h3>
              <p className="text-blue-800 text-sm">
                Keep your resume updated and tailor it to each job application for better match scores!
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Candidate;