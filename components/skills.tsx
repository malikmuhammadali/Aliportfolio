"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Brain, 
  Database, 
  Server, 
  Workflow, 
  GitBranch, 
  Sparkles,
  Code2,
  Cpu
} from "lucide-react"

const skillCategories = [
  {
    title: "Generative AI",
    icon: Sparkles,
    skills: ["LangChain", "RAG", "GPT", "Gemini", "LLaMA"],
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["Scikit-learn", "Pandas", "NumPy"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Deep Learning",
    icon: Cpu,
    skills: ["TensorFlow", "PyTorch", "CNN", "RNN", "LSTM"],
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Python", "FastAPI", "Django", "REST APIs"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Automation",
    icon: Workflow,
    skills: ["n8n", "Lindy.ai", "Zapier", "ClickUp"],
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "Vector DBs", "SQL"],
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Tools & DevOps",
    icon: GitBranch,
    skills: ["Git", "Docker", "AWS", "GCP"],
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "JavaScript", "SQL"],
    color: "from-rose-500/20 to-pink-500/20",
  },
]

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ 
        delay: 0.1 + index * 0.05, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div 
        className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-xl blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />
      
      <motion.div
        className="relative glass rounded-xl p-5 hover:border-primary/40 transition-all duration-300 h-full"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.25 }}
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300"
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <category.icon className="w-4 h-4" />
          </motion.div>
          <motion.h3 
            className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors"
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {category.title}
          </motion.h3>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.2 + index * 0.05 + skillIndex * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ 
                scale: 1.15, 
                backgroundColor: "rgba(0, 255, 255, 0.25)",
                color: "rgb(0, 255, 255)",
              }}
              className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground cursor-default transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 grid-bg opacity-20" 
        style={{ y: backgroundY }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4"
            >
              Skills
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Technical <span className="gradient-text text-glow">Arsenal</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              A comprehensive toolkit for building intelligent systems and automation solutions.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
