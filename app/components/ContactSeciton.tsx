"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { User2, Mail, MessageSquare, CheckCircle2, XCircle, AlertCircle, FileText } from "lucide-react"

import { Space_Grotesk, Space_Mono, Archivo } from "next/font/google"
import { EnhancedSubmitButton } from "./submit-button"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
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
        setIsSuccess(true) // Set success state for button animation
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

  // Reset success state after animation completes
  const resetSuccess = () => {
    setIsSuccess(false)
  }

  return (
    <section className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto space-y-8 my-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-2 text-start mb-8">
          <h2 className={`${spaceGrotesk.className} text-3xl font-bold relative inline-block mb-3`}>
            <span className="bg-clip-text text-transparent bg-gray-700 dark:bg-gray-200">Get in Touch</span>
          </h2>

          <motion.div
            className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 rounded-xl opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`${archivo.className} relative space-y-4 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <User2 className="w-4 h-4" />
                          <span>Name</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="John Doe" className="pl-9 bg-white/60 dark:bg-gray-900/60" {...field} />
                            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
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
                        <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              className="pl-9 bg-white/60 dark:bg-gray-900/60"
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Subject</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="What's this about?"
                            className="pl-9 bg-white/60 dark:bg-gray-900/60"
                            {...field}
                          />
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
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
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Your message here..."
                            className="min-h-[120px] pl-9 bg-white/60 dark:bg-gray-900/60 resize-none"
                            {...field}
                          />
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className={`${spaceMono.className} flex justify-end`}>
                  <EnhancedSubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} resetSuccess={resetSuccess} />
                </div>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <AlertCircle className={` w-4 h-4`} />
          <span className={spaceMono.className}> I will get back to you as soon as possible</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

