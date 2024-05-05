"use client"

import { motion, MotionConfig } from "framer-motion"

const Animate = ({ children }) => (
  <MotionConfig transition={{ duration: 1.2 }}>
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  </MotionConfig>
)

export default Animate
