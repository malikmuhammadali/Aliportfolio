"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Tag, Award, Linkedin, Building2, Briefcase, GraduationCap, type LucideIcon } from "lucide-react"

type Position = {
  title: string
  period: string
  duration: string
  current: boolean
  linkedinHelped?: boolean
  description: string
  skills: string[]
  certificate?: boolean
}

type CompanyExperience = {
  company: string
  logoIcon: LucideIcon
  logoColor: string
  employmentType: string
  totalDuration: string
  location: string
  positions: Position[]
}

const experiences: CompanyExperience[] = [
  {
    company: "Cplusoft",
    logoIcon: Building2,
    logoColor: "bg-emerald-500/20 text-emerald-400",
    employmentType: "Full-time",
    totalDuration: "1 yr 1 mo",
    location: "Islamabad, Pakistan · On-site",
    positions: [
      {
        title: "AI Automation Engineer",
        period: "Jan 2026 - Present",
        duration: "8 mos",
        current: true,
        linkedinHelped: true,
        description:
          "Design and implement AI-powered automation systems that help businesses eliminate repetitive work, streamline operations, and improve productivity. Build intelligent workflows, AI agents, and custom integrations across the full automation stack.",
        skills: ["n8n", "Zapier", "+10 skills"],
      },
      {
        title: "Software Engineer",
        period: "Aug 2025 - Jan 2026",
        duration: "5 mos",
        current: false,
        description:
          "Designed and developed scalable backend applications and AI-powered automation solutions. Built REST APIs, integrated third-party services, automated business workflows, and collaborated with cross-functional teams.",
        skills: ["Python (Programming Language)", "Generative AI", "+12 skills"],
      },
    ],
  },
  {
    company: "Freelance",
    logoIcon: Briefcase,
    logoColor: "bg-orange-500/20 text-orange-400",
    employmentType: "Self Employed · Freelance",
    totalDuration: "3 yrs 8 mos",
    location: "Islamabad, Pakistan · Remote",
    positions: [
      {
        title: "AI Automation Engineer",
        period: "Jan 2023 - Present",
        duration: "3 yrs 8 mos",
        current: true,
        description:
          "Develop AI-powered workflow automation solutions using n8n, Make.com, Lindy, and custom integrations for international clients across ecommerce, healthcare, and service businesses.",
        skills: ["AI Automation", "n8n", "+5 skills"],
      },
    ],
  },
  {
    company: "Innomatics Research Labs",
    logoIcon: GraduationCap,
    logoColor: "bg-rose-500/20 text-rose-400",
    employmentType: "Internship",
    totalDuration: "3 mos",
    location: "Hyderabad, Telangana, India · Remote",
    positions: [
      {
        title: "Advanced Machine Learning & Generative AI (LLMs)",
        period: "Sep 2024 - Nov 2024",
        duration: "3 mos",
        current: false,
        description:
          "Worked on cutting-edge ML and NLP projects during the internship, building LangChain-based RAG applications and applying prompt engineering and transformer models such as BERT, GPT, and LLaMA.",
        skills: ["Data Analysis", "Machine Learning", "+1 skill"],
        certificate: true,
      },
    ],
  },
]

function PositionItem({ position, isLast, delay }: { position: typeof experiences[0]["positions"][0]; isLast: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative pl-6 ${isLast ? "" : "pb-6"}`}
    >
      {/* Connector line */}
      {!isLast && <div className="absolute left-[5px] top-3 bottom-0 w-px bg-border/40" />}
      {/* Dot */}
      <motion.div
        className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 ${
          position.current ? "bg-primary border-primary" : "bg-background border-border"
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: "spring", stiffness: 300 }}
      />

      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h4 className="font-semibold text-foreground">{position.title}</h4>
        {position.current && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">Current</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
        <Calendar className="w-3.5 h-3.5" />
        <span>{position.period} · {position.duration}</span>
      </div>

      {position.linkedinHelped && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <Linkedin className="w-3.5 h-3.5 text-primary" />
          <span>LinkedIn helped me get this job</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{position.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Tag className="w-3.5 h-3.5 text-muted-foreground" />
        {position.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {position.certificate && (
        <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-secondary/30 w-fit">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-xs text-foreground font-medium">Certificate</span>
        </div>
      )}
    </motion.div>
  )
}

function CompanyBlock({ company, index }: { company: typeof experiences[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300"
    >
      {/* Company Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-xl ${company.logoColor} flex-shrink-0`}>
          <company.logoIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{company.company}</h3>
          <p className="text-sm text-muted-foreground">
            {company.employmentType} · {company.totalDuration}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{company.location}</span>
          </div>
        </div>
      </div>

      {/* Nested Positions */}
      <div className="ml-1">
        {company.positions.map((position, i) => (
          <PositionItem
            key={position.title}
            position={position}
            isLast={i === company.positions.length - 1}
            delay={0.2 + i * 0.15}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

          {/* Company Blocks */}
          <div className="space-y-6">
            {experiences.map((company, index) => (
              <CompanyBlock key={company.company} company={company} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
