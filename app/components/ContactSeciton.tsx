"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, Variants } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Space_Grotesk, Space_Mono } from "next/font/google"
import { EnhancedSubmitButton } from "./submit-button"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

type FormValues = z.infer<typeof formSchema>

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        toast.success("Message sent successfully!", {
          icon: <CheckCircle2 className="w-4 h-4" />,
        })
        form.reset()
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        icon: <XCircle className="w-4 h-4" />,
      })
      console.error("Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetSuccess = () => {
    setIsSuccess(false)
  }

  return (
    <section className="w-full py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-4xl font-bold mb-4`}>
            Contact me
          </h2>
          <motion.div
                className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
        </motion.div>

        {/* Two Column Layout - 40/60 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column - Contact Info (40%) */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <div>
              <p className={`${spaceMono.className} text-xs text-gray-600 dark:text-gray-400 mb-1`}>
                Location
              </p>
              <p className={`${spaceGrotesk.className} text-sm font-semibold`}>
                Yangon, Myanmar
              </p>
            </div>

            <div>
              <p className={`${spaceMono.className} text-xs text-gray-600 dark:text-gray-400 mb-1`}>
                Email
              </p>
              <a
                href="mailto:myatkyawthu4002@gmail.com"
                className={`${spaceGrotesk.className} text-sm font-semibold hover:opacity-70 transition-opacity break-all`}
              >
                myatkyawthu4002@gmail.com
              </a>
            </div>

            <div>
              <p className={`${spaceMono.className} text-xs text-gray-600 dark:text-gray-400 mb-1`}>
                Phone
              </p>
              <a
                href="tel:+959262999350"
                className={`${spaceGrotesk.className} text-sm font-semibold hover:opacity-70 transition-opacity`}
              >
                +959 262 999 350
              </a>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300`}>
                        Name (required)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 bg-transparent focus:border-black dark:focus:border-white focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300`}>
                        Email (required)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          type="email"
                          className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 bg-transparent focus:border-black dark:focus:border-white focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300`}>
                        Project description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 bg-transparent focus:border-black dark:focus:border-white focus:ring-0 resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <EnhancedSubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} resetSuccess={resetSuccess} />
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
