import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, LogOut, Moon, Sun, Home, Award, BarChart2, MessageSquare, ArrowLeftRight, Trophy, PieChart } from "lucide-react"

import HomeTab from "@/components/dashboard/HomeTab"
import RewardsTab from "@/components/dashboard/RewardsTab"
import LeaderboardTab from "@/components/dashboard/LeaderboardTab"
import PatternsTab from "@/components/dashboard/PatternsTab"
import AICoachTab from "@/components/dashboard/AICoachTab"
import SubstitutionsTab from "@/components/dashboard/SubstitutionsTab"
import CravingAlert from "@/components/dashboard/CravingAlert"
import ReportTab from "@/components/dashboard/ReportTab"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  if (!user) {
    navigate("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl font-heading tracking-tight text-primary">
              NutriMind
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-sm font-medium text-foreground">
                Hi, @{user.name}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-0.5">
                {user.goal || "Balanced Diet"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 border-border/50 shadow-sm">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <CravingAlert />
        <Tabs defaultValue="home" className="w-full">
          <div className="flex justify-center mb-8 sticky top-20 z-40">
            <TabsList className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full max-w-4xl bg-card shadow-md border h-auto p-2 rounded-xl">
              <TabsTrigger value="home" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Home</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <Award className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <Trophy className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Top</span>
              </TabsTrigger>
              <TabsTrigger value="patterns" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <BarChart2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Patterns</span>
              </TabsTrigger>
              <TabsTrigger value="coach" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <MessageSquare className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Coach</span>
              </TabsTrigger>
              <TabsTrigger value="substitutions" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <ArrowLeftRight className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Swap</span>
              </TabsTrigger>
              <TabsTrigger value="report" className="py-2.5 px-3 sm:px-4 rounded-lg">
                <PieChart className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline-block">Report</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home"><HomeTab /></TabsContent>
          <TabsContent value="rewards"><RewardsTab /></TabsContent>
          <TabsContent value="leaderboard"><LeaderboardTab /></TabsContent>
          <TabsContent value="patterns"><PatternsTab /></TabsContent>
          <TabsContent value="coach"><AICoachTab /></TabsContent>
          <TabsContent value="substitutions"><SubstitutionsTab /></TabsContent>
          <TabsContent value="report"><ReportTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
