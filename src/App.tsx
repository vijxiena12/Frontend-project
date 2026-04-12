import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { 
  Upload, 
  Search, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react"

function App() {
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
        
        gsap.from(".hero-image", {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)"
        })
      }, heroRef)
      
      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="min-height-screen bg-background text-foreground selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            SmartHire AI
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6"
            >
              <Zap className="w-3 h-3" />
              NEW: GPT-4o POWERED SCREENING
            </motion.div>
            <h1 className="hero-text text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
              Screen Resumes <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                With Superhuman
              </span> <br />
              Precision.
            </h1>
            <p className="hero-text text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Automate your hiring process with AI that understands experience, skills, and potential. Hire the top 1% without the 99% manual effort.
            </p>
            <div className="hero-text flex flex-wrap gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all neon-glow">
                Start Screening <ChevronRight className="w-5 h-5" />
              </button>
              <button className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="hero-image relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full" />
            <div className="glass rounded-3xl p-8 border border-white/10 relative z-10 animate-float">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-gray-500 font-mono">analysis_v2.ai</div>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                      <div className="h-1.5 w-40 bg-white/10 rounded" />
                    </div>
                    <div className="text-cyan-400 font-bold">{(98 - i * 2)}%</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                <div className="flex-1 h-32 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-cyan-400" />
                  <span className="text-[10px] text-gray-500 font-bold">DROP RESUMES</span>
                </div>
                <div className="w-32 h-32 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center justify-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                  <span className="text-[10px] text-gray-500 font-bold">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Recruiters Love SmartHire</h2>
          <p className="text-gray-400">Powered by advanced machine learning and NLP.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Semantic Analysis",
              desc: "Goes beyond keyword matching to understand context and experience depth.",
              icon: <BrainCircuit className="w-6 h-6" />
            },
            {
              title: "Instant Ranking",
              desc: "Screen 1000+ resumes in seconds and get a ranked list of top candidates.",
              icon: <Zap className="w-6 h-6" />
            },
            {
              title: "Bias Reduction",
              desc: "Objective AI scoring ensures focus on skills and merit, not metadata.",
              icon: <CheckCircle2 className="w-6 h-6" />
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 SmartHire AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
