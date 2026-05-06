"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

function FloatingParticle({ index }: { index: number }) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 5
  const randomDuration = 15 + Math.random() * 10
  const size = 2 + Math.random() * 4

  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{
        left: `${randomX}%`,
        width: size,
        height: size,
      }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-100vh",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const orbY1 = useTransform(smoothScroll, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothScroll, [0, 1], [0, -150])
  const orbY3 = useTransform(smoothScroll, [0, 1], [0, -100])
  const orbScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.2, 0.8])
  const orbOpacity = useTransform(smoothScroll, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.4, 0.2])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main gradient orbs with parallax */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl"
        style={{ y: orbY1, scale: orbScale, opacity: orbOpacity }}
      />
      <motion.div
        className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl"
        style={{ y: orbY2, scale: orbScale, opacity: orbOpacity }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl"
        style={{ y: orbY3, opacity: orbOpacity }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.03]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}
