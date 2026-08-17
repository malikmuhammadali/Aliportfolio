"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Github, Linkedin, Send, CheckCircle, Loader2, MapPin, Clock } from "lucide-react"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setFormState("success")
    setFormData({ name: "", email: "", message: "" })
    
    setTimeout(() => setFormState("idle"), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4"
            >
              Contact
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Let&apos;s <span className="gradient-text text-glow">Connect</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info - Left Side */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-4"
            >
              {/* Email Card */}
              <motion.a
                href="mailto:malikmuhammadali0034@gmail.com"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-5 glass rounded-xl hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div 
                  className="relative p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <div className="relative">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                    malikmuhammadali0034@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 p-5 glass rounded-xl group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium text-sm">Pakistan (Remote Friendly)</p>
                </div>
              </motion.div>

              {/* Timezone Card */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 p-5 glass rounded-xl group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-foreground font-medium text-sm">Within 24 hours</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 p-4 glass rounded-xl hover:border-primary/40 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div 
                className="p-5 glass rounded-xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-primary to-green-500"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-foreground font-medium">Available for opportunities</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently open to full-time positions and freelance projects in AI/ML and automation.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3"
            >
              <motion.form 
                onSubmit={handleSubmit} 
                className="glass rounded-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 40px rgba(0, 255, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 100%" }}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    animate={{ scale: focusedField === "name" ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: focusedField === "email" ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-sm"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formState !== "idle"}
                  whileHover={{ 
                    scale: formState === "idle" ? 1.02 : 1,
                    boxShadow: formState === "idle" ? "0 0 30px rgba(0, 255, 255, 0.4)" : "none",
                  }}
                  whileTap={{ scale: formState === "idle" ? 0.98 : 1 }}
                  className={`w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    formState === "success"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {formState === "idle" && (
                    <>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.span>
                      Send Message
                    </>
                  )}
                  {formState === "loading" && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  )}
                  {formState === "success" && (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.span>
                      Message Sent!
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
