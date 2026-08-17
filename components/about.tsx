"use client"

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Brain, Cpu, Workflow, Zap } from "lucide-react"
import Image from "next/image"

const highlights = [
  {
    icon: Brain,
    title: "AI/ML Expertise",
    description: "Deep learning, NLP, and generative AI solutions",
    delay: 0,
  },
  {
    icon: Workflow,
    title: "RAG Pipelines",
    description: "LangChain-powered intelligent retrieval systems",
    delay: 0.1,
  },
  {
    icon: Cpu,
    title: "Backend Systems",
    description: "Scalable FastAPI & Django applications",
    delay: 0.2,
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Workflow optimization with n8n, Lindy.ai & ClickUp",
    delay: 0.3,
  },
]

function HighlightCard({ item, index }: { item: typeof highlights[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        delay: 0.4 + index * 0.1, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.25 }
      }}
      className="glass rounded-xl p-5 group hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative flex items-start gap-4">
        <motion.div 
          className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <item.icon className="w-5 h-5" />
        </motion.div>
        <div>
          <motion.h3 
            className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
          >
            {item.title}
          </motion.h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Crafting <span className="gradient-text text-glow">Intelligent</span> Solutions
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image Section */}
            <motion.div
              className="lg:w-2/5"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ y: smoothY }}
            >
              <div className="relative">
                <motion.div
                  className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/profile.png"
                    alt="Malik Muhammad Ali"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </motion.div>
                
                {/* Floating decorations */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent/10 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="lg:w-3/5">
              {/* About Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  AI/ML Engineer with hands-on production experience building{" "}
                  <motion.span 
                    className="text-primary font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    LangChain-powered chatbots
                  </motion.span>,{" "}
                  <motion.span 
                    className="text-primary font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    RAG pipelines
                  </motion.span>, intelligent automation workflows, 
                  and scalable backend systems. Experienced in delivering end-to-end AI solutions for 
                  international clients using tools like{" "}
                  <span className="text-foreground font-medium">Lindy.ai</span>,{" "}
                  <span className="text-foreground font-medium">ClickUp</span>, and{" "}
                  <span className="text-foreground font-medium">n8n</span>. Strong foundation in deep learning, 
                  generative AI (GPT, Gemini, LLaMA), and backend development.
                </p>
              </motion.div>

              {/* Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <HighlightCard key={item.title} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
