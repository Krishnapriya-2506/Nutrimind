import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Zap, Target, Flame } from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"

type Substitution = {
  junk: string
  junkCals: number
  healthy: string
  healthyCals: number
  benefits: string[]
}

const SUBSTITUTIONS_DB: Substitution[] = [
  { junk: "Pizza", junkCals: 800, healthy: "Whole wheat veggie pizza", healthyCals: 450, benefits: ["More fiber", "Less refined flour", "Lower glycemic index"] },
  { junk: "Burger", junkCals: 650, healthy: "Whole wheat veggie burger", healthyCals: 380, benefits: ["Less fat", "More nutrients", "High fiber"] },
  { junk: "French fries", junkCals: 450, healthy: "Baked sweet potato fries", healthyCals: 200, benefits: ["Less oil", "More vitamins", "Vitamin A rich"] },
  { junk: "Potato chips", junkCals: 400, healthy: "Roasted makhana", healthyCals: 120, benefits: ["Low fat", "High fiber", "Rich in minerals"] },
  { junk: "Soft drinks", junkCals: 150, healthy: "Fresh fruit juice", healthyCals: 60, benefits: ["Natural sugars", "Vitamins", "Antioxidants"] },
  { junk: "Ice cream", junkCals: 350, healthy: "Frozen yogurt", healthyCals: 180, benefits: ["Lower fat", "Probiotics", "Digestive health"] },
  { junk: "Chocolate bar", junkCals: 250, healthy: "Dark chocolate (70%)", healthyCals: 150, benefits: ["Less sugar", "Antioxidants", "Mood booster"] },
  { junk: "Milkshake", junkCals: 400, healthy: "Banana smoothie", healthyCals: 220, benefits: ["Natural sweetness", "Potassium", "No added sugar"] },
  { junk: "White bread", junkCals: 150, healthy: "Whole wheat bread", healthyCals: 110, benefits: ["More fiber", "Better digestion"] },
  { junk: "Instant noodles", junkCals: 450, healthy: "Whole wheat noodles with veggies", healthyCals: 280, benefits: ["More nutrients", "Complex carbs"] },
  { junk: "Fried chicken", junkCals: 600, healthy: "Grilled paneer or tofu", healthyCals: 250, benefits: ["Less oil", "High protein", "Lean muscle fuel"] },
  { junk: "Fried rice", junkCals: 550, healthy: "Brown rice veggie bowl", healthyCals: 320, benefits: ["High fiber", "Stable energy"] },
  { junk: "Sugary cereal", junkCals: 220, healthy: "Oats with fruits", healthyCals: 180, benefits: ["Low sugar", "High fiber", "Heart healthy"] },
  { junk: "Candy", junkCals: 200, healthy: "Dates or dry fruits", healthyCals: 120, benefits: ["Natural sugar", "Iron rich", "Fiber"] },
  { junk: "Donuts", junkCals: 350, healthy: "Baked whole wheat muffins", healthyCals: 160, benefits: ["Less oil", "Whole grain goodness"] },
  { junk: "Cake", junkCals: 400, healthy: "Banana oat cake", healthyCals: 210, benefits: ["No refined sugar", "Fiber rich"] },
  { junk: "Biscuits", junkCals: 180, healthy: "Oats cookies", healthyCals: 120, benefits: ["More fiber", "Satisfying crunch"] },
  { junk: "Nachos", junkCals: 480, healthy: "Baked tortilla chips", healthyCals: 240, benefits: ["Less fat", "Whole grain corn"] },
  { junk: "Cheese dip", junkCals: 300, healthy: "Hummus", healthyCals: 150, benefits: ["Healthy fats", "Plant protein"] },
  { junk: "Mayonnaise", junkCals: 100, healthy: "Greek yogurt dip", healthyCals: 40, benefits: ["High protein", "Low fat"] },
  { junk: "Cream pasta", junkCals: 700, healthy: "Whole wheat pasta with veggies", healthyCals: 350, benefits: ["Less fat", "Complex carbs", "Vitamin rich"] },
  { junk: "Butter naan", junkCals: 350, healthy: "Chapati", healthyCals: 120, benefits: ["Less fat", "Easier to digest"] },
  { junk: "Sugary coffee", junkCals: 250, healthy: "Black coffee with little jaggery", healthyCals: 40, benefits: ["Less sugar", "Metabolism boost"] },
  { junk: "Energy drinks", junkCals: 180, healthy: "Coconut water", healthyCals: 45, benefits: ["Natural electrolytes", "Hydrating"] },
  { junk: "Packaged juice", junkCals: 140, healthy: "Fresh juice", healthyCals: 80, benefits: ["No preservatives", "Maximum vitamins"] },
  { junk: "Fried snacks", junkCals: 400, healthy: "Air-fried snacks", healthyCals: 180, benefits: ["Less oil", "Same crunch"] },
  { junk: "Samosa", junkCals: 300, healthy: "Baked samosa", healthyCals: 150, benefits: ["Low oil", "Spices for metabolism"] },
  { junk: "Pakora", junkCals: 350, healthy: "Grilled veggie bites", healthyCals: 120, benefits: ["Less fat", "Nutrient dense"] },
  { junk: "Pani puri", junkCals: 250, healthy: "Sprouts chaat", healthyCals: 140, benefits: ["High protein", "Less refined flour"] },
  { junk: "Chaat", junkCals: 350, healthy: "Fruit chaat", healthyCals: 120, benefits: ["More vitamins", "Natural freshness"] },
  { junk: "Fried eggs", junkCals: 250, healthy: "Boiled eggs", healthyCals: 140, benefits: ["Less oil", "Pure protein"] },
  { junk: "Butter toast", junkCals: 220, healthy: "Peanut butter toast", healthyCals: 180, benefits: ["Healthy fats", "High satiety"] },
  { junk: "Chocolate spread", junkCals: 190, healthy: "Peanut butter", healthyCals: 100, benefits: ["More protein", "Healthy oils"] },
  { junk: "Sweetened yogurt", junkCals: 160, healthy: "Plain yogurt with fruits", healthyCals: 110, benefits: ["Less sugar", "Natural vitamins"] },
  { junk: "White rice", junkCals: 240, healthy: "Brown rice", healthyCals: 210, benefits: ["More fiber", "Lower GI"] },
  { junk: "Fried fish", junkCals: 450, healthy: "Grilled fish", healthyCals: 220, benefits: ["Less oil", "Omega-3 preservation"] },
  { junk: "Sugary tea", junkCals: 120, healthy: "Green tea", healthyCals: 2, benefits: ["Antioxidants", "Zero calories"] },
  { junk: "Cream biscuits", junkCals: 240, healthy: "Whole grain biscuits", healthyCals: 140, benefits: ["Less sugar", "More fiber"] },
  { junk: "Butter popcorn", junkCals: 350, healthy: "Air-popped popcorn", healthyCals: 120, benefits: ["Low fat", "High volume"] },
  { junk: "Chocolate milk", junkCals: 220, healthy: "Almond milk", healthyCals: 60, benefits: ["Low sugar", "Vitamin E"] },
  { junk: "Sugary smoothies", junkCals: 350, healthy: "No-sugar fruit smoothies", healthyCals: 180, benefits: ["Natural sugars", "Maximum fiber"] },
  { junk: "Fried paneer", junkCals: 400, healthy: "Grilled paneer", healthyCals: 250, benefits: ["Less oil", "High protein"] },
  { junk: "Heavy biryani", junkCals: 750, healthy: "Vegetable pulao", healthyCals: 380, benefits: ["Light digestion", "Lower fat"] },
  { junk: "Butter chicken", junkCals: 650, healthy: "Paneer curry", healthyCals: 350, benefits: ["Less fat", "Balanced spices"] },
  { junk: "Cola", junkCals: 150, healthy: "Lemon water", healthyCals: 15, benefits: ["Hydration", "Vitamin C boost"] },
  { junk: "Sugary desserts", junkCals: 450, healthy: "Fruit bowl", healthyCals: 120, benefits: ["Natural sugars", "Full of fiber"] },
  { junk: "Ice cream shake", junkCals: 550, healthy: "Fruit smoothie", healthyCals: 220, benefits: ["Low fat", "Natural nutrients"] },
  { junk: "Deep fried snacks", junkCals: 400, healthy: "Roasted snacks", healthyCals: 140, benefits: ["Less oil", "Heart healthy"] },
  { junk: "Instant soup", junkCals: 180, healthy: "Homemade vegetable soup", healthyCals: 90, benefits: ["No preservatives", "Low sodium"] },
  { junk: "White pasta", junkCals: 500, healthy: "Millet pasta", healthyCals: 280, benefits: ["More nutrients", "Gluten-free option"] },
  { junk: "Fried noodles", junkCals: 550, healthy: "Stir-fried whole wheat noodles", healthyCals: 320, benefits: ["Less oil", "More veggies"] },
  { junk: "Sugary drinks", junkCals: 140, healthy: "Herbal tea", healthyCals: 5, benefits: ["Relaxation", "Calming effect"] },
  { junk: "Candy bars", junkCals: 280, healthy: "Dark chocolate", healthyCals: 160, benefits: ["Less sugar", "Polyphenols"] },
  { junk: "Heavy sandwiches", junkCals: 550, healthy: "Veg sandwich (whole wheat)", healthyCals: 280, benefits: ["Healthy carbs", "More fiber"] },
  { junk: "Fried corn", junkCals: 250, healthy: "Boiled corn", healthyCals: 100, benefits: ["Low fat", "Natural sweetness"] },
  { junk: "Sugary snacks", junkCals: 300, healthy: "Dry fruits", healthyCals: 150, benefits: ["Natural energy", "Healthy fats"] },
  { junk: "Fried cutlets", junkCals: 350, healthy: "Baked cutlets", healthyCals: 180, benefits: ["Less oil", "Clean protein"] },
  { junk: "Sugary cereal bars", junkCals: 220, healthy: "Energy balls", healthyCals: 130, benefits: ["No preservatives", "Nutrient dense"] },
  { junk: "Sugary milk drinks", junkCals: 180, healthy: "Turmeric milk", healthyCals: 110, benefits: ["Immunity", "Anti-inflammatory"] },
  { junk: "Heavy gravies", junkCals: 450, healthy: "Light vegetable curry", healthyCals: 200, benefits: ["Less fat", "Easier digestion"] },
  { junk: "Fried snacks mix", junkCals: 450, healthy: "Roasted trail mix", healthyCals: 180, benefits: ["Healthy fats", "Omega-3s"] },
  { junk: "Sugary pancakes", junkCals: 400, healthy: "Oats pancakes", healthyCals: 220, benefits: ["More fiber", "Stable energy"] },
  { junk: "White flour snacks", junkCals: 350, healthy: "Whole wheat snacks", healthyCals: 190, benefits: ["Better digestion", "Complex carbs"] },
  { junk: "Fried dosa", junkCals: 380, healthy: "Plain dosa (less oil)", healthyCals: 210, benefits: ["Less fat", "Fermented benefits"] },
  { junk: "Sugary milkshake", junkCals: 450, healthy: "Protein smoothie", healthyCals: 250, benefits: ["Balanced nutrition", "Muscle support"] },
  { junk: "Sugary sweets", junkCals: 300, healthy: "Dates-based sweets", healthyCals: 140, benefits: ["Natural sugar", "Iron boost"] },
  { junk: "Fried rice snacks", junkCals: 250, healthy: "Puffed rice snack", healthyCals: 90, benefits: ["Low fat", "Light snack"] },
  { junk: "Sugary custard", junkCals: 280, healthy: "Greek yogurt with fruits", healthyCals: 150, benefits: ["High protein", "Probiotics"] },
  { junk: "Heavy cheese pizza", junkCals: 900, healthy: "Thin crust veggie pizza", healthyCals: 420, benefits: ["Less calories", "High volume"] },
  { junk: "Fried rolls", junkCals: 450, healthy: "Grilled wraps", healthyCals: 280, benefits: ["Less oil", "Whole grain wrap"] },
  { junk: "Chicken biriyani", junkCals: 750, healthy: "Brown rice chicken biriyani (low oil, more veggies)", healthyCals: 450, benefits: ["Less oil", "higher fiber", "easier digestion"] },
  { junk: "Mutton biriyani", junkCals: 850, healthy: "Millet mutton biriyani (small portion, low oil)", healthyCals: 500, benefits: ["Lower fat load", "better for digestion"] },
  { junk: "Beef biriyani", junkCals: 800, healthy: "Vegetable or paneer biriyani (less oil)", healthyCals: 400, benefits: ["Lower saturated fat", "lighter meal"] },
  { junk: "Mutton soup (oily)", junkCals: 350, healthy: "Clear mutton soup (low fat, skimmed)", healthyCals: 180, benefits: ["Less fat", "still rich in nutrients"] },
  { junk: "Chicken fry", junkCals: 550, healthy: "Grilled or air-fried chicken (less oil)", healthyCals: 280, benefits: ["Reduced oil", "better heart health"] },
  { junk: "Chicken 65", junkCals: 450, healthy: "Air-fried chicken 65 (minimal oil)", healthyCals: 180, benefits: ["Same taste", "less deep frying"] },
  { junk: "Chicken momos (fried)", junkCals: 400, healthy: "Steamed chicken momos", healthyCals: 220, benefits: ["No deep frying", "lighter digestion"] },
  { junk: "Chicken fried rice", junkCals: 600, healthy: "Brown rice chicken stir-fry (less oil, more veggies)", healthyCals: 350, benefits: ["More fiber", "balanced nutrients"] },
  { junk: "Atho (oily street style)", junkCals: 500, healthy: "Homemade atho with less oil + more cabbage", healthyCals: 250, benefits: ["Less oil", "more fiber", "hygienic"] }
]

