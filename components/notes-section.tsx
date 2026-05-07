"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Download, 
  Eye,
  Star,
  Clock,
  X,
  Check,
  FlaskConical,
  Briefcase,
  Palette,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Stream-based resource organization
const streams = {
  science: {
    label: "Science",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"]
  },
  commerce: {
    label: "Commerce",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    subjects: ["Accountancy", "Business Studies", "Economics", "Statistics"]
  },
  arts: {
    label: "Arts",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    subjects: ["History", "Political Science", "Geography", "Sociology", "Psychology"]
  }
}

type StreamKey = keyof typeof streams

const allResources = [
  // Science Stream
  { id: 1, title: "Complete Physics Notes - Mechanics to Modern Physics", subject: "Physics", stream: "science" as StreamKey, type: "Notes", pages: 320, rating: 4.9, downloads: 25600, exam: "JEE/NEET", content: "Comprehensive physics notes covering all chapters from NCERT plus advanced concepts for JEE/NEET. Includes Mechanics, Thermodynamics, Waves, Optics, Electromagnetism, and Modern Physics with solved numericals and diagrams." },
  { id: 2, title: "JEE Main Physics PYQs (2019-2024)", subject: "Physics", stream: "science" as StreamKey, type: "PYQ", pages: 180, rating: 4.8, downloads: 18900, exam: "JEE Main", content: "Complete collection of JEE Main Physics questions from 2019-2024 with detailed solutions. Chapter-wise organized with difficulty levels marked. Includes shift-wise papers." },
  { id: 3, title: "NEET Physics PYQs with Solutions", subject: "Physics", stream: "science" as StreamKey, type: "PYQ", pages: 150, rating: 4.8, downloads: 22100, exam: "NEET", content: "All NEET Physics previous year questions from 2015-2024 with detailed explanations. NCERT-based approach with marking scheme." },
  { id: 4, title: "Organic Chemistry Complete Notes", subject: "Chemistry", stream: "science" as StreamKey, type: "Notes", pages: 280, rating: 4.9, downloads: 31200, exam: "JEE/NEET", content: "Master organic chemistry with comprehensive notes covering all named reactions, mechanisms, and conversions. Includes GOC, hydrocarbons, haloalkanes, alcohols, aldehydes, carboxylic acids, and biomolecules." },
  { id: 5, title: "Inorganic Chemistry Quick Revision", subject: "Chemistry", stream: "science" as StreamKey, type: "Notes", pages: 120, rating: 4.7, downloads: 19800, exam: "JEE/NEET", content: "Quick revision notes for inorganic chemistry covering periodic table, coordination compounds, metallurgy, p-block, d-block, and f-block elements with important reactions." },
  { id: 6, title: "Physical Chemistry Formula Sheet", subject: "Chemistry", stream: "science" as StreamKey, type: "Formula", pages: 45, rating: 4.9, downloads: 28500, exam: "JEE/NEET", content: "All physical chemistry formulas in one place - Thermodynamics, Equilibrium, Electrochemistry, Kinetics, Solutions, Surface Chemistry with derivations." },
  { id: 7, title: "NEET Chemistry PYQs Chapter-wise", subject: "Chemistry", stream: "science" as StreamKey, type: "PYQ", pages: 200, rating: 4.8, downloads: 20300, exam: "NEET", content: "NEET Chemistry previous year questions organized chapter-wise from 2015-2024. Includes both organic and inorganic with detailed solutions." },
  { id: 8, title: "Calculus Complete Guide - Limits to Integration", subject: "Mathematics", stream: "science" as StreamKey, type: "Notes", pages: 350, rating: 4.9, downloads: 27800, exam: "JEE", content: "Complete calculus notes from basics to advanced. Covers Limits, Continuity, Differentiability, Methods of Differentiation, Application of Derivatives, Indefinite & Definite Integration." },
  { id: 9, title: "JEE Advanced Mathematics PYQs", subject: "Mathematics", stream: "science" as StreamKey, type: "PYQ", pages: 220, rating: 4.9, downloads: 15600, exam: "JEE Advanced", content: "JEE Advanced Mathematics questions from 2015-2024 with multiple approaches to solutions. Integer type, Matrix match, and comprehension questions included." },
  { id: 10, title: "Coordinate Geometry & Vectors Notes", subject: "Mathematics", stream: "science" as StreamKey, type: "Notes", pages: 180, rating: 4.8, downloads: 16200, exam: "JEE", content: "Complete coordinate geometry and vectors notes - Straight Lines, Circles, Parabola, Ellipse, Hyperbola, and 3D Geometry with locus problems." },
  { id: 11, title: "NEET Biology Complete Notes", subject: "Biology", stream: "science" as StreamKey, type: "Notes", pages: 400, rating: 4.9, downloads: 35600, exam: "NEET", content: "Comprehensive NCERT-based biology notes covering all chapters. Botany, Zoology, Human Physiology, Genetics, Ecology, Biotechnology with diagrams and flowcharts." },
  { id: 12, title: "Biology Diagrams for NEET", subject: "Biology", stream: "science" as StreamKey, type: "Notes", pages: 80, rating: 4.8, downloads: 28900, exam: "NEET", content: "All important biology diagrams required for NEET - Cell structures, Human anatomy, Plant anatomy, Genetics, Ecology flowcharts with labels." },
  { id: 13, title: "NEET Biology PYQs (2015-2024)", subject: "Biology", stream: "science" as StreamKey, type: "PYQ", pages: 250, rating: 4.9, downloads: 32100, exam: "NEET", content: "Complete NEET Biology previous year questions with NCERT page references. Chapter-wise organized with detailed explanations." },

  // Commerce Stream
  { id: 14, title: "Partnership Accounts Complete Notes", subject: "Accountancy", stream: "commerce" as StreamKey, type: "Notes", pages: 120, rating: 4.8, downloads: 18500, exam: "CBSE Class 12", content: "Complete partnership accounts notes - Fundamentals, Goodwill valuation, Admission, Retirement, Death of partner, Dissolution with solved numericals following CBSE pattern." },
  { id: 15, title: "Company Accounts & Financial Statements", subject: "Accountancy", stream: "commerce" as StreamKey, type: "Notes", pages: 150, rating: 4.8, downloads: 17200, exam: "CBSE Class 12", content: "Company accounts covering Issue of Shares, Debentures, Financial Statements preparation, Cash Flow Statement with adjustments and CBSE format answers." },
  { id: 16, title: "Accountancy PYQs CBSE (2019-2024)", subject: "Accountancy", stream: "commerce" as StreamKey, type: "PYQ", pages: 180, rating: 4.9, downloads: 21300, exam: "CBSE Class 12", content: "CBSE Class 12 Accountancy previous year questions from 2019-2024 with step-by-step solutions. Includes adjustments questions and marking scheme." },
  { id: 17, title: "Business Studies Complete Notes", subject: "Business Studies", stream: "commerce" as StreamKey, type: "Notes", pages: 200, rating: 4.7, downloads: 16800, exam: "CBSE Class 12", content: "Comprehensive Business Studies notes - Nature of Management, Principles, Business Environment, Planning, Organising, Staffing, Directing, Controlling, Financial Management, Marketing." },
  { id: 18, title: "Business Studies Case Studies Bank", subject: "Business Studies", stream: "commerce" as StreamKey, type: "Notes", pages: 80, rating: 4.8, downloads: 14200, exam: "CBSE Class 12", content: "Collection of case studies for all chapters with identification of concepts and CBSE-style answers. Most repeated case study types included." },
  { id: 19, title: "Macro Economics Complete Notes", subject: "Economics", stream: "commerce" as StreamKey, type: "Notes", pages: 160, rating: 4.8, downloads: 15600, exam: "CBSE Class 12", content: "Complete Macro Economics notes - National Income, Money & Banking, Government Budget, Balance of Payments with numerical problems and diagrams." },
  { id: 20, title: "Economics PYQs CBSE (2019-2024)", subject: "Economics", stream: "commerce" as StreamKey, type: "PYQ", pages: 140, rating: 4.8, downloads: 13800, exam: "CBSE Class 12", content: "CBSE Economics previous year questions covering both Macro and Micro economics. Includes numerical problems with step-by-step solutions." },
  { id: 21, title: "CA Foundation Accounting Notes", subject: "Accountancy", stream: "commerce" as StreamKey, type: "Notes", pages: 220, rating: 4.9, downloads: 12500, exam: "CA Foundation", content: "Complete CA Foundation accounting notes based on ICAI study material. Covers all concepts with practice questions and past paper solutions." },
  { id: 22, title: "CAT Quantitative Aptitude Notes", subject: "Statistics", stream: "commerce" as StreamKey, type: "Notes", pages: 180, rating: 4.8, downloads: 11200, exam: "CAT", content: "CAT Quantitative Aptitude complete notes with shortcuts and tricks. Covers Arithmetic, Algebra, Geometry, Number System, and Modern Math." },
  { id: 23, title: "CAT Previous Year Papers (2019-2024)", subject: "Statistics", stream: "commerce" as StreamKey, type: "PYQ", pages: 200, rating: 4.9, downloads: 9800, exam: "CAT", content: "CAT previous year papers from 2019-2024 all slots with detailed solutions. Includes QA, VARC, and DILR sections." },

  // Arts/Humanities Stream
  { id: 24, title: "Modern Indian History Notes", subject: "History", stream: "arts" as StreamKey, type: "Notes", pages: 280, rating: 4.8, downloads: 22300, exam: "UPSC/CBSE", content: "Complete Modern Indian History from 1757 to 1947. Covers British rule, Indian National Movement, important leaders, constitutional development with timeline and maps." },
  { id: 25, title: "World History for UPSC", subject: "History", stream: "arts" as StreamKey, type: "Notes", pages: 200, rating: 4.7, downloads: 14600, exam: "UPSC", content: "World History notes covering French Revolution, Industrial Revolution, World Wars, Cold War, Decolonization with UPSC perspective analysis." },
  { id: 26, title: "UPSC History PYQs (2015-2024)", subject: "History", stream: "arts" as StreamKey, type: "PYQ", pages: 150, rating: 4.9, downloads: 18900, exam: "UPSC CSE", content: "UPSC Civil Services History previous year questions from Prelims and Mains. Includes Ancient, Medieval, and Modern History with answer analysis." },
  { id: 27, title: "Indian Polity Complete Notes", subject: "Political Science", stream: "arts" as StreamKey, type: "Notes", pages: 320, rating: 4.9, downloads: 28700, exam: "UPSC/CBSE", content: "Comprehensive Indian Polity notes based on Laxmikanth. Covers Constitution, Parliament, Judiciary, State Government, Local Government, Constitutional Bodies." },
  { id: 28, title: "Political Science CBSE Notes Class 12", subject: "Political Science", stream: "arts" as StreamKey, type: "Notes", pages: 180, rating: 4.8, downloads: 15400, exam: "CBSE Class 12", content: "CBSE Political Science notes covering both books - Contemporary World Politics and Politics in India since Independence with important dates and events." },
  { id: 29, title: "UPSC Polity PYQs Analysis", subject: "Political Science", stream: "arts" as StreamKey, type: "PYQ", pages: 120, rating: 4.8, downloads: 16200, exam: "UPSC CSE", content: "UPSC Polity previous year questions with detailed explanations. Topic-wise organized with recent amendment updates." },
  { id: 30, title: "Indian Geography Complete Notes", subject: "Geography", stream: "arts" as StreamKey, type: "Notes", pages: 250, rating: 4.8, downloads: 19800, exam: "UPSC/CBSE", content: "Complete Indian Geography - Physical features, Climate, Drainage, Natural Vegetation, Agriculture, Industries, Population with map work." },
  { id: 31, title: "Human Geography NCERT Notes", subject: "Geography", stream: "arts" as StreamKey, type: "Notes", pages: 160, rating: 4.7, downloads: 13500, exam: "CBSE Class 12", content: "Human Geography notes based on NCERT - Population, Migration, Human Development, Primary to Quaternary Activities, Transport, International Trade." },
  { id: 32, title: "Sociology Complete Notes", subject: "Sociology", stream: "arts" as StreamKey, type: "Notes", pages: 200, rating: 4.7, downloads: 11200, exam: "CBSE Class 12", content: "CBSE Sociology notes covering Indian Society and Social Change in India. Includes demographic structure, social institutions, cultural diversity, social movements." },
  { id: 33, title: "Psychology Complete Notes", subject: "Psychology", stream: "arts" as StreamKey, type: "Notes", pages: 220, rating: 4.8, downloads: 12800, exam: "CBSE Class 12", content: "CBSE Psychology notes - Intelligence, Self & Personality, Human Development, Psychological Disorders, Therapeutic Approaches, Attitude & Social Cognition." },
  { id: 34, title: "SSC CGL General Awareness Notes", subject: "History", stream: "arts" as StreamKey, type: "Notes", pages: 180, rating: 4.7, downloads: 21500, exam: "SSC CGL", content: "Complete General Awareness notes for SSC CGL covering History, Geography, Polity, Economics, Science, and Current Affairs with previous year questions." },
  { id: 35, title: "CUET General Test Preparation", subject: "Political Science", stream: "arts" as StreamKey, type: "Notes", pages: 140, rating: 4.6, downloads: 9800, exam: "CUET", content: "CUET General Test preparation notes covering GK, Current Affairs, Reasoning, and Numerical Ability for humanities students." },
]

