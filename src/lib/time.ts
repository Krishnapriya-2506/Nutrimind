import type { TimeOfDay } from "@/data/foods"

export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Morning"
  if (hour >= 12 && hour < 17) return "Afternoon"
  if (hour >= 17 && hour < 21) return "Evening"
  if (hour >= 21 || hour === 23) return "Night"
  return "Midnight"
}

export function getTimeMetadata(time: TimeOfDay) {
  switch (time) {
    case "Morning":
      return { emoji: "🌅", message: "Energizing foods to kickstart your metabolism." }
    case "Afternoon":
      return { emoji: "🌆", message: "Balanced meals for sustained focus." }
    case "Evening":
      return { emoji: "🌙", message: "Lighter options to prepare your body for rest." }
    case "Night":
      return { emoji: "🌃", message: "Very light snacks that won't disrupt your sleep." }
    case "Midnight":
      return { emoji: "🦉", message: "Extremely light options to avoid digestive issues." }
  }
}
