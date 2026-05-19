import React, { useEffect, useState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  ExternalLink,
  GitBranch,
  Users,
  Globe,
  Settings,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Award
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SketchyDashboardLayout } from "@/components/SketchyDashboardLayout"
import { SketchyCard, SketchyMetricCard } from "@/components/SketchyCard"

export default function Profile() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  const skills = [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Python / FastAPI", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Tailwind CSS", level: 98 }
  ]

  const metrics = [
    { label: "Avg. ATS Score", val: "88%", icon: Target, color: "text-red-600", bg: "bg-red-100" },
    { label: "Interviews Aced", val: "12", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Skill Badges", val: "8", icon: Award, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Integrity Rank", val: "99", icon: ShieldCheck, color: "text-cyan-600", bg: "bg-cyan-100" },
  ]

  return (
    <SketchyDashboardLayout 
      title="My Profile"
      role="INDIVIDUAL"
      headerAction={
        <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2 text-slate-900 border-2 border-slate-900">
          <Settings className="w-4 h-4" />
          Edit Profile
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-10">
            {/* Profile Header Card */}
            <SketchyCard className="p-8 md:p-12 bg-slate-900 text-white border-slate-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700/20 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-yellow-300 border-4 border-white flex items-center justify-center text-5xl font-black text-slate-900 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    {user?.email?.[0].toUpperCase() || "C"}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-400 border-4 border-slate-900 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-slate-900" />
                  </div>
                </div>

                <div className="text-center md:text-left space-y-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                      {user?.email?.split('@')[0] || "Candidate"}
                    </h1>
                    <p className="text-yellow-300 font-bold uppercase tracking-widest text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                      <Briefcase className="w-4 h-4" />
                      Full Stack Engineer
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-300 text-sm font-medium">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-300" /> San Francisco, CA</span>
                    <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-300" /> {user?.email}</span>
                    <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-yellow-300" /> +1 (555) 000-0000</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                    <Button size="icon" className="rounded-xl border-2 border-white/20 hover:bg-white/10 text-white bg-transparent">
                      <GitBranch className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="rounded-xl border-2 border-white/20 hover:bg-white/10 text-white bg-transparent">
                      <Users className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="rounded-xl border-2 border-white/20 hover:bg-white/10 text-white bg-transparent">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </SketchyCard>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Skills & Stats */}
              <div className="lg:col-span-1 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((m, i) => (
                    <SketchyMetricCard 
                      key={i}
                      label={m.label}
                      value={m.val}
                      icon={m.icon}
                      color={m.color}
                      bgColor={m.bg}
                    />
                  ))}
                </div>

                {/* Technical Skills */}
                <SketchyCard className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 uppercase flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-slate-900" />
                      Skills Profile
                    </h3>
                    <Badge className="bg-slate-900 text-white rounded-lg font-bold text-xs">Expert</Badge>
                  </div>
                  <div className="space-y-6">
                    {skills.map((skill, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                          <span>{skill.name}</span>
                          <span className="text-slate-900 font-black">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-slate-300" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full text-slate-900 font-bold uppercase tracking-widest text-xs bg-slate-100 hover:bg-yellow-300 rounded-xl border-2 border-slate-900">
                    Add New Skill
                  </Button>
                </SketchyCard>
              </div>

              {/* Right Column: Experience & Projects */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <SketchyCard className="p-8 md:p-10">
                  <h3 className="text-xl font-bold text-slate-900 uppercase mb-6">Professional Summary</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Dynamic and results-driven Software Engineer with over 5 years of experience in building scalable web applications. 
                    Specialized in modern JavaScript frameworks and AI integration. Proven track record of optimizing system 
                    performance and delivering premium user experiences through clean, efficient code.
                  </p>
                </SketchyCard>

                {/* Experience */}
                <SketchyCard className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 uppercase">Recent Experience</h3>
                    <Button variant="ghost" size="sm" className="text-slate-900 font-bold uppercase text-xs">View All</Button>
                  </div>
                  <div className="space-y-10">
                    {[
                      { 
                        role: "Senior Software Engineer", 
                        company: "TechFlow Systems", 
                        period: "2021 - Present",
                        desc: "Architected and led the development of a real-time analytics dashboard used by 50k+ daily active users."
                      },
                      { 
                        role: "Full Stack Developer", 
                        company: "Innovate AI", 
                        period: "2019 - 2021",
                        desc: "Integrated Large Language Models into core product features, improving user engagement by 40%."
                      }
                    ].map((exp, i) => (
                      <div key={i} className="relative pl-8 border-l-3 border-slate-900 last:border-0 pb-10 last:pb-0">
                        <div className="absolute left-[-7.5px] top-0 w-4 h-4 rounded-full bg-white border-3 border-slate-900" />
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <h4 className="font-black text-slate-900 text-lg tracking-tight">{exp.role}</h4>
                            <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{exp.company}</p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed mt-3">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SketchyCard>

                {/* Resume Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <SketchyCard className="p-8 border-3 border-dashed border-slate-400 bg-white group flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform border-2 border-slate-300">
                        <FileText className="w-6 h-6 text-slate-900" />
                      </div>
                      <p className="font-bold text-slate-900 uppercase tracking-widest text-xs">Upload Latest Resume</p>
                    </div>
                  </SketchyCard>
                  <SketchyCard className="p-8 border-3 border-dashed border-slate-300 group flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform border-2 border-slate-300">
                        <ExternalLink className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
                      </div>
                      <p className="font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-widest text-xs">Sync Portfolio Data</p>
                    </div>
                  </SketchyCard>
                </div>
              </div>
            </div>
          </div>
    </SketchyDashboardLayout>
  )
}
