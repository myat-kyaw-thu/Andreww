// Optional: Create a fonts file to define and export your fonts
import { Space_Grotesk, Space_Mono, Work_Sans, Archivo, Manrope, Syne } from "next/font/google"

// Primary font - Space Grotesk
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  // Uncomment if you want specific weights only
  // weight: ['300', '400', '500', '700']
})

// Similar fonts that pair well with Space Grotesk
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
})

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
})

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
})

export const syne = Syne({
  subsets: ["latin"],
  display: "swap",
})

