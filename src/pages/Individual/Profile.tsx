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
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
    { label: "Avg. ATS Score", val: "88%", icon: Target, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Interviews Aced", val: "12", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Skill Badges", val: "8", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Integrity Rank", val: "99", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar role="INDIVIDUAL" />
      <SidebarInset className="bg-slate-50/50">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-md px-4 border-b border-sidebar-border/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">My Profile</h2>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2 text-slate-500 italic">
            <Settings className="w-4 h-4" />
            Edit Profile
          </Button>
        </header>

        <main className="p-6 md:p-10 lg:p-12 w-full max-w-[1600px] mx-auto min-h-[calc(100svh-4rem)]">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Profile Header Card */}
            <Card className="p-8 md:p-12 rounded-[3rem] border-none bg-slate-900 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-600 border-4 border-white/10 flex items-center justify-center text-5xl font-black italic shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    {user?.email?.[0].toUpperCase() || "C"}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 border-4 border-slate-900 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="text-center md:text-left space-y-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight italic">
                      {user?.email?.split('@')[0] || "Candidate"}
                    </h1>
                    <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                      <Briefcase className="w-4 h-4" />
                      Full Stack Engineer
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-400 text-sm font-medium">
                    <span className="flex items-center gap-2 italic"><MapPin className="w-4 h-4 text-indigo-500" /> San Francisco, CA</span>
                    <span className="flex items-center gap-2 italic"><Mail className="w-4 h-4 text-indigo-500" /> {user?.email}</span>
                    <span className="flex items-center gap-2 italic"><Phone className="w-4 h-4 text-indigo-500" /> +1 (555) 000-0000</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                    <Button size="icon" variant="outline" className="rounded-xl border-white/10 hover:bg-white/10 text-white">
                      <GitBranch className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-xl border-white/10 hover:bg-white/10 text-white">
                      <Users className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-xl border-white/10 hover:bg-white/10 text-white">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Skills & Stats */}
              <div className="lg:col-span-1 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((m, i) => (
                    <Card key={i} className="p-6 rounded-[2rem] border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all text-center group">
                      <div className={`w-10 h-10 rounded-xl ${m.bg} ${m.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <m.icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">{m.label}</p>
                      <p className="text-2xl font-black text-slate-900 italic tracking-tight">{m.val}</p>
                    </Card>
                  ))}
                </div>

                {/* Technical Skills */}
                <Card className="p-8 rounded-[2.5rem] border border-slate-200 bg-white space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 italic uppercase flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-indigo-600" />
                      Skills Profile
                    </h3>
                    <Badge variant="outline" className="rounded-lg italic font-bold">Expert</Badge>
                  </div>
                  <div className="space-y-6">
                    {skills.map((skill, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 italic">
                          <span>{skill.name}</span>
                          <span className="text-indigo-600">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-1.5 bg-slate-100" />
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full text-indigo-600 font-bold uppercase tracking-widest text-[10px] italic hover:bg-indigo-50 rounded-xl">
                    Add New Skill
                  </Button>
                </Card>
              </div>

              {/* Right Column: Experience & Projects */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <Card className="p-8 md:p-10 rounded-[2.5rem] border border-slate-200 bg-white">
                  <h3 className="text-xl font-bold text-slate-900 italic uppercase mb-6">Professional Summary</h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    Dynamic and results-driven Software Engineer with over 5 years of experience in building scalable web applications. 
                    Specialized in modern JavaScript frameworks and AI integration. Proven track record of optimizing system 
                    performance and delivering premium user experiences through clean, efficient code.
                  </p>
                </Card>

                {/* Experience */}
                <Card className="p-8 md:p-10 rounded-[2.5rem] border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 italic uppercase">Recent Experience</h3>
                    <Button variant="ghost" size="sm" className="text-indigo-600 font-bold italic">View All</Button>
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
                      <div key={i} className="relative pl-8 border-l-2 border-slate-100 last:border-0 pb-10 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600" />
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <h4 className="font-black text-slate-900 text-lg italic tracking-tight">{exp.role}</h4>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider italic">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{exp.company}</p>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed italic mt-3">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Resume Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-8 rounded-[2.5rem] border-2 border-dashed border-indigo-200 bg-indigo-50/20 hover:bg-indigo-50/40 transition-all cursor-pointer group flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="font-bold text-indigo-600 uppercase tracking-widest text-xs italic">Upload Latest Resume</p>
                    </div>
                  </Card>
                  <Card className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer group flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <p className="font-bold text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest text-xs italic">Sync Portfolio Data</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
