import { useEffect, useRef } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import gsap from "gsap"
import { 
  Upload, 
  BrainCircuit, 
  CheckCircle2, 
  Zap,
  Home,
  BarChart3,
  Settings,
  LayoutGrid,
  Briefcase,
  User,
  ArrowUpRight
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Component as HeroSection } from "@/components/hero/index"
import { Dock, DockIcon } from "@/components/ui/dock"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import Login from "@/pages/Auth/Login"
import Signup from "@/pages/Auth/Signup"
import Dashboard from "@/pages/Dashboard/Dashboard"
import Resumes from "@/pages/Resumes/Resumes"
import JobOpenings from "@/pages/Jobs/JobOpenings"
import AIInsights from "@/pages/Insights/AIInsights"
import Analytics from "@/pages/Analytics/Analytics"
import SettingsPage from "@/pages/Settings/Settings"
import Team from "@/pages/Team/Team"
import AssessmentSuite from "@/pages/Interview/AssessmentSuite"
import Screening from "@/pages/Screening/Screening"
import RecruiterDashboard from "@/pages/Recruiter/RecruiterDashboard"
import IndividualDashboard from "@/pages/Individual/IndividualDashboard"
import PreviewPage from "@/pages/Preview"
import Profile from "@/pages/Individual/Profile"

function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-text", {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out"
        })
      }, heroRef)
      
      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 font-sans pb-32">
      {/* Smooth Cursor Animation */}
      <SmoothCursor />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div className="p-10 rounded-[3rem] bg-indigo-600 text-white space-y-6 shadow-2xl shadow-indigo-200">
            <Briefcase className="w-12 h-12" />
            <h3 className="text-4xl font-black tracking-tight">For Recruiters</h3>
            <p className="text-indigo-100 text-lg">Streamline your hiring process with AI-driven screening and semantic ranking.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-lg">
                <Link to="/signup?role=RECRUITER">Hire Smarter</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-2xl h-14 px-8 font-bold">
                <Link to="/login?role=RECRUITER">Login</Link>
              </Button>
            </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-slate-900 text-white space-y-6 shadow-2xl shadow-slate-200">
            <User className="w-12 h-12" />
            <h3 className="text-4xl font-black tracking-tight">For Candidates</h3>
            <p className="text-slate-400 text-lg">Validate your skills, optimize your resume, and get hired by top companies.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-8 font-black text-lg">
                <Link to="/signup?role=INDIVIDUAL">Get Hired</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-2xl h-14 px-8 font-bold">
                <Link to="/login?role=INDIVIDUAL">Login</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <Button asChild variant="ghost" className="text-slate-500 font-bold hover:text-indigo-600">
            <Link to="/preview" className="flex items-center gap-2">
              Explore Dashboard Previews <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Floating Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock className="bg-black/70 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <DockIcon className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30">
            <Home className="w-5 h-5" />
          </DockIcon>
          <DockIcon className="bg-white/10 text-white/90 hover:bg-white/20 border border-white/10">
            <LayoutGrid className="w-5 h-5" />
          </DockIcon>
          <DockIcon className="bg-white/10 text-white/90 hover:bg-white/20 border border-white/10">
            <Upload className="w-5 h-5" />
          </DockIcon>
          <DockIcon className="bg-white/10 text-white/90 hover:bg-white/20 border border-white/10">
            <BarChart3 className="w-5 h-5" />
          </DockIcon>
          <DockIcon className="bg-white/10 text-white/90 hover:bg-white/20 border border-white/10">
            <Settings className="w-5 h-5" />
          </DockIcon>
        </Dock>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 SmartHire AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resumes" element={<Resumes />} />
      <Route path="/screening" element={<Screening />} />
      <Route path="/jobs" element={<JobOpenings />} />
      <Route path="/insights" element={<AIInsights />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/individual/assessment" element={<AssessmentSuite />} />
      <Route path="/individual/profile" element={<Profile />} />
      <Route path="/preview" element={<PreviewPage />} />
    </Routes>
  )
}

export default App
