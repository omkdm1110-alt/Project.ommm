"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Focus, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FocusModeToggleProps {
  onToggle: (enabled: boolean) => void
}

export function FocusModeToggle({ onToggle }: FocusModeToggleProps) {
  const [focusMode, setFocusMode] = useState(false)

  const toggleFocusMode = () => {
    const newState = !focusMode
    setFocusMode(newState)
    onToggle(newState)
  }

  return (
    <>
      {/* Focus Mode Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-4 bottom-4 z-50"
      >
        <Button
          onClick={toggleFocusMode}
          className={`rounded-full w-14 h-14 shadow-lg ${
            focusMode
              ? "bg-accent hover:bg-accent/90"
              : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          }`}
        >
          {focusMode ? (
            <X className="w-6 h-6" />
          ) : (
            <Focus className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Focus Mode Banner */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full glass bg-accent/20 border border-accent/50">
              <Moon className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Focus Mode Active</span>
              <span className="text-xs text-muted-foreground">Distractions hidden</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
