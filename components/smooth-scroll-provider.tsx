"use client"

import { useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export function useSmoothScroll() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  
  return { scrollYProgress, smoothProgress }
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

export function ParallaxSection({ 
  children, 
  offset = 50 
}: { 
  children: React.ReactNode
  offset?: number 
}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, offset])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div style={{ y: smoothY }}>
      {children}
    </motion.div>
  )
}
