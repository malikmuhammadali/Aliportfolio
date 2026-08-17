"use client"

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Star, Quote, ThumbsUp, MessageSquare, Users, Award } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechFlow Inc.",
    image: "/images/client-1.jpg",
    content: "Malik delivered exceptional AI automation that transformed our workflow. His RAG implementation reduced our customer response time by 80%.",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "CTO, DataDrive Solutions",
    image: "/images/client-2.jpg",
    content: "Outstanding work on our LangChain chatbot. Malik's deep understanding of AI/ML made the entire project seamless and highly effective.",
    rating: 5,
  },
  {
    name: "Jennifer Lee",
    role: "Product Manager, InnovateLab",
    image: "/images/client-3.jpg",
    content: "The automation workflows Malik built saved us countless hours. His attention to detail and proactive communication made him a pleasure to work with.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Founder, BrightCart Retail",
    image: "/images/client-4.jpg",
    content: "Our no-show rate dropped noticeably within the first month of the scheduling pipeline going live. Malik understood the logistics problem immediately and never overstepped into anything clinical.",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    role: "Operations Lead, Swift Logistics",
    image: "/images/client-5.jpg",
    content: "Response times went from hours to seconds without sacrificing accuracy. Malik's verification layer meant we never had to double-check the bot's replies before they went out.",
    rating: 5,
  },
]

const stats = [
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Client Satisfaction" },
  { icon: Users, value: 15, suffix: "+", label: "Happy Clients" },
  { icon: MessageSquare, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Award, value: 5, suffix: "", label: "Star Average Rating" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
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
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative glass rounded-2xl p-6 h-full hover:border-primary/40 transition-all duration-300">
        {/* Quote icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
          className="absolute -top-3 -right-3 p-2 rounded-full bg-primary/20 text-primary"
        >
          <Quote className="w-4 h-4" />
        </motion.div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.2 + i * 0.05, type: "spring" }}
            >
              <Star className="w-4 h-4 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <motion.p 
          className="text-muted-foreground text-sm leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          &quot;{testimonial.content}&quot;
        </motion.p>

        {/* Author */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30">
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ClientSatisfaction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Client <span className="gradient-text text-glow">Satisfaction</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Building lasting relationships through exceptional AI solutions and dedicated service.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-4 text-center group hover:border-primary/30 transition-all duration-300"
              >
                <motion.div
                  className="mx-auto mb-2 p-2 rounded-lg bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <stat.icon className="w-5 h-5" />
                </motion.div>
                <div className="text-2xl font-bold gradient-text text-glow mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
