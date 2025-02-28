"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { User2, Mail, MessageSquare, Send, Loader2, CheckCircle2, XCircle, AlertCircle, FileText } from "lucide-react"

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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            console.log(data)
            toast.success("Message sent successfully!", {
                icon: <CheckCircle2 className="w-4 h-4" />,
            })
            form.reset()
        } catch (error) {
            toast.error("Failed to send message. Please try again.", {
                icon: <XCircle className="w-4 h-4" />,
            })
        } finally {
            setIsSubmitting(false)
        }
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
                <motion.div variants={itemVariants} className="space-y-2 text-center mb-8">
                    <h2 className="text-3xl font-bold relative inline-block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                            Get in Touch
                        </span>
                        <motion.span
                            className="absolute -bottom-1 left-0 h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                        />
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm">
                        Have a question or want to work together? Feel free to reach out!
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div variants={itemVariants}>
                    <div className="relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 rounded-xl opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="relative space-y-4 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm"
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
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isSubmitting} className="relative group">
                                        <AnimatePresence mode="wait">
                                            {isSubmitting ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Sending...</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="send"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                                    <span>Send Message</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
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
                    <AlertCircle className="w-4 h-4" />
                    <span>I'll get back to you as soon as possible</span>
                </motion.div>
            </motion.div>
        </section>
    )
}

