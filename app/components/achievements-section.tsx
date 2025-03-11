"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AchievementCard } from "./achievement-card";

// Mock data for achievements
const achievementsData = [
  {
    id: 1,
    title: "Best UI/UX Design Award",
    type: "Award",
    date: new Date("2023-11-15"),
    description: "Recognized for exceptional user interface design in the annual design competition, highlighting innovative approaches to user experience and accessibility. The project demonstrated creative solutions to complex interaction problems.",
    category: "Design",
    imageUrl: "/placeholder.svg?height=150&width=300"
  },
  {
    id: 2,
    title: "Full-Stack Developer Certification",
    type: "Certification",
    date: new Date("2023-08-22"),
    description: "Completed advanced certification in full-stack development, mastering both frontend and backend technologies with practical applications. The program covered modern frameworks, API design, and deployment strategies.",
    category: "Development",
    imageUrl: "/placeholder.svg?height=150&width=300"
  },
  {
    id: 3,
    title: "Project Leadership Excellence",
    type: "Recognition",
    date: new Date("2023-05-10"),
    description: "Acknowledged for outstanding leadership in guiding a cross-functional team to successful project completion ahead of schedule. Demonstrated effective communication, resource allocation, and problem-solving skills.",
    category: "Leadership"
  }
];

export function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter achievements based on selected category
  const filteredAchievements = selectedCategory
    ? achievementsData.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase())
    : achievementsData;
    
  // Get unique categories
  const categories = Array.from(new Set(achievementsData.map(a => a.category)));
  
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Achievements</h2>
       
        <motion.div 
          className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </motion.div>
      
      {/* Category filters with subtle animations */}
      <div className="flex flex-wrap gap-2 mb-8">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-sm rounded-md transition-all ${
            selectedCategory === null 
              ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          All
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              selectedCategory === category 
                ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
      
      {/* Achievement cards grid - 1 column on mobile, 2 columns on md and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <AchievementCard achievement={achievement} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 dark:text-gray-400"
        >
          No achievements found in this category.
        </motion.div>
      )}
    </section>
  );
}
