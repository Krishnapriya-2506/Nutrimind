import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [goal, setGoal] = useState<"Weight Loss" | "Muscle Gain" | "Balanced Diet">("Balanced Diet")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      login(email, name, goal)
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Join NutriMind
          </CardTitle>
          <CardDescription>
            Start your personalized nutrition journey today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. HealthEnthusiast"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-left pt-2">
              <Label>Primary Goal</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {["Weight Loss", "Muscle Gain", "Balanced Diet"].map((g) => (
                  <div 
                    key={g}
                    onClick={() => setGoal(g as any)}
                    className={`cursor-pointer border rounded-lg p-2 text-center text-sm font-medium transition-colors ${goal === g ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground hover:bg-muted"}`}
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full font-semibold mt-4 bg-gradient-to-r from-primary to-emerald-400 hover:from-primary hover:to-emerald-500 text-white shadow-md">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