const getEmoji = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("pizza")) return "🍕"
  if (n.includes("burger")) return "🍔"
  if (n.includes("chicken") || n.includes("65")) return "🍗"
  if (n.includes("biriyani") || n.includes("rice")) return "🍛"
  if (n.includes("chips") || n.includes("french")) return "🍟"
  if (n.includes("momo")) return "🥟"
  if (n.includes("juice") || n.includes("drink") || n.includes("cola")) return "🥤"
  if (n.includes("soup")) return "🥣"
  if (n.includes("coffee") || n.includes("tea")) return "☕"
  if (n.includes("dessert") || n.includes("cake") || n.includes("ice cream")) return "🍨"
  return "🍱"
}

export default function SubstitutionsTab() {
  const { user } = useAuth()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Substitution[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const applyGoalToSubstitution = (sub: Substitution): Substitution => {
    const goal = user?.goal || "Balanced Diet"
    let updatedSub = { ...sub }

    if (goal === "Weight Loss") {
      if (sub.junk === "Pizza") {
        updatedSub.healthy = "Cauliflower Crust Thin Pizza"
        updatedSub.healthyCals = 250
        updatedSub.benefits = ["Ultra Low Carb", "High Volume", "Weight Loss Approved"]
      } else if (sub.junkCals > 400 && sub.healthyCals > 250) {
        updatedSub.healthyCals = Math.floor(updatedSub.healthyCals * 0.8)
        updatedSub.benefits = ["Calorie Controlled", "Keto-friendly Option", ...sub.benefits.slice(0, 1)]
      }
    } else if (goal === "Muscle Gain") {
      if (sub.healthy.includes("Wrap") || sub.healthy.includes("Chicken")) {
        updatedSub.healthy = "Double Protein " + updatedSub.healthy
        updatedSub.healthyCals = Math.floor(updatedSub.healthyCals * 1.2)
        updatedSub.benefits = ["High Protein", "Muscle Recovery", ...sub.benefits]
      }
    }

    return updatedSub
  }

  const handleSearch = () => {
    if (!query.trim()) return
    const q = query.toLowerCase()
    
    let matches = SUBSTITUTIONS_DB.filter(s => 
      s.junk.toLowerCase().includes(q) || 
      s.healthy.toLowerCase().includes(q)
    )
    
    if (matches.length === 0) {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
      matches = [{
        junk: query.trim().split(" ").map(capitalize).join(" "),
        junkCals: 500,
        healthy: "Homemade " + query.trim() + " (Less Oil)",
        healthyCals: 300,
        benefits: ["Personalized Choice", "Fresh Ingredients", "Nutrient Dense"]
      }]
    }
    
    setResults(matches.map(applyGoalToSubstitution))
    setHasSearched(true)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <CardContent className="p-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-2">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600">Smart Substitutions</h2>
            <p className="text-muted-foreground">Craving something? Let's find a realistic, healthier version together.</p>
            
            <div className="flex gap-2 max-w-md mx-auto pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="e.g., Pizza, Biriyani, Chicken 65..." 
                  className="h-12 pl-10 text-base bg-background shadow-sm border-primary/20 focus-visible:ring-primary"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button size="lg" className="h-12 px-8 font-bold bg-primary hover:bg-primary/90" onClick={handleSearch}>
                Find
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {!hasSearched && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {SUBSTITUTIONS_DB.filter(s => s.junk.includes("Biriyani") || s.junk.includes("65") || s.junk.includes("Pizza") || s.junk.includes("Burger")).slice(0, 4).map((item, i) => (
             <Card key={i} className="cursor-pointer hover:border-primary/50 transition-all hover:bg-primary/5 active:scale-95 group" onClick={() => { setQuery(item.junk); setHasSearched(true); setResults([item]) }}>
               <CardContent className="p-4 flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{getEmoji(item.junk)} Craving</span>
                   <span className="font-bold text-sm truncate">{item.junk}</span>
                 </div>
                 <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
               </CardContent>
             </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {hasSearched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Comparison: Original vs Suggested
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setHasSearched(false)} className="text-muted-foreground font-bold">Clear</Button>
            </div>
            
            {results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((item, idx) => {
                  const saved = item.junkCals - item.healthyCals
                  return (
                    <Card key={idx} className="overflow-hidden border-2 border-emerald-500/20 shadow-xl relative bg-gradient-to-br from-background to-emerald-500/5">
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-md z-20">
                        <Flame className="w-3 h-3" />
                        -{saved} kcal
                      </div>
                      
                      <CardContent className="p-6 md:p-8 space-y-6">
                        <div className="space-y-4">
                          {/* Original Line */}
                          <div className="flex items-center gap-3">
                            <span className="text-3xl filter grayscale opacity-70">{getEmoji(item.junk)}</span>
                            <h4 className="text-2xl font-black text-foreground/40 line-through">{item.junk}</h4>
                          </div>

                          {/* Arrow Line */}
                          <div className="flex items-center gap-3 ml-1">
                            <div className="h-8 w-0.5 bg-emerald-500/20 ml-4"></div>
                            <span className="text-emerald-500 font-black">➡️</span>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-600">✅</span>
                              <h4 className="text-2xl font-black text-primary leading-tight">{item.healthy}</h4>
                            </div>
                          </div>
                        </div>

                        {/* Benefit Quote Box */}
                        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-5 border-l-4 border-emerald-500 shadow-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">💡</span>
                            <p className="text-sm font-bold text-foreground/80 italic">
                              "{item.benefits[0].charAt(0).toUpperCase() + item.benefits[0].slice(1)}, {item.benefits[1] || 'better for your goals'}"
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.benefits.map((b, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] uppercase font-black tracking-tighter bg-emerald-500/5 border-emerald-500/20">
                                {b}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                <p className="text-muted-foreground font-bold">No alternatives found. Try a different snack!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
