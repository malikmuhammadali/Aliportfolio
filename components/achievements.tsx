"use client"

import { motion, useInView, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Zap, Globe, Rocket, TrendingDown } from "lucide-react"

const achievements = [
  {
    icon: TrendingDown,
    value: 90,
    prefix: "",
    suffix: "%",
    label: "Manual Work Reduced",
    description: "Through intelligent automation workflows",
  },
  {
    icon: Rocket,
    value: 10,
    prefix: "",
    suffix: "+",
    label: "AI Systems Built",
    description: "Deployed and maintained at scale",
  },
  {
    icon: Globe,
    value: 5,
    prefix: "",
    suffix: "+",
    label: "International Clients",
    description: "Delivered solutions globally",
  },
  {
    icon: Zap,
    value: 99,
    prefix: "",
    suffix: "%",
    label: "System Uptime",
    description: "Reliable backend infrastructure",
  },
]

function AnimatedCounter({ 
  value, 
  prefix, 
  suffix, 
  isInView 
}: { 
  value: number
  prefix: string
  suffix: string
  isInView: boolean 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      })
      return () => controls.stop()
    }
  }, [isInView, value])

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        delay: 0.2 + index * 0.1, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
      />
      
      <motion.div
        className="relative glass rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 h-full"
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ 
            delay: 0.3 + index * 0.1, 
            type: "spring", 
            stiffness: 200 
          }}
          className="mx-auto mb-4 p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:bg-primary/20 transition-all duration-300"
        >
          <motion.div
            whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <achievement.icon className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Value with animated counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
          className="text-3xl sm:text-4xl font-bold gradient-text text-glow mb-2"
        >
          <AnimatedCounter 
            value={achievement.value} 
            prefix={achievement.prefix}
            suffix={achievement.suffix}
            isInView={isInView}
          />
        </motion.div>

        {/* Label */}
        <motion.div 
          className="font-semibold text-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {achievement.label}
        </motion.div>
        
        {/* Description */}
        <motion.p 
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          {achievement.description}
        </motion.p>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Key <span className="gradient-text text-glow">Achievements</span>
            </motion.h2>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.label} achievement={achievement} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
