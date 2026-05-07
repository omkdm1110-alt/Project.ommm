"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { StudyTimer } from "@/components/study-timer"
import { ExamsSection } from "@/components/exams-section"
import { NotesSection } from "@/components/notes-section"
import { AIToolsSection } from "@/components/ai-tools-section"
import { PremiumSection } from "@/components/premium-section"
import { DashboardSection } from "@/components/dashboard-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { FocusModeToggle } from "@/components/focus-mode-toggle"

export default function Home() {
  const [focusMode, setFocusMode] = useState(false)

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Navbar */}
      <AnimatePresence>
        {!focusMode && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        
        <StudyTimer />

        <AnimatePresence>
          {!focusMode && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1 }}
            >
              <ExamsSection />
              <NotesSection />
              <AIToolsSection />
              <PremiumSection />
              <DashboardSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <AnimatePresence>
        {!focusMode && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus Mode Toggle */}
      <FocusModeToggle onToggle={setFocusMode} />
    </div>
  )
}
