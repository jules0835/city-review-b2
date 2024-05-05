"use client"

import { motion } from "framer-motion"

const Animate = ({ children }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeInOut", duration: 1 }}
  >
    {children}
  </motion.div>
)

export default Animate