interface Resource {
  id: number
  title: string
  subject: string
  stream: StreamKey
  type: string
  pages: number
  rating: number
  downloads: number
  exam: string
  content: string
}

export function NotesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStream, setSelectedStream] = useState<StreamKey | "all">("all")
  const [selectedSubject, setSelectedSubject] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [viewingResource, setViewingResource] = useState<Resource | null>(null)
  const [downloadedIds, setDownloadedIds] = useState<number[]>([])

  // Get subjects based on selected stream
  const availableSubjects = selectedStream === "all" 
    ? ["All", ...new Set(allResources.map(r => r.subject))]
    : ["All", ...streams[selectedStream].subjects]

  // Filter resources
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.exam.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStream = selectedStream === "all" || resource.stream === selectedStream
    const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject
    const matchesType = !selectedType || resource.type === selectedType
    return matchesSearch && matchesStream && matchesSubject && matchesType
  })

  // Sort by downloads (trending first)
  const sortedResources = [...filteredResources].sort((a, b) => b.downloads - a.downloads)

  const handleDownload = (resource: Resource) => {
    setDownloadedIds(prev => [...prev, resource.id])
    const downloadContent = `${resource.title}
    
═══════════════════════════════════════════
              STUDY MATERIAL
═══════════════════════════════════════════

Subject: ${resource.subject}
Stream: ${streams[resource.stream].label}
Exam: ${resource.exam}
Pages: ${resource.pages}
Rating: ${resource.rating}/5
Downloads: ${resource.downloads.toLocaleString()}

───────────────────────────────────────────
                CONTENT
───────────────────────────────────────────

${resource.content}

───────────────────────────────────────────
              SAMPLE CONTENT
───────────────────────────────────────────

Chapter 1: Introduction
• Basic concepts and definitions
• Historical background
• Importance in syllabus

Chapter 2: Core Topics
• Detailed explanations
• Formulas and derivations
• Solved examples

Chapter 3: Advanced Topics
• Complex problem solving
• Application-based questions
• Previous year patterns

───────────────────────────────────────────
              KEY POINTS
───────────────────────────────────────────

✓ Most important concepts highlighted
✓ Exam-focused content
✓ Practice questions included
✓ Quick revision notes

═══════════════════════════════════════════
         Downloaded from Study Sprint
═══════════════════════════════════════════`
    
    const blob = new Blob([downloadContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resource.title.replace(/\s+/g, '_').replace(/[^\w_]/g, '')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="notes" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Notes & PYQs Library
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access thousands of high-quality study materials organized by stream and subject.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-8 space-y-6"
        >
          {/* Stream Selector */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setSelectedStream("all")
                setSelectedSubject("All")
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                selectedStream === "all"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "glass text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              All Streams
            </button>
            {(Object.keys(streams) as StreamKey[]).map((key) => {
              const { label, icon: Icon, color } = streams[key]
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedStream(key)
                    setSelectedSubject("All")
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                    selectedStream === key
                      ? `bg-gradient-to-r ${color} text-white shadow-lg`
                      : "glass text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              )
            })}
          </div>

          {/* Search and Type Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search notes, PYQs, subjects, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === "Notes" ? "default" : "outline"}
                onClick={() => setSelectedType(selectedType === "Notes" ? null : "Notes")}
                className={selectedType !== "Notes" ? "border-border hover:border-primary/50" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Notes
              </Button>
              <Button
                variant={selectedType === "PYQ" ? "default" : "outline"}
                onClick={() => setSelectedType(selectedType === "PYQ" ? null : "PYQ")}
                className={selectedType !== "PYQ" ? "border-border hover:border-primary/50" : ""}
              >
                <FileText className="w-4 h-4 mr-2" />
                PYQs
              </Button>
              <Button
                variant={selectedType === "Formula" ? "default" : "outline"}
                onClick={() => setSelectedType(selectedType === "Formula" ? null : "Formula")}
                className={selectedType !== "Formula" ? "border-border hover:border-primary/50" : ""}
              >
                <Star className="w-4 h-4 mr-2" />
                Formulas
              </Button>
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {availableSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSubject === subject
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {sortedResources.length} resources
            {selectedStream !== "all" && ` in ${streams[selectedStream].label}`}
            {selectedSubject !== "All" && ` for ${selectedSubject}`}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {sortedResources.map((resource, index) => {
            const streamData = streams[resource.stream]
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="glass border-border/50 hover:border-primary/50 transition-all group h-full flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${streamData.color} bg-opacity-20`}>
                        <streamData.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex gap-1.5">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.type === "Notes" ? "bg-primary/10 text-primary" :
                          resource.type === "PYQ" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"
                        }`}>
                          {resource.type}
                        </span>
                      </div>
                    </div>

                    {/* Title & Subject */}
                    <h3 className="font-semibold mb-1.5 line-clamp-2 group-hover:text-primary transition-colors text-sm">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground">{resource.subject}</span>
                      <span className="text-xs text-muted-foreground">|</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {resource.exam}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {resource.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {resource.pages}p
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        {resource.downloads >= 1000 ? `${(resource.downloads/1000).toFixed(1)}k` : resource.downloads}
                      </span>
                    </div>

                    {/* Actions - pushed to bottom */}
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/50">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-border/50 hover:border-primary/50 h-9"
                        onClick={() => setViewingResource(resource)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-primary to-secondary h-9"
                        onClick={() => handleDownload(resource)}
                      >
                        {downloadedIds.includes(resource.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1.5" />
                            Done
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 mr-1.5" />
                            Get
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {sortedResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* View Resource Modal */}
        <AnimatePresence>
          {viewingResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setViewingResource(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="glass border-border/50">
                  <div className="p-6 border-b border-border/50 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${streams[viewingResource.stream].color}`}>
                        {viewingResource.type === "Notes" ? (
                          <BookOpen className="w-7 h-7 text-white" />
                        ) : (
                          <FileText className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{viewingResource.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{viewingResource.subject}</span>
                          <span className="text-muted-foreground">|</span>
                          <span className="text-sm text-primary">{viewingResource.exam}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingResource(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="p-6 max-h-[55vh] overflow-y-auto">
                    {/* Stats Row */}
                    <div className="flex items-center gap-6 mb-6 pb-4 border-b border-border/50">
                      <span className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {viewingResource.rating} rating
                      </span>
                      <span className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {viewingResource.pages} pages
                      </span>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Download className="w-4 h-4" />
                        {viewingResource.downloads.toLocaleString()} downloads
                      </span>
                    </div>
                    
                    {/* Content Preview */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Overview</h4>
                        <p className="text-foreground leading-relaxed">{viewingResource.content}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">What&apos;s Included</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>{viewingResource.pages} pages of comprehensive content</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Detailed explanations with examples</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Practice problems with solutions</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Updated for {viewingResource.exam} {new Date().getFullYear()} pattern</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Quick revision notes & key points</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Study Tip</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Best used for: {viewingResource.type === "PYQ" ? "Practice and self-assessment before exams" : "Building strong conceptual foundation and revision"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-border/50">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary h-12 text-base"
                      onClick={() => {
                        handleDownload(viewingResource)
                        setViewingResource(null)
                      }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
