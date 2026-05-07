"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Crown, 
  Lock, 
  Sparkles, 
  Check, 
  Star,
  BookOpen,
  FileText,
  Zap,
  X,
  CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const premiumFeatures = [
  "Unlimited AI tool access",
  "10,000+ Premium Notes",
  "Complete PYQ collection",
  "Ad-free experience",
  "Priority support",
  "Exclusive study materials",
  "Advanced analytics",
  "Offline access",
]

const lockedResources = [
  { title: "JEE Advanced Complete Package", type: "Bundle", value: "500+ resources" },
  { title: "NEET Master Notes", type: "Notes", value: "300+ pages" },
  { title: "UPSC All India Test Series", type: "Tests", value: "50+ tests" },
  { title: "CAT Comprehensive Guide", type: "Guide", value: "200+ pages" },
]

export function PremiumSection() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showUnlockModal, setShowUnlockModal] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async () => {
    if (!email) return
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setSubscribed(true)
    setShowCheckout(false)
  }

  return (
    <section id="premium" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Premium Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 via-primary to-accent bg-clip-text text-transparent">
              Unlock Your Full Potential
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get unlimited access to all premium resources, AI tools, and exclusive content.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Premium Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/50 relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      Study Sprint Pro
                    </CardTitle>
                    <CardDescription>Unlock everything</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$9.99</div>
                    <div className="text-sm text-muted-foreground">/month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {subscribed ? (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">You&apos;re subscribed!</span>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-primary hover:opacity-90 text-lg py-6 animate-pulse-glow"
                    onClick={() => setShowCheckout(true)}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Unlock Premium
                  </Button>
                )}

                <p className="text-center text-sm text-muted-foreground">
                  7-day free trial. Cancel anytime.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Locked Content Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              Premium Resources Preview
            </h3>
            
            {lockedResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-border/50 relative overflow-hidden group">
                  {/* Blur overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-background/30 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      className="border-primary/50"
                      onClick={() => setShowUnlockModal(resource.title)}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Unlock
                    </Button>
                  </div>
                  
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {resource.type === "Bundle" ? (
                        <Zap className="w-6 h-6 text-primary" />
                      ) : resource.type === "Notes" ? (
                        <BookOpen className="w-6 h-6 text-primary" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.value}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Premium</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <p className="text-center text-sm text-muted-foreground pt-4">
              And 10,000+ more premium resources...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="glass border-primary/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      Start Your Free Trial
                    </CardTitle>
                    <CardDescription>7 days free, then $9.99/month</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCheckout(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Card Details</label>
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Demo: No payment required</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <h4 className="font-semibold mb-2">What you&apos;ll get:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {premiumFeatures.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-primary hover:opacity-90"
                    onClick={handleSubscribe}
                    disabled={!email || isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start Free Trial
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Individual Unlock Modal */}
      <AnimatePresence>
        {showUnlockModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowUnlockModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="glass border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Premium Content
                    </CardTitle>
                    <CardDescription>{showUnlockModal}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowUnlockModal(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Lock className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This resource is only available with Study Sprint Pro subscription.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-primary hover:opacity-90"
                    onClick={() => {
                      setShowUnlockModal(null)
                      setShowCheckout(true)
                    }}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Unlock with Premium
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    7-day free trial available
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
