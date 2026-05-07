"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { 
  Brain, 
  FileText, 
  Layers, 
  HelpCircle, 
  Calendar, 
  PenTool, 
  Image as ImageIcon, 
  BookOpen, 
  Calculator, 
  Sparkles,
  X,
  Send,
  Loader2,
  MessageSquare,
  RefreshCw,
  Copy,
  Check,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const aiTools = [
  {
    id: "doubt-solver",
    name: "Doubt Solver",
    description: "Get instant answers to your academic questions with detailed explanations",
    icon: HelpCircle,
    color: "from-blue-500 to-cyan-500",
    placeholder: "Ask any academic question...\n\nExample: Explain the concept of electromagnetic induction with examples",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "notes-summarizer",
    name: "Notes Summarizer",
    description: "Transform lengthy content into concise, exam-ready study notes",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    placeholder: "Paste your content to summarize...\n\nExample: Paste a chapter or topic content to get concise notes",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "flashcard-generator",
    name: "Flashcard Generator",
    description: "Create effective Q&A flashcards for quick revision",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    placeholder: "Enter topic or content for flashcards...\n\nExample: Create flashcards for the French Revolution",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "quiz-generator",
    name: "Quiz Generator",
    description: "Generate practice MCQs with answers and explanations",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    placeholder: "Enter topic for quiz generation...\n\nExample: Generate 10 MCQs on Newton's Laws of Motion for JEE",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "study-planner",
    name: "Study Planner",
    description: "Get personalized study schedules and time management advice",
    icon: Calendar,
    color: "from-indigo-500 to-purple-500",
    placeholder: "Describe your study goals and available time...\n\nExample: I have JEE in 3 months, 6 hours daily. Create a study plan for Physics, Chemistry, Maths",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "essay-writer",
    name: "Essay Writer",
    description: "Get help writing structured academic essays and answers",
    icon: PenTool,
    color: "from-teal-500 to-green-500",
    placeholder: "Enter your essay topic and requirements...\n\nExample: Write a 500-word essay on Climate Change and its impact on biodiversity",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "diagram-generator",
    name: "Diagram Generator",
    description: "Generate educational diagrams and visual explanations",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-500",
    placeholder: "Describe the diagram you need...\n\nExample: Create a diagram showing the human digestive system with labels",
    apiEndpoint: "/api/ai/generate-image"
  },
  {
    id: "concept-explainer",
    name: "Concept Explainer",
    description: "Get simple explanations of complex concepts with examples",
    icon: BookOpen,
    color: "from-cyan-500 to-blue-500",
    placeholder: "Enter a concept to explain...\n\nExample: Explain quantum entanglement in simple terms with real-world analogies",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "formula-helper",
    name: "Formula Helper",
    description: "Get formulas, derivations, and problem-solving guidance",
    icon: Calculator,
    color: "from-amber-500 to-orange-500",
    placeholder: "Ask about formulas or problems...\n\nExample: List all important formulas for Integration with examples",
    apiEndpoint: "/api/ai/chat"
  },
  {
    id: "motivation-coach",
    name: "Motivation Coach",
    description: "Get encouragement, study tips, and overcome challenges",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    placeholder: "Share what's on your mind...\n\nExample: I'm feeling overwhelmed with my NEET preparation. How can I stay motivated?",
    apiEndpoint: "/api/ai/chat"
  }
]

function AIToolModal({ 
  tool, 
  isOpen, 
  onClose 
}: { 
  tool: typeof aiTools[0]; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [inputValue, setInputValue] = useState("")
  const [copied, setCopied] = useState(false)
  
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ 
      api: tool.apiEndpoint,
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          messages,
          id,
          toolType: tool.id
        }
      })
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleClear = () => {
    setMessages([])
    setInputValue("")
  }

  const handleCopy = async () => {
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastAssistantMessage) {
      const text = getMessageText(lastAssistantMessage)
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getMessageText = (message: typeof messages[0]): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ''
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map(p => p.text)
      .join('')
  }

  const getMessageImages = (message: typeof messages[0]): Array<{ type: 'image'; image: string; mimeType?: string }> => {
    if (!message.parts || !Array.isArray(message.parts)) return []
    return message.parts.filter((p): p is { type: 'image'; image: string; mimeType?: string } => p.type === 'image')
  }

  const IconComponent = tool.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl max-h-[85vh] bg-card/95 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={cn(
              "p-4 sm:p-6 border-b border-border/50 bg-gradient-to-r",
              tool.color
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">{tool.name}</h2>
                    <p className="text-xs sm:text-sm text-white/80">{tool.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-[200px]">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                    tool.color
                  )}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Powered by Real AI
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Enter your query below to get AI-powered assistance. 
                    Responses are generated using GPT-4o Mini.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Zap className="w-3 h-3" />
                    <span>Using OpenAI GPT-4o Mini via Vercel AI Gateway</span>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className={cn(
                        "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                        tool.color
                      )}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3",
                      message.role === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50 border border-border/50"
                    )}>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.role === 'assistant' ? (
                          <>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {getMessageText(message)}
                            </div>
                            {getMessageImages(message).map((img, idx) => (
                              <img 
                                key={idx}
                                src={img.image.startsWith('data:') ? img.image : `data:${img.mimeType || 'image/png'};base64,${img.image}`}
                                alt="Generated diagram"
                                className="mt-4 rounded-lg max-w-full"
                              />
                            ))}
                          </>
                        ) : (
                          <p className="text-sm">{getMessageText(message)}</p>
                        )}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                    tool.color
                  )}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted/50 border border-border/50 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Generating response...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions Bar */}
            {messages.length > 0 && (
              <div className="px-4 sm:px-6 py-2 border-t border-border/30 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Response
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-border/50 bg-muted/30">
              <div className="flex gap-3">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={tool.placeholder}
                  className="flex-1 min-h-[80px] max-h-[200px] resize-none bg-background/50 border-border/50 focus:border-primary/50"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "h-auto px-4 bg-gradient-to-r hover:opacity-90 transition-opacity",
                    tool.color
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AIToolsSection() {
  const [selectedTool, setSelectedTool] = useState<typeof aiTools[0] | null>(null)

  return (
    <section id="ai-tools" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Study Tools
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Supercharge your learning with 10 powerful AI tools. Get instant help with doubts, 
            generate notes, create quizzes, and more - all powered by real AI models.
          </p>
        </motion.div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Powered by OpenAI GPT-4o Mini</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {aiTools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTool(tool)}
                  className="w-full p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all group text-left"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    tool.color
                  )}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3" />
                    <span>Try now</span>
                  </div>
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Real AI Responses", icon: Brain },
            { label: "Instant Results", icon: Zap },
            { label: "Multi-turn Chat", icon: MessageSquare },
            { label: "Copy & Save", icon: Copy }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <AIToolModal
          tool={selectedTool}
          isOpen={!!selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </section>
  )
}
