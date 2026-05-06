"use client"

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Calendar, CheckCircle2 } from "lucide-react"

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "Cplusoft",
    period: "Aug 2024 – Present",
    current: true,
    achievements: [
      "Built marketing automation workflows reducing manual work by ~70%",
      "Designed ClickUp automation system eliminating ~90% manual updates",
      "Developed FastAPI backend systems with authentication & DB design",
      "Maintained 99%+ uptime and handled real-time client issues",
    ],
  },
  {
    title: "Data Science Intern (GenAI)",
    company: "Innomatics Research Labs",
    period: "Oct 2024 – Jan 2025",
    current: false,
    achievements: [
      "Worked on ML & NLP projects using BERT, GPT, LLaMA",
      "Built LangChain-based RAG applications",
      "Applied prompt engineering & transformer models",
    ],
  },
]

function TimelineCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -10 : 10 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Dot with pulse animation */}
      <motion.div 
        className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2 md:-translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 pl-8 md:pl-0">
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className={`glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 relative overflow-hidden ${
            isEven ? "md:mr-12" : "md:ml-12"
          }`}
        >
          {/* Animated border gradient */}
          {exp.current && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />
          )}
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <motion.h3 
                  className="text-lg font-semibold text-foreground"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {exp.title}
                </motion.h3>
                {exp.current && (
                  <motion.span 
                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Current
                  </motion.span>
                )}
              </div>
              <motion.p 
                className="text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                {exp.company}
              </motion.p>
            </div>
            <motion.div 
              className="flex items-center gap-1.5 text-muted-foreground text-sm whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <Calendar className="w-4 h-4" />
              {exp.period}
            </motion.div>
          </div>

          {/* Achievements */}
          <ul className="space-y-3">
            {exp.achievements.map((achievement, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3 text-sm text-muted-foreground group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                </motion.div>
                <span className="group-hover:text-foreground transition-colors">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Empty space for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])
  const smoothLineHeight = useSpring(lineHeight, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background orb */}
      <motion.div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
        animate={{ x: [0, 50, 0], y: [-50, 50, -50] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4"
            >
              Experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Professional <span className="gradient-text text-glow">Journey</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Static background */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-1/2" />
            
            {/* Timeline Line - Animated progress */}
            <motion.div 
              className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary to-accent md:-translate-x-1/2 origin-top"
              style={{ height: smoothLineHeight }}
            />

            {experiences.map((exp, index) => (
              <TimelineCard key={exp.title} exp={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
