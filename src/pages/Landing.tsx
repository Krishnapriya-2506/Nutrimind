import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Brain, HeartPulse, Moon, Sun, ArrowRight, Apple, Activity } from "lucide-react"

export default function Landing() {
  const { theme, setTheme } = useTheme()

  const stats = [
    { label: "Healthy Recipes", value: "50+" },
    { label: "Calories Saved", value: "10k+" },
    { label: "Success Rate", value: "95%" },
    { label: "AI Support", value: "24/7" },
  ]

  const features = [
    {
      icon: <Brain className="w-10 h-10 text-primary" />,
      title: "AI Craving Prediction",
      description: "Deep learning models predict what you'll crave before you even feel hungry.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-secondary" />,
      title: "Emotional Pattern Analysis",
      description: "Understand how your mood and sleep cycle affect your eating decisions.",
    },
    {
      icon: <Apple className="w-10 h-10 text-emerald-500" />,
      title: "Smart Substitutions",
      description: "Get personalized, healthy alternatives to satisfy any junk food craving.",
    },
    {
      icon: <Activity className="w-10 h-10 text-amber-500" />,
      title: "Time-based Recommendations",
      description: "Meals optimized for your circadian rhythm and digestion.",
    },
  ]

  const steps = [
    { title: "Log Your Mood", description: "Tell NutriMind how you feel and how well you slept." },
    { title: "AI Analysis", description: "Our engine predicts your current craving risk and caloric needs." },
    { title: "Get Recommendations", description: "Receive personalized, healthy food options mapped to your current mood." },
    { title: "Build Better Habits", description: "Earn streaks, points, and uncover behavior patterns over time." },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl font-heading tracking-tight">NutriMind</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Badge variant="secondary" className="px-4 py-1.5 mb-6 text-sm bg-secondary/10 text-secondary border-secondary/20 border">
              <SparklesIcon className="w-4 h-4 mr-2 inline" />
              Smarter Nutrition with AI
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-teal-300 dark:to-emerald-400 tracking-widest uppercase mb-3 drop-shadow-sm">
              Welcome to NutriMind
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-secondary p-2">
              Outsmart Your Cravings. <br className="hidden md:block" />
              Eat Intuitively.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              NutriMind analyzes your mood, sleep, and behavioral patterns using deep learning to predict and prevent junk food cravings with healthy, satisfying alternatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-primary/20 bg-primary text-primary-foreground">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-2">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/50 bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <span className="text-4xl md:text-5xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why NutriMind works</h2>
            <p className="text-lg text-muted-foreground">Most diets fail because they ignore the emotional aspect of eating. NutriMind bridges the gap between how you feel and what you eat.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">Four simple steps to transform your relationship with food.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 z-10 shadow-lg ring-4 ring-background">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-primary/20 -z-10" />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">NutriMind © 2026</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Made with ❤️ for healthier lives.
          </div>
        </div>
      </footer>
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}
