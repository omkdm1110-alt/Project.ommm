"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Flame, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen,
  Trophy,
  Sparkles,
  RefreshCw,
  X,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const motivationalQuotes = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
]

const weeklyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 5.0 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 6.5 },
  { day: "Sun", hours: 3.0 },
]

const achievements = [
  { name: "First Session", icon: Clock, unlocked: true, description: "Complete your first study session" },
  { name: "7-Day Streak", icon: Flame, unlocked: true, description: "Study for 7 days in a row" },
  { name: "Early Bird", icon: Target, unlocked: true, description: "Study before 7 AM" },
  { name: "Night Owl", icon: Trophy, unlocked: false, description: "Study past midnight" },
  { name: "100 Hours", icon: BookOpen, unlocked: false, description: "Accumulate 100 hours of study time" },
  { name: "Master", icon: Sparkles, unlocked: false, description: "Complete all achievements" },
]

export function DashboardSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [studyStreak] = useState(12)
  const [totalHours] = useState(28.5)
  const [sessionsCompleted] = useState(47)
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const refreshQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
  }

  const maxHours = Math.max(...weeklyData.map(d => d.hours))

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Focus Dashboard
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your progress, maintain streaks, and stay motivated on your learning journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid sm:grid-cols-3 gap-4"
          >
            {/* Study Streak */}
            <Card className="glass border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-1">{studyStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>

            {/* Total Hours */}
            <Card className="glass border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-1">{totalHours}h</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </CardContent>
            </Card>

            {/* Sessions */}
            <Card className="glass border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-1">{sessionsCompleted}</div>
                <div className="text-sm text-muted-foreground">Sessions</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full glass border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Daily Motivation
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={refreshQuote}
                    className="h-8 w-8 hover:bg-primary/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-lg italic leading-relaxed">
                    &ldquo;{motivationalQuotes[currentQuote].quote}&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground text-right">
                    - {motivationalQuotes[currentQuote].author}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Study Time
                </CardTitle>
                <CardDescription>Your study hours this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyData.map((data, index) => (
                    <div 
                      key={data.day} 
                      className="flex-1 flex flex-col items-center gap-2"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="relative w-full">
                        <AnimatePresence>
                          {hoveredBar === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
                            >
                              <span className="text-xs font-medium bg-background px-2 py-1 rounded border border-border whitespace-nowrap">
                                {data.hours}h studied
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(data.hours / maxHours) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`w-full max-w-[40px] mx-auto bg-gradient-to-t from-primary to-accent rounded-t-lg cursor-pointer transition-all ${
                            hoveredBar === index ? "opacity-100 scale-105" : "opacity-80"
                          }`}
                          style={{ minHeight: "20px" }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total this week:</span>
                  <span className="font-semibold text-primary">{weeklyData.reduce((a, b) => a + b.hours, 0).toFixed(1)} hours</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlock badges as you learn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.button
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedAchievement(achievement)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-105 ${
                        achievement.unlocked
                          ? "bg-primary/10 hover:bg-primary/20"
                          : "bg-muted/30 opacity-50 hover:opacity-70"
                      }`}
                    >
                      <achievement.icon
                        className={`w-6 h-6 ${
                          achievement.unlocked ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-xs text-center">{achievement.name}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 text-center text-sm text-muted-foreground">
                  {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="glass border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Achievement
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    selectedAchievement.unlocked
                      ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                      : "bg-muted/50"
                  }`}>
                    <selectedAchievement.icon className={`w-10 h-10 ${
                      selectedAchievement.unlocked ? "text-white" : "text-muted-foreground"
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{selectedAchievement.name}</h3>
                  <p className="text-muted-foreground mb-4">{selectedAchievement.description}</p>
                  {selectedAchievement.unlocked ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">Unlocked!</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground">
                      <span className="text-sm font-medium">Keep studying to unlock</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
