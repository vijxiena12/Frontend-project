import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Target,
  BarChart3,
  BrainCircuit,
  Zap,
  Lightbulb,
  Sparkles,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api"
import { Link } from "react-router-dom"
import { SketchyDashboardLayout } from "@/components/SketchyDashboardLayout"
import { SketchyCard, SketchyMetricCard } from "@/components/SketchyCard"

interface AssessmentHistory {
  id: number
  mcq_score: number
  integrity_score: number
  overall_score: number
  completed_at: string
}

interface Profile {
  user_id: number
  email: string
  role: string
  total_assessments: number
  average_score: number
}

interface Suggestions {
  missing_skills?: { requirement: string; similarity_score: number }[]
  matching_skills?: { requirement: string; similarity_score: number }[]
  ats_score?: number
  file_name?: string
  suggestions?: string
}

export default function IndividualDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [history, setHistory] = useState<AssessmentHistory[]>([])
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return
    const user = JSON.parse(userStr)
    const userId = user.id

    setLoading(true)
    try {
      const [profileRes, historyRes, suggestionsRes] = await Promise.all([
        api.get(`/individual/profile?user_id=${userId}`),
        api.get(`/individual/history?user_id=${userId}`),
        api.get(`/individual/resume-suggestions?user_id=${userId}`)
      ])
      setProfile(profileRes.data)
      setHistory(historyRes.data)
      setSuggestions(suggestionsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-amber-600"
    return "text-rose-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-100"
    if (score >= 60) return "bg-amber-50 border-amber-100"
    return "bg-rose-50 border-rose-100"
  }

  const avgMcq = history.length > 0 
    ? history.reduce((acc, h) => acc + h.mcq_score, 0) / history.length 
    : 0
  const avgIntegrity = history.length > 0 
    ? history.reduce((acc, h) => acc + h.integrity_score, 0) / history.length 
    : 0

  return (
    <SketchyDashboardLayout 
      title="Candidate Dashboard"
      role="INDIVIDUAL"
      headerAction={
        <Button variant="outline" size="sm" onClick={fetchData} className="gap-2 font-bold text-slate-900 rounded-xl border-2 border-slate-900">
           <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
           Sync Data
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-10">
            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-2">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tight">Performance <span className="text-red-500 underline decoration-wavy">Hub</span></h1>
                  <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-xl">
                    Personalized insights and AI-driven career optimization based on your latest assessments.
                  </p>
               </div>
               <div className="flex gap-4">
                  <Button asChild className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-xl font-bold text-lg text-white border-2 border-slate-900">
                    <Link to="/individual/assessment">
                      Take New Assessment
                      <ArrowUpRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
               </div>
            </div>

            {/* Top Row: Metrics & Suggestions */}
            <div className="grid lg:grid-cols-3 gap-8">
               {/* Metrics Column */}
               <div className="lg:col-span-1 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <SketchyCard className="p-6 text-center">
                        <Target className="w-5 h-5 text-slate-900 mx-auto mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Average</p>
                        <p className="text-4xl font-black text-slate-900">
                          {(profile?.average_score || 0).toFixed(0)}%
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Overall Fitness</p>
                     </SketchyCard>
                     
                     <SketchyCard className="p-6 text-center bg-slate-900 border-slate-900 text-white">
                        <FileText className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Count</p>
                        <p className="text-4xl font-black text-white">{profile?.total_assessments || 0}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Assessments</p>
                     </SketchyCard>

                     <SketchyCard className="p-6 col-span-2">
                        <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-2">
                              <BrainCircuit className="w-5 h-5 text-slate-900" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Skills Trend</span>
                           </div>
                           <Badge className="bg-slate-900 text-white text-[9px] rounded-lg">LATEST</Badge>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-end">
                              <p className="text-3xl font-black text-slate-900">{avgMcq.toFixed(0)}%</p>
                              <p className="text-xs font-bold text-slate-500">Technical Avg</p>
                           </div>
                           <Progress value={avgMcq} className="h-2 bg-slate-200" />
                        </div>
                     </SketchyCard>
                  </div>
               </div>

               {/* Suggestions Column */}
               <SketchyCard className="lg:col-span-2 p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div className="w-20 h-20 bg-yellow-300 rounded-3xl flex items-center justify-center animate-pulse">
                        <Lightbulb className="w-10 h-10" />
                     </div>
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                     <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                           <Sparkles className="w-8 h-8 text-slate-900" />
                           AI Resume Insights
                        </h3>
                        <p className="text-slate-600 font-medium mt-2">Based on your latest upload: <span className="text-slate-900 font-black">{suggestions?.file_name || "N/A"}</span></p>
                     </div>

                     {suggestions?.missing_skills && suggestions.missing_skills.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2 border-l-3 border-red-500 pl-2">
                                 <AlertCircle className="w-4 h-4" />
                                 Skills to Acquire
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                 {suggestions.missing_skills.map((s, idx) => (
                                    <Badge key={idx} className="bg-slate-100 text-slate-700 border-2 border-slate-900 px-4 py-2 rounded-xl font-bold">
                                       {s.requirement}
                                    </Badge>
                                 ))}
                              </div>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                 *Adding these to your resume could boost your ATS score by up to 15%.
                              </p>
                           </div>

                           <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2 border-l-3 border-green-500 pl-2">
                                 <CheckCircle2 className="w-4 h-4" />
                                 Competitive Strengths
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                 {suggestions.matching_skills?.slice(0, 5).map((s, idx) => (
                                    <Badge key={idx} className="bg-slate-100 text-slate-700 border-2 border-slate-900 px-4 py-2 rounded-xl font-bold">
                                       {s.requirement}
                                    </Badge>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="py-10 text-center space-y-4 bg-white rounded-[2rem] border-3 border-dashed border-slate-300">
                           <p className="text-slate-500 font-medium">Take an assessment to see detailed resume optimization suggestions.</p>
                           <Button asChild variant="outline" className="rounded-xl border-2 border-slate-900 font-bold">
                              <Link to="/individual/assessment">Run Analysis Now</Link>
                           </Button>
                        </div>
                     )}

                     <div className="pt-4 border-t-2 border-slate-200">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="text-right">
                                 <p className="text-2xl font-black text-slate-900">{suggestions?.ats_score?.toFixed(0) || 0}%</p>
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ATS Compatibility</p>
                              </div>
                              <div className="h-10 w-px bg-slate-300 mx-2" />
                              <div className="text-left">
                                 <p className="text-sm font-bold text-slate-700">Overall Profile Strength</p>
                                 <div className="flex items-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                       <div key={i} className={`h-2 w-6 rounded-full ${i <= (suggestions?.ats_score || 0) / 20 ? "bg-slate-900" : "bg-slate-300"}`} />
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <Button className="bg-slate-900 hover:bg-black rounded-xl font-bold border-2 border-slate-900">
                              Download Detailed Feedback
                           </Button>
                        </div>
                     </div>
                  </div>
               </SketchyCard>
            </div>

            {/* Assessment History Timeline */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Sessions</h3>
                <Badge className="border-2 border-slate-900 bg-white text-slate-900 font-bold px-4 py-1 rounded-lg">View Full History</Badge>
              </div>

              <div className="grid gap-4">
                {history.length > 0 ? history.map((assessment, idx) => (
                  <SketchyCard
                    key={assessment.id}
                    className="p-6 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-lg font-black text-white group-hover:bg-yellow-300 group-hover:text-slate-900 transition-all border-2 border-slate-900">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg leading-none">
                          Technical Assessment #{assessment.id}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-slate-500">
                           <Clock className="w-3 h-3" />
                           <span className="text-xs font-bold uppercase tracking-widest">
                            {new Date(assessment.completed_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                           </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                      <div className="text-center">
                        <p className="text-xl font-black text-slate-900 leading-none">{assessment.mcq_score.toFixed(0)}%</p>
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mt-1">Technical</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-xl font-black leading-none ${getScoreColor(assessment.integrity_score)}`}>
                          {assessment.integrity_score.toFixed(0)}%
                        </p>
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mt-1">Integrity</p>
                      </div>
                      <SketchyCard className="p-4 text-center min-w-[100px] bg-slate-900 text-white border-slate-900">
                        <p className="text-2xl font-black leading-none">
                          {assessment.overall_score.toFixed(0)}%
                        </p>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mt-1">Final</p>
                      </SketchyCard>
                      <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-500 group-hover:border-slate-900 group-hover:text-slate-900 transition-all cursor-pointer">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </SketchyCard>
                )) : (
                  <SketchyCard className="p-20 text-center border-3 border-dashed">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-300">
                       <Clock className="w-10 h-10 text-slate-400" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">No data recorded yet</h4>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">Complete your first assessment to unlock detailed performance tracking and AI insights.</p>
                    <Button asChild className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-black font-bold text-lg text-white border-2 border-slate-900">
                      <Link to="/individual/assessment">Begin Assessment Suite</Link>
                    </Button>
                  </SketchyCard>
                )}
              </div>
            </div>
          </div>
    </SketchyDashboardLayout>
  )
}