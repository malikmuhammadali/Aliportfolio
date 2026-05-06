"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Github, Linkedin, ArrowDown, Sparkles } from "lucide-react"
import Image from "next/image"

const skills = ["LangChain", "RAG Pipelines", "FastAPI", "Automation", "Deep Learning", "GPT & LLaMA"]

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const glowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(0, 255, 255, 0.2)",
      "0 0 40px rgba(0, 255, 255, 0.4)",
      "0 0 20px rgba(0, 255, 255, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export function Hero() {
  const [currentSkill, setCurrentSkill] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const imageY = useTransform(smoothProgress, [0, 0.3], [0, 100])
  const imageScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9])
  const imageOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.3], [0, 50])

  useEffect(() => {
    const skill = skills[currentSkill]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < skill.length) {
          setDisplayText(skill.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentSkill((prev) => (prev + 1) % skills.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentSkill])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Animated gradient orbs with parallax */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image */}
            <motion.div
              className="relative"
              style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
              variants={itemVariants}
            >
              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden"
                variants={glowVariants}
                animate="animate"
              >
                {/* Rotating border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(0, 255, 255, 0.5), transparent)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner glow ring */}
                <div className="absolute inset-[3px] rounded-full bg-background" />
                
                {/* Image container */}
                <div className="absolute inset-[6px] rounded-full overflow-hidden">
                  <Image
                    src="/images/7.png"
                    alt="Malik Muhammad Ali - AI/ML Engineer"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating badges around image */}
              <motion.div
                className="absolute -top-2 -right-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary"
                variants={floatingVariants}
                animate="animate"
              >
                <Sparkles className="w-3 h-3 inline-block mr-1" />
                AI/ML
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-accent"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "1s" }}
              >
                Open to Work
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-muted-foreground">Available for opportunities</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              >
                <span className="text-foreground">Malik Muhammad </span>
                <motion.span 
                  className="gradient-text text-glow inline-block"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 255, 255, 0.5)",
                      "0 0 40px rgba(0, 255, 255, 0.8)",
                      "0 0 20px rgba(0, 255, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Ali
                </motion.span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-6"
              >
                AI/ML & Automation Engineer
              </motion.h2>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
              >
                Building intelligent automation systems with LLMs, RAG pipelines, and real-time AI workflows.
              </motion.p>

              {/* Typing Effect */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-2 mb-8 font-mono text-sm sm:text-base"
              >
                <span className="text-muted-foreground">{">"}</span>
                <motion.span 
                  className="text-primary"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {displayText}
                </motion.span>
                <motion.span 
                  className="w-0.5 h-5 bg-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-base transition-all duration-300 glow-cyan"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 border border-border rounded-xl font-medium text-base hover:bg-secondary/50 transition-all duration-300"
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl glass hover:border-primary/30 transition-all duration-300 group"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <motion.span 
              className="text-xs font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 group-hover:text-primary transition-colors" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
