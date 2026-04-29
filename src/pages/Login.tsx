import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Utensils } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      login(email, email.split("@")[0] || "User")
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
            <Utensils className="w-6 h-6 text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Welcome Back to NutriMind
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full font-semibold mt-4">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
