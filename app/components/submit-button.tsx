"use client"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, CheckCircle } from "lucide-react"

interface SubmitButtonProps {
  isSubmitting: boolean
  isSuccess?: boolean
  onSubmit?: () => void
  resetSuccess?: () => void
}

export function EnhancedSubmitButton({ isSubmitting, isSuccess = false, onSubmit, resetSuccess }: SubmitButtonProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  // Success animation completed handler
  const handleSuccessComplete = () => {
    if (resetSuccess) {
      setTimeout(() => {
        resetSuccess()
      }, 2000) // Reset after 2 seconds
    }
  }

  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        disabled={isSubmitting || isSuccess}
        onClick={onSubmit}
        className="relative group overflow-hidden min-w-[160px] h-10"
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center justify-center gap-2 absolute inset-0"
            >
              <motion.div variants={childVariants} className="flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="w-4 h-4" />
                </motion.div>
              </motion.div>
              <motion.span variants={childVariants}>Sending...</motion.span>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onAnimationComplete={handleSuccessComplete}
              className="flex items-center justify-center gap-2 absolute inset-0 text-green-500"
            >
              <motion.div
                variants={childVariants}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1.2, 1],
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  times: [0, 0.7, 1],
                  ease: "easeOut",
                }}
              >
                <CheckCircle className="w-4 h-4" />
              </motion.div>
              <motion.span variants={childVariants} className="text-green-600 dark:text-green-400">
                Sent Successfully
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="send"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center justify-center gap-2 absolute inset-0"
            >
              <motion.div
                variants={childVariants}
                className="relative"
                whileHover={{ x: [0, 4, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
              <motion.span variants={childVariants}>Send Message</motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

