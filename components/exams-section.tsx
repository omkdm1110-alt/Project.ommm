"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Trophy,
  School,
  ChevronRight,
  Download,
  Eye,
  X,
  Check,
  FlaskConical,
  Briefcase,
  Palette,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Stream-wise exam data structure
const examStreams = {
  science: {
    label: "Science",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    description: "Engineering, Medical & Research",
    competitive: [
      {
        id: "jee",
        name: "JEE Main & Advanced",
        fullName: "Joint Entrance Examination",
        description: "For IITs, NITs, IIITs & other engineering colleges",
        subjects: ["Physics", "Chemistry", "Mathematics"],
        pyqs: [
          { year: "2024", sessions: ["January", "April"] },
          { year: "2023", sessions: ["January", "April"] },
          { year: "2022", sessions: ["June", "July"] },
          { year: "2021", sessions: ["February", "March", "July", "August"] },
        ],
        notes: [
          { subject: "Physics", topics: ["Mechanics", "Electromagnetism", "Optics", "Modern Physics", "Thermodynamics"] },
          { subject: "Chemistry", topics: ["Organic", "Inorganic", "Physical Chemistry"] },
          { subject: "Mathematics", topics: ["Calculus", "Algebra", "Coordinate Geometry", "Trigonometry", "Vectors"] },
        ],
        resources: ["Formula Sheet", "Syllabus 2025", "Exam Pattern", "Preparation Tips", "Previous Toppers Strategy"]
      },
      {
        id: "neet",
        name: "NEET UG",
        fullName: "National Eligibility cum Entrance Test",
        description: "For MBBS, BDS & other medical courses",
        subjects: ["Physics", "Chemistry", "Biology"],
        pyqs: [
          { year: "2024", sessions: ["May"] },
          { year: "2023", sessions: ["May"] },
          { year: "2022", sessions: ["July"] },
          { year: "2021", sessions: ["September"] },
        ],
        notes: [
          { subject: "Physics", topics: ["Mechanics", "Electrodynamics", "Optics", "Modern Physics"] },
          { subject: "Chemistry", topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
          { subject: "Biology", topics: ["Botany", "Zoology", "Human Physiology", "Genetics", "Ecology"] },
        ],
        resources: ["Formula Sheet", "NCERT Highlights", "Syllabus 2025", "Exam Pattern", "Biology Diagrams"]
      },
      {
        id: "gate",
        name: "GATE",
        fullName: "Graduate Aptitude Test in Engineering",
        description: "For M.Tech/M.E. admissions & PSU jobs",
        subjects: ["Engineering Subjects", "Mathematics", "General Aptitude"],
        pyqs: [
          { year: "2024", sessions: ["February"] },
          { year: "2023", sessions: ["February"] },
          { year: "2022", sessions: ["February"] },
          { year: "2021", sessions: ["February"] },
        ],
        notes: [
          { subject: "Engineering", topics: ["Core Subjects", "Engineering Mathematics", "General Aptitude"] },
          { subject: "Mathematics", topics: ["Linear Algebra", "Calculus", "Differential Equations", "Probability"] },
          { subject: "Aptitude", topics: ["Verbal Ability", "Numerical Ability", "Reasoning"] },
        ],
        resources: ["Formula Handbook", "Syllabus", "Exam Pattern", "Branch-wise Strategy"]
      },
    ],
    board: [
      {
        id: "cbse-12-science",
        name: "CBSE Class 12 Science",
        fullName: "Central Board of Secondary Education",
        description: "Science stream board examination",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
        pyqs: [
          { year: "2024", sessions: ["March"] },
          { year: "2023", sessions: ["March"] },
          { year: "2022", sessions: ["Term 1", "Term 2"] },
          { year: "2021", sessions: ["Board Cancelled - Internal Assessment"] },
        ],
        notes: [
          { subject: "Physics", topics: ["Electrostatics", "Current Electricity", "Magnetism", "Optics", "Atoms & Nuclei", "Semiconductors"] },
          { subject: "Chemistry", topics: ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Organic Compounds"] },
          { subject: "Mathematics", topics: ["Relations & Functions", "Calculus", "Vectors", "3D Geometry", "Probability"] },
          { subject: "Biology", topics: ["Reproduction", "Genetics", "Biology in Human Welfare", "Biotechnology", "Ecology"] },
        ],
        resources: ["Sample Papers", "NCERT Solutions", "Important Questions", "Marking Scheme", "Lab Manual"]
      },
      {
        id: "cbse-10",
        name: "CBSE Class 10",
        fullName: "Central Board of Secondary Education",
        description: "Secondary school board examination",
        subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
        pyqs: [
          { year: "2024", sessions: ["March"] },
          { year: "2023", sessions: ["March"] },
          { year: "2022", sessions: ["Term 1", "Term 2"] },
          { year: "2021", sessions: ["Board Cancelled"] },
        ],
        notes: [
          { subject: "Mathematics", topics: ["Real Numbers", "Polynomials", "Quadratic Equations", "Geometry", "Trigonometry", "Statistics"] },
          { subject: "Science", topics: ["Chemical Reactions", "Life Processes", "Electricity", "Light", "Natural Resources"] },
          { subject: "Social Science", topics: ["History", "Geography", "Political Science", "Economics"] },
        ],
        resources: ["Sample Papers", "NCERT Solutions", "Important Questions", "Marking Scheme"]
      },
      {
        id: "isc-12-science",
        name: "ISC Class 12 Science",
        fullName: "Indian School Certificate",
        description: "Science stream CISCE board examination",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
        pyqs: [
          { year: "2024", sessions: ["February-March"] },
          { year: "2023", sessions: ["February-March"] },
          { year: "2022", sessions: ["Semester System"] },
        ],
        notes: [
          { subject: "Physics", topics: ["Electrostatics", "Current Electricity", "Optics", "Nuclear Physics"] },
          { subject: "Chemistry", topics: ["Solutions", "Electrochemistry", "Organic Chemistry", "Biomolecules"] },
          { subject: "Mathematics", topics: ["Calculus", "Algebra", "Probability", "Vectors"] },
        ],
        resources: ["Sample Papers", "Specimen Papers", "Marking Scheme", "Syllabus"]
      },
    ]
  },
  commerce: {
    label: "Commerce",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    description: "Business, Finance & Management",
    competitive: [
      {
        id: "cat",
        name: "CAT",
        fullName: "Common Admission Test",
        description: "For IIMs and top B-schools",
        subjects: ["Quantitative Ability", "Verbal Ability", "DILR"],
        pyqs: [
          { year: "2024", sessions: ["Slot 1", "Slot 2", "Slot 3"] },
          { year: "2023", sessions: ["Slot 1", "Slot 2", "Slot 3"] },
          { year: "2022", sessions: ["Slot 1", "Slot 2", "Slot 3"] },
          { year: "2021", sessions: ["Slot 1", "Slot 2", "Slot 3"] },
        ],
        notes: [
          { subject: "Quantitative Ability", topics: ["Arithmetic", "Algebra", "Geometry", "Number System", "Modern Math"] },
          { subject: "Verbal Ability", topics: ["Reading Comprehension", "Para Jumbles", "Sentence Correction", "Vocabulary"] },
          { subject: "DILR", topics: ["Data Interpretation", "Logical Reasoning", "Puzzles", "Arrangements"] },
        ],
        resources: ["Formula Sheet", "Vocabulary List", "Shortcuts & Tricks", "Mock Test Strategy", "IIM Selection Criteria"]
      },
      {
        id: "ca-foundation",
        name: "CA Foundation",
        fullName: "Chartered Accountant Foundation",
        description: "Entry level for CA course by ICAI",
        subjects: ["Accounting", "Business Law", "Quantitative Aptitude", "Economics"],
        pyqs: [
          { year: "2024", sessions: ["May", "November"] },
          { year: "2023", sessions: ["May", "November"] },
          { year: "2022", sessions: ["May", "November"] },
        ],
        notes: [
          { subject: "Accounting", topics: ["Journal Entries", "Ledger", "Final Accounts", "Depreciation", "Bank Reconciliation"] },
          { subject: "Business Law", topics: ["Contract Act", "Partnership Act", "Companies Act", "LLP Act"] },
          { subject: "Quantitative Aptitude", topics: ["Ratio", "Equations", "Statistics", "Probability"] },
          { subject: "Economics", topics: ["Micro Economics", "Macro Economics", "Indian Economy"] },
        ],
        resources: ["ICAI Study Material", "Practice Manual", "Exam Pattern", "Suggested Answers"]
      },
      {
        id: "cma-foundation",
        name: "CMA Foundation",
        fullName: "Cost & Management Accountant Foundation",
        description: "Entry level for CMA course by ICMAI",
        subjects: ["Fundamentals of Economics", "Fundamentals of Accounting", "Fundamentals of Laws", "Fundamentals of Management"],
        pyqs: [
          { year: "2024", sessions: ["June", "December"] },
          { year: "2023", sessions: ["June", "December"] },
        ],
        notes: [
          { subject: "Economics", topics: ["Micro Economics", "Macro Economics", "Business Economics"] },
          { subject: "Accounting", topics: ["Basic Accounting", "Final Accounts", "Cost Concepts"] },
        ],
        resources: ["Study Material", "Exam Pattern", "Syllabus", "Practice Questions"]
      },
    ],
    board: [
      {
        id: "cbse-12-commerce",
        name: "CBSE Class 12 Commerce",
        fullName: "Central Board of Secondary Education",
        description: "Commerce stream board examination",
        subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics/IP", "English"],
        pyqs: [
          { year: "2024", sessions: ["March"] },
          { year: "2023", sessions: ["March"] },
          { year: "2022", sessions: ["Term 1", "Term 2"] },
        ],
        notes: [
          { subject: "Accountancy", topics: ["Partnership", "Company Accounts", "Financial Statements", "Cash Flow Statement"] },
          { subject: "Business Studies", topics: ["Nature of Management", "Principles of Management", "Business Environment", "Planning", "Marketing"] },
          { subject: "Economics", topics: ["National Income", "Money & Banking", "Government Budget", "Balance of Payments"] },
          { subject: "Mathematics", topics: ["Matrices", "Calculus", "Linear Programming", "Probability"] },
        ],
        resources: ["Sample Papers", "NCERT Solutions", "Important Questions", "Case Studies", "Project Guidelines"]
      },
      {
        id: "isc-12-commerce",
        name: "ISC Class 12 Commerce",
        fullName: "Indian School Certificate",
        description: "Commerce stream CISCE board examination",
        subjects: ["Accounts", "Commerce", "Economics", "Mathematics", "English"],
        pyqs: [
          { year: "2024", sessions: ["February-March"] },
          { year: "2023", sessions: ["February-March"] },
          { year: "2022", sessions: ["Semester System"] },
        ],
        notes: [
          { subject: "Accounts", topics: ["Partnership", "Company Accounts", "Analysis of Financial Statements"] },
          { subject: "Commerce", topics: ["Business Environment", "Corporate Governance", "Marketing"] },
          { subject: "Economics", topics: ["Macro Economics", "Indian Economic Development"] },
        ],
        resources: ["Sample Papers", "Specimen Papers", "Marking Scheme"]
      },
    ]
  },
  arts: {
    label: "Arts & Humanities",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    description: "Social Sciences, Languages & Civil Services",
    competitive: [
      {
        id: "upsc",
        name: "UPSC CSE",
        fullName: "Civil Services Examination",
        description: "For IAS, IPS, IFS and other Group A services",
        subjects: ["General Studies", "CSAT", "Optional Subject", "Essay"],
        pyqs: [
          { year: "2024", sessions: ["Prelims", "Mains"] },
          { year: "2023", sessions: ["Prelims", "Mains"] },
          { year: "2022", sessions: ["Prelims", "Mains"] },
          { year: "2021", sessions: ["Prelims", "Mains"] },
        ],
        notes: [
          { subject: "General Studies", topics: ["History", "Geography", "Polity", "Economy", "Environment", "Science & Tech", "Current Affairs"] },
          { subject: "CSAT", topics: ["Comprehension", "Logical Reasoning", "Analytical Ability", "Decision Making", "Basic Numeracy"] },
          { subject: "Essay", topics: ["Philosophical", "Social Issues", "Economic", "Political", "Environmental"] },
        ],
        resources: ["Syllabus", "Booklist", "Topper Notes", "Current Affairs Monthly", "Answer Writing Practice"]
      },
      {
        id: "ssc-cgl",
        name: "SSC CGL",
        fullName: "Combined Graduate Level Examination",
        description: "For Group B & C posts in central government",
        subjects: ["Quantitative Aptitude", "English", "General Awareness", "Reasoning"],
        pyqs: [
          { year: "2024", sessions: ["Tier 1", "Tier 2"] },
          { year: "2023", sessions: ["Tier 1", "Tier 2"] },
          { year: "2022", sessions: ["Tier 1", "Tier 2"] },
        ],
        notes: [
          { subject: "Quantitative Aptitude", topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Data Interpretation"] },
          { subject: "English", topics: ["Grammar", "Vocabulary", "Comprehension", "Error Spotting"] },
          { subject: "General Awareness", topics: ["History", "Geography", "Polity", "Economics", "Science", "Current Affairs"] },
          { subject: "Reasoning", topics: ["Verbal Reasoning", "Non-Verbal Reasoning", "Analogy", "Coding-Decoding"] },
        ],
        resources: ["Syllabus", "Exam Pattern", "Previous Papers", "Cut-off Analysis"]
      },
      {
        id: "cuet",
        name: "CUET UG",
        fullName: "Common University Entrance Test",
        description: "For admission to central universities",
        subjects: ["Language", "Domain Subjects", "General Test"],
        pyqs: [
          { year: "2024", sessions: ["May"] },
          { year: "2023", sessions: ["May"] },
          { year: "2022", sessions: ["July-August"] },
        ],
        notes: [
          { subject: "Languages", topics: ["English", "Hindi", "Regional Languages"] },
          { subject: "Domain Subjects", topics: ["History", "Political Science", "Geography", "Economics", "Sociology"] },
          { subject: "General Test", topics: ["General Knowledge", "Current Affairs", "Reasoning", "Numerical Ability"] },
        ],
        resources: ["Syllabus", "Exam Pattern", "University-wise Cut-offs", "Mock Tests"]
      },
    ],
    board: [
      {
        id: "cbse-12-humanities",
        name: "CBSE Class 12 Humanities",
        fullName: "Central Board of Secondary Education",
        description: "Arts/Humanities stream board examination",
        subjects: ["History", "Political Science", "Geography", "Economics", "Sociology", "Psychology", "English"],
        pyqs: [
          { year: "2024", sessions: ["March"] },
          { year: "2023", sessions: ["March"] },
          { year: "2022", sessions: ["Term 1", "Term 2"] },
        ],
        notes: [
          { subject: "History", topics: ["Bricks, Beads and Bones", "Kings, Farmers and Towns", "Through the Eyes of Travellers", "Rebels and the Raj", "Framing the Constitution"] },
          { subject: "Political Science", topics: ["Cold War Era", "End of Bipolarity", "US Hegemony", "Rise of China", "Indian Politics"] },
          { subject: "Geography", topics: ["Human Geography", "Population", "Migration", "Human Development", "Primary Activities"] },
          { subject: "Sociology", topics: ["Indian Society", "Social Change", "Cultural Change", "Social Movements"] },
          { subject: "Psychology", topics: ["Intelligence", "Self & Personality", "Psychological Disorders", "Therapeutic Approaches"] },
        ],
        resources: ["Sample Papers", "NCERT Solutions", "Map Work", "Important Questions", "Answer Writing Tips"]
      },
      {
        id: "isc-12-humanities",
        name: "ISC Class 12 Humanities",
        fullName: "Indian School Certificate",
        description: "Humanities stream CISCE board examination",
        subjects: ["History", "Political Science", "Geography", "Sociology", "English"],
        pyqs: [
          { year: "2024", sessions: ["February-March"] },
          { year: "2023", sessions: ["February-March"] },
          { year: "2022", sessions: ["Semester System"] },
        ],
        notes: [
          { subject: "History", topics: ["Modern India", "World History", "Indian National Movement"] },
          { subject: "Political Science", topics: ["Indian Constitution", "International Relations", "Political Theory"] },
        ],
        resources: ["Sample Papers", "Specimen Papers", "Marking Scheme"]
      },
    ]
  }
}

type StreamKey = keyof typeof examStreams
type ExamType = "competitive" | "board"

interface Exam {
  id: string
  name: string
  fullName: string
  description: string
  subjects: string[]
  pyqs: { year: string; sessions: string[] }[]
  notes: { subject: string; topics: string[] }[]
  resources: string[]
}

interface ViewingContent {
  type: "pyq" | "notes" | "resource"
  title: string
  content: string
  exam: string
}

export function ExamsSection() {
  const [activeStream, setActiveStream] = useState<StreamKey>("science")
  const [activeExamType, setActiveExamType] = useState<ExamType>("competitive")
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)
  const [viewingContent, setViewingContent] = useState<ViewingContent | null>(null)
  const [downloadedItems, setDownloadedItems] = useState<string[]>([])

  const currentStream = examStreams[activeStream]
  const currentExams = activeExamType === "competitive" ? currentStream.competitive : currentStream.board

  const handleView = (type: "pyq" | "notes" | "resource", title: string, examName: string, details?: string) => {
    let content = ""
    if (type === "pyq") {
      content = `${examName} - ${title}

═══════════════════════════════════════════
                QUESTION PAPER
═══════════════════════════════════════════

Exam: ${examName}
Year: ${title}
${details ? `Session: ${details}` : ""}

───────────────────────────────────────────
                INSTRUCTIONS
───────────────────────────────────────────

1. Total Duration: 3 Hours
2. Maximum Marks: 100
3. Read all instructions carefully before attempting
4. Write your Roll Number on the answer sheet

───────────────────────────────────────────
            SECTION A: OBJECTIVE
───────────────────────────────────────────

Q1. Multiple Choice Questions (20 × 1 = 20 marks)

1. Which of the following statements is correct?
   (a) Option A
   (b) Option B
   (c) Option C ✓
   (d) Option D

2. The value of the given expression is:
   (a) 10  (b) 20 ✓  (c) 30  (d) 40

[Questions 3-20 continue in similar format...]

───────────────────────────────────────────
            SECTION B: SHORT ANSWER
───────────────────────────────────────────

Q2. Answer the following questions: (5 × 4 = 20 marks)

(a) Define the main concept and give two examples.

(b) Derive the formula for the given scenario.

(c) Explain the process with a diagram.

(d) Compare and contrast the two approaches.

(e) Calculate the required value using given data.

───────────────────────────────────────────
            SECTION C: LONG ANSWER
───────────────────────────────────────────

Q3. Long Answer Questions (4 × 10 = 40 marks)

(a) Explain in detail the mechanism involved in the process.
    [10 marks]

(b) Derive the equation from first principles and solve the 
    numerical problem. [10 marks]

(c) Discuss the significance and applications with examples.
    [10 marks]

(d) Analyze the case study and provide your conclusions.
    [10 marks]

───────────────────────────────────────────
            ANSWER KEY
───────────────────────────────────────────

Section A: 1-C, 2-B, 3-A, 4-D, 5-C...
Section B: Model answers available in solutions
Section C: Detailed solutions with marking scheme

═══════════════════════════════════════════
           END OF QUESTION PAPER
═══════════════════════════════════════════`
    } else if (type === "notes") {
      content = `${examName} - ${title}

═══════════════════════════════════════════
            COMPREHENSIVE STUDY NOTES
═══════════════════════════════════════════

Subject: ${title.replace(" Notes", "")}
Exam: ${examName}
${details ? `Topic: ${details}` : ""}

───────────────────────────────────────────
            CHAPTER OVERVIEW
───────────────────────────────────────────

1. INTRODUCTION
   
   • Definition and basic concepts
   • Historical background and development
   • Importance in the syllabus
   • Weightage in examination

2. FUNDAMENTAL CONCEPTS
   
   • Core principles explained
   • Key terminology defined
   • Theoretical framework
   • Mathematical representations

3. DETAILED EXPLANATION
   
   • Step-by-step breakdown
   • Diagrams and illustrations
   • Real-world examples
   • Common applications

───────────────────────────────────────────
            IMPORTANT FORMULAS
───────────────────────────────────────────

Formula 1: [Basic equation]
           Expression = Variable × Constant
           
Formula 2: [Derived equation]
           Result = (Input₁ + Input₂) / Factor

Formula 3: [Application formula]
           Output = Function(Parameters)

───────────────────────────────────────────
            SOLVED EXAMPLES
───────────────────────────────────────────

Example 1:
Given: Initial conditions
Find: Required value
Solution: 
Step 1: Apply the relevant formula
Step 2: Substitute known values
Step 3: Calculate and simplify
Answer: Final result with units

Example 2:
[Similar structured solution...]

───────────────────────────────────────────
            PRACTICE PROBLEMS
───────────────────────────────────────────

1. Basic level question [2 marks]
2. Intermediate level question [3 marks]
3. Advanced level question [5 marks]
4. Previous year question [4 marks]
5. Application-based question [5 marks]

───────────────────────────────────────────
            KEY POINTS TO REMEMBER
───────────────────────────────────────────

✓ Point 1: Most important concept
✓ Point 2: Frequently asked in exams
✓ Point 3: Common mistake to avoid
✓ Point 4: Shortcut method
✓ Point 5: Memory trick/mnemonic

───────────────────────────────────────────
            QUICK REVISION
───────────────────────────────────────────

□ Definition: One-line summary
□ Formula: Key equation
□ Diagram: Essential figure
□ Example: Standard problem type
□ Application: Real-world use

═══════════════════════════════════════════
              END OF NOTES
═══════════════════════════════════════════`
    } else {
      content = `${examName} - ${title}

═══════════════════════════════════════════
              QUICK REFERENCE
═══════════════════════════════════════════

Resource: ${title}
Exam: ${examName}

───────────────────────────────────────────
                CONTENTS
───────────────────────────────────────────

${title.includes("Formula") ? `
FORMULA SHEET

Chapter 1: Basic Formulas
• Formula A = Expression
• Formula B = Calculation
• Formula C = Derivation

Chapter 2: Advanced Formulas
• Complex Formula 1
• Complex Formula 2

Quick Reference Table:
┌─────────────┬────────────────┬─────────┐
│ Concept     │ Formula        │ Unit    │
├─────────────┼────────────────┼─────────┤
│ Item 1      │ A = B × C      │ Unit 1  │
│ Item 2      │ D = E / F      │ Unit 2  │
│ Item 3      │ G = H + I      │ Unit 3  │
└─────────────┴────────────────┴─────────┘
` : ""}

${title.includes("Syllabus") ? `
DETAILED SYLLABUS

Unit 1: Introduction (Weightage: 15%)
• Topic 1.1
• Topic 1.2
• Topic 1.3

Unit 2: Core Concepts (Weightage: 25%)
• Topic 2.1
• Topic 2.2
• Topic 2.3

Unit 3: Applications (Weightage: 30%)
• Topic 3.1
• Topic 3.2

Unit 4: Advanced Topics (Weightage: 30%)
• Topic 4.1
• Topic 4.2
` : ""}

${title.includes("Pattern") ? `
EXAM PATTERN DETAILS

Total Duration: 3 Hours
Total Marks: 100

Section-wise Distribution:
├── Section A: Objective (30 marks)
│   └── 30 MCQs × 1 mark each
├── Section B: Short Answer (30 marks)
│   └── 10 questions × 3 marks each
└── Section C: Long Answer (40 marks)
    └── 4 questions × 10 marks each

Marking Scheme:
• Correct Answer: Full marks
• Wrong Answer: Negative marking (if applicable)
• Unattempted: Zero marks
` : ""}

${title.includes("Tips") || title.includes("Strategy") ? `
PREPARATION STRATEGY

Month 1-2: Foundation Building
• Complete NCERT/Basic books
• Make short notes
• Solve chapter-end questions

Month 3-4: Advanced Preparation  
• Reference books
• Previous year questions
• Topic-wise tests

Month 5-6: Revision & Practice
• Mock tests
• Revision of weak areas
• Time management practice

Daily Schedule:
06:00 - 08:00: Fresh topics
09:00 - 12:00: Practice problems
14:00 - 17:00: Revision
19:00 - 21:00: Mock tests/PYQs
` : ""}

───────────────────────────────────────────
            DOWNLOAD COMPLETE
───────────────────────────────────────────

This resource is designed to help you prepare 
effectively for ${examName}. Use it alongside 
your regular study materials for best results.

═══════════════════════════════════════════`
    }
    setViewingContent({ type, title, content, exam: examName })
  }

  const handleDownload = (title: string, content?: string) => {
    const downloadContent = content || `${title}\n\nDownloaded from Study Sprint\n\nThis is a sample download. In production, this would contain the full content.`
    const blob = new Blob([downloadContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_').replace(/[^\w_]/g, '')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setDownloadedItems(prev => [...prev, title])
  }

  return (
    <section id="exams" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Exam Preparation
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organized resources by stream - Science, Commerce & Arts. Find PYQs and notes specific to your exam.
          </p>
        </motion.div>

        {/* Stream Selector */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Stream Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(examStreams) as StreamKey[]).map((key) => {
              const { label, icon: Icon, color, description } = examStreams[key]
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveStream(key)
                    setSelectedExam(null)
                    setExpandedSubject(null)
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${
                    activeStream === key
                      ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                      : "glass text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{label}</div>
                    <div className={`text-xs ${activeStream === key ? "text-white/80" : "text-muted-foreground"}`}>
                      {description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Exam Type Tabs */}
          <div className="inline-flex rounded-xl p-1 glass">
            <button
              onClick={() => {
                setActiveExamType("competitive")
                setSelectedExam(null)
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeExamType === "competitive"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4" />
              Competitive Exams
            </button>
            <button
              onClick={() => {
                setActiveExamType("board")
                setSelectedExam(null)
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeExamType === "board"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <School className="w-4 h-4" />
              Board Exams
            </button>
          </div>
        </div>

        {/* Exams Grid or Details */}
        <AnimatePresence mode="wait">
          {!selectedExam ? (
            <motion.div
              key="exams-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {currentExams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="glass border-border/50 hover:border-primary/50 transition-all cursor-pointer group h-full"
                    onClick={() => setSelectedExam(exam)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentStream.color} bg-opacity-20 flex items-center justify-center`}>
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardTitle className="mt-4">{exam.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {exam.subjects.slice(0, 3).map((subject) => (
                          <span
                            key={subject}
                            className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                          >
                            {subject}
                          </span>
                        ))}
                        {exam.subjects.length > 3 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                            +{exam.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {exam.pyqs.length} years PYQs
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {exam.notes.length} subjects
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="exam-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedExam(null)
                  setExpandedSubject(null)
                }}
                className="mb-6"
              >
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                Back to {currentStream.label} {activeExamType === "competitive" ? "Competitive" : "Board"} Exams
              </Button>

              <Card className="glass border-border/50">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStream.color} flex items-center justify-center`}>
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedExam.name}</CardTitle>
                      <CardDescription className="text-base">{selectedExam.fullName}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">{selectedExam.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  {/* PYQs Section */}
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                      <FileText className="w-5 h-5 text-accent" />
                      Previous Year Questions
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {selectedExam.pyqs.map((pyq) => (
                        <div
                          key={pyq.year}
                          className="p-4 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <div className="font-semibold mb-3">{pyq.year}</div>
                          <div className="space-y-2">
                            {pyq.sessions.map((session) => {
                              const itemTitle = `${selectedExam.name} ${pyq.year} - ${session}`
                              const isDownloaded = downloadedItems.includes(itemTitle)
                              return (
                                <div
                                  key={session}
                                  className="flex items-center justify-between p-2 rounded-lg bg-background/50 text-sm"
                                >
                                  <span className="truncate">{session}</span>
                                  <div className="flex gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      className="h-7 w-7 p-0"
                                      onClick={() => handleView("pyq", `${pyq.year} ${session}`, selectedExam.name, session)}
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      className="h-7 w-7 p-0"
                                      onClick={() => handleDownload(itemTitle)}
                                    >
                                      {isDownloaded ? (
                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                      ) : (
                                        <Download className="w-3.5 h-3.5" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Study Notes by Subject
                    </h3>
                    <div className="space-y-3">
                      {selectedExam.notes.map((note) => (
                        <div
                          key={note.subject}
                          className="rounded-xl border border-border/50 overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedSubject(expandedSubject === note.subject ? null : note.subject)}
                            className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold">{note.subject}</div>
                                <div className="text-sm text-muted-foreground">{note.topics.length} topics available</div>
                              </div>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSubject === note.subject ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {expandedSubject === note.subject && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-background/50 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {note.topics.map((topic) => {
                                    const itemTitle = `${note.subject} - ${topic} Notes`
                                    const isDownloaded = downloadedItems.includes(itemTitle)
                                    return (
                                      <div
                                        key={topic}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
                                      >
                                        <span className="text-sm truncate flex-1">{topic}</span>
                                        <div className="flex gap-1 ml-2">
                                          <Button 
                                            size="sm" 
                                            variant="ghost"
                                            className="h-7 w-7 p-0"
                                            onClick={() => handleView("notes", `${note.subject} Notes`, selectedExam.name, topic)}
                                          >
                                            <Eye className="w-3.5 h-3.5" />
                                          </Button>
                                          <Button 
                                            size="sm" 
                                            variant="ghost"
                                            className="h-7 w-7 p-0"
                                            onClick={() => handleDownload(itemTitle)}
                                          >
                                            {isDownloaded ? (
                                              <Check className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                              <Download className="w-3.5 h-3.5" />
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Resources */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Quick Resources</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {selectedExam.resources.map((resource) => {
                        const isDownloaded = downloadedItems.includes(`${selectedExam.name} ${resource}`)
                        return (
                          <Button
                            key={resource}
                            variant="outline"
                            className="h-auto py-3 px-4 flex items-center gap-2 border-border/50 hover:border-primary/50 justify-start"
                            onClick={() => handleView("resource", resource, selectedExam.name)}
                          >
                            {isDownloaded ? (
                              <Check className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 shrink-0" />
                            )}
                            <span className="text-sm truncate">{resource}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View Content Modal */}
      <AnimatePresence>
        {viewingContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setViewingContent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="glass border-border/50">
                <div className="p-6 border-b border-border/50 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      viewingContent.type === "pyq" ? "bg-accent/10" : "bg-primary/10"
                    }`}>
                      {viewingContent.type === "pyq" ? (
                        <FileText className="w-6 h-6 text-accent" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{viewingContent.title}</h3>
                      <p className="text-sm text-muted-foreground">{viewingContent.exam}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewingContent(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {viewingContent.content}
                  </pre>
                </div>
                <div className="p-6 border-t border-border/50">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      handleDownload(`${viewingContent.exam} - ${viewingContent.title}`, viewingContent.content)
                      setViewingContent(null)
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
