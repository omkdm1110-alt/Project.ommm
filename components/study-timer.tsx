"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Coffee, BookOpen, Volume2, VolumeX, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const TIMER_MODES = {
  study: { time: 25 * 60, label: "Study Time", icon: BookOpen, color: "primary" },
  break: { time: 5 * 60, label: "Break Time", icon: Coffee, color: "accent" },
}

export function StudyTimer() {
  const [mode, setMode] = useState<"study" | "break">("study")
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.study.time)
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [customStudyTime, setCustomStudyTime] = useState(25)
  const [customBreakTime, setCustomBreakTime] = useState(5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalTime = mode === "study" ? customStudyTime * 60 : customBreakTime * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const playNotificationSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }, [soundEnabled])

  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQYAHIveli4ECwhBnuHWqXwWAD2s08CYZh4EMImvoY1dLyIxZ4KKWB4AADM8dJ2vl4BeO0VMOTICAACVw9y9klU4KDBibJGcnIyBeFZJR1FbdYOVk4d6aFNMQjw=")
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      playNotificationSound()
      setIsRunning(false)
      const nextMode = mode === "study" ? "break" : "study"
      setMode(nextMode)
      setTimeLeft(nextMode === "study" ? customStudyTime * 60 : customBreakTime * 60)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, mode, customStudyTime, customBreakTime, playNotificationSound])

  const toggleTimer = () => setIsRunning((prev) => !prev)

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(mode === "study" ? customStudyTime * 60 : customBreakTime * 60)
  }

  const switchMode = (newMode: "study" | "break") => {
    setMode(newMode)
    setIsRunning(false)
    setTimeLeft(newMode === "study" ? customStudyTime * 60 : customBreakTime * 60)
  }

  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <section id="timer" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Study Timer
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Boost your productivity with the Pomodoro technique. Focus deeply, rest effectively.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            {/* Mode Switcher */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full p-1 bg-muted/50">
                {(Object.keys(TIMER_MODES) as Array<keyof typeof TIMER_MODES>).map((key) => {
                  const { label, icon: Icon } = TIMER_MODES[key]
                  return (
                    <button
                      key={key}
                      onClick={() => switchMode(key)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                        mode === key
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Circular Progress Timer */}
            <div className="relative flex items-center justify-center mb-8">
              <svg className="w-64 h-64 -rotate-90" viewBox="0 0 256 256">
                {/* Background Circle */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  initial={false}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="drop-shadow-[0_0_10px_oklch(0.65_0.25_260)]"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.65 0.25 260)" />
                    <stop offset="100%" stopColor="oklch(0.7 0.22 200)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={timeLeft}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-6xl md:text-7xl font-mono font-bold tabular-nums"
                  >
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
                <p className="text-muted-foreground mt-2">
                  {mode === "study" ? "Stay focused!" : "Take a break!"}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-primary/50 hover:bg-primary/10"
                onClick={resetTimer}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>

              <Button
                size="icon"
                className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30"
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-primary/50 hover:bg-primary/10"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
            </div>

            {/* Settings Toggle */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-muted-foreground"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize Timer
              </Button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Study (min)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          value={customStudyTime}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 25
                            setCustomStudyTime(val)
                            if (mode === "study" && !isRunning) {
                              setTimeLeft(val * 60)
                            }
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-center font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Break (min)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={customBreakTime}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 5
                            setCustomBreakTime(val)
                            if (mode === "break" && !isRunning) {
                              setTimeLeft(val * 60)
                            }
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-center font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
