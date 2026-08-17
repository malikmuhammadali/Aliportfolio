"use client"

import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github, Bot, Workflow, FileText, TrendingUp, Eye, ArrowUpRight, X, CalendarCheck, Zap, ShieldCheck } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Universal Inquiry-to-Sale Pipeline",
    description: "Production-grade n8n automation that carries inbound messages from any channel — WhatsApp, Instagram, web form, or email — through AI intent classification, live fact verification, and confidence-scored replies, escalating to a human with full context exactly when it matters.",
    tech: ["n8n", "AI Classification", "CRM Automation", "Multi-Channel", "Conversation Memory"],
    icon: Bot,
    color: "from-cyan-500/30 to-purple-500/30",
    image: "/images/sale-pipeline.png",
    featured: true,
  },
  {
    title: "Patient Appointment & No-Show Reduction Pipeline",
    description: "End-to-end scheduling automation managing the full patient appointment lifecycle — booking, multi-stage reminders, self-service reschedule, and automatic waitlist fill on cancellations — with anything clinical or urgent routed straight to staff.",
    tech: ["n8n", "Calendar Sync", "WhatsApp", "Waitlist Automation", "Staff Escalation"],
    icon: CalendarCheck,
    color: "from-emerald-500/30 to-teal-500/30",
    image: "/images/patient-booking.png",
    featured: true,
  },
  {
    title: "Instant Lead Response Engine",
    description: "Continuously watches the inbox and reasons about intent the moment a message arrives — question, objection, or buy signal — drafting a specific, data-grounded reply in seconds instead of hours, around the clock.",
    tech: ["AI Reasoning", "Intent Detection", "Real-Time Automation", "RAG"],
    icon: Zap,
    color: "from-yellow-500/30 to-orange-500/30",
    image: "/images/reply-pipeline.png",
    featured: true,
  },
  {
    title: "Real-Time Listing Verification Engine",
    description: "A quality-control layer that independently checks every item mentioned in a conversation against its live source of truth — status, price, availability — before that information ever reaches a customer, so speed never comes at the cost of accuracy.",
    tech: ["Live Data Verification", "n8n", "API Integration", "Anti-Double-Sell"],
    icon: ShieldCheck,
    color: "from-sky-500/30 to-blue-500/30",
    image: "/images/listing-verification.png",
    featured: true,
  },
  {
    title: "Marketing Workflow Automation (Lindy.ai)",
    description: "Managed end-to-end marketing workflows for a UK client. Monitored performance and diagnosed failures to maintain 99%+ uptime.",
    tech: ["Lindy.ai", "Automation", "Workflow Maintenance"],
    icon: Workflow,
    color: "from-blue-500/30 to-cyan-500/30",
    image: "/images/1.png",
    featured: true,
  },
  {
    title: "AI Grant Recommendation Chatbot",
    description: "Built full backend + chatbot for grant discovery. Scraped 500+ records and automated recommendations.",
    tech: ["LangChain", "RAG", "Web Scraping", "Python"],
    icon: Bot,
    color: "from-cyan-500/30 to-blue-500/30",
    image: "/images/6.png",
    featured: true,
  },
  {
    title: "ClickUp Workflow Automation",
    description: "End-to-end workflow automation with real-time tracking. Reduced manual work by ~90%.",
    tech: ["Automation", "APIs", "ClickUp"],
    icon: Workflow,
    color: "from-purple-500/30 to-pink-500/30",
    image: "/images/3.png",
    featured: true,
  },
  {
    title: "PDF Data Extraction Automation",
    description: "Extracted structured data from 500+ PDFs. Reduced manual effort by ~85%.",
    tech: ["Python", "OCR", "Excel Integration"],
    icon: FileText,
    color: "from-green-500/30 to-emerald-500/30",
    image: "/images/project-pdf.jpg",
    featured: false,
  },
  {
    title: "Stock Market Prediction (LSTM)",
    description: "Predicted PSX trends based on political events using deep learning time series analysis.",
    tech: ["LSTM", "Streamlit", "Time Series"],
    icon: TrendingUp,
    color: "from-orange-500/30 to-red-500/30",
    image: "/images/4.png",
    featured: false,
  },
  {
    title: "AI Accessibility Tool",
    description: "Built tool for visually impaired users with image recognition and text-to-speech capabilities.",
    tech: ["Gemini", "OCR", "gTTS", "LangChain"],
    icon: Eye,
    color: "from-indigo-500/30 to-violet-500/30",
    image: "/images/5.png",
    featured: false,
  },
]

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      layoutId={`card-${project.title}`}
      className={`group relative cursor-pointer ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
      style={{ y: smoothY }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />

      <motion.div
        className="relative glass rounded-2xl overflow-hidden h-full hover:border-primary/40 transition-all duration-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Project Image */}
        <motion.div layoutId={`image-${project.title}`} className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.9 }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating icon */}
          <motion.div
            className="absolute top-4 left-4 p-3 rounded-xl glass"
            animate={{
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <project.icon className="w-5 h-5 text-primary" />
          </motion.div>

          {/* View project button */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 rounded-full bg-primary text-primary-foreground">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Animated background orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
              Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Featured <span className="gradient-text text-glow">Work</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              A selection of projects showcasing my expertise in AI/ML, automation, and backend development.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              layoutId={`card-${selectedProject.title}`}
              className="relative w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 text-foreground z-10 hover:bg-background/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <motion.div layoutId={`image-${selectedProject.title}`} className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] flex-shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground mb-6 text-lg">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                   <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                     <Github className="w-5 h-5" />
                     View Code
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-foreground">
                     <ExternalLink className="w-5 h-5" />
                     Live Demo
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
