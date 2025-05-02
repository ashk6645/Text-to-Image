import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion, useAnimation } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  const handleClick = () => {
    controls.start({
      scale: [1, 0.9, 1.1, 1],
      transition: { duration: 0.4 }
    })
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  // Particle animation variants
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative py-16 text-center"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
      >
        Ready to Create Something Amazing?
      </motion.h2>

      {/* Button Container with Particle Effects */}
      <div className="relative inline-block">
        {/* Animated Particles */}
        {isHovered && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            className="absolute"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: `linear-gradient(120deg, #60A5FA, #2DD4BF)`,
              left: `${50 + Math.cos(i * Math.PI / 4) * 60}%`,
              top: `${50 + Math.sin(i * Math.PI / 4) * 60}%`,
            }}
          />
        ))}

        {/* Main Button */}
        <motion.button
          onClick={handleClick}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          className="relative group px-12 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'blur(10px)', zIndex: -1 }}
          />
          
          <span className="flex items-center gap-3">
            Generate Images
            <motion.img
              src={assets.star_group}
              alt="stars"
              className="w-6 h-6"
              animate={{
                rotate: isHovered ? 180 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </motion.button>
      </div>

      {/* Bottom Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-gray-600"
      >
        {user ? 'Transform your ideas into stunning visuals' : 'Join thousands of creators today'}
      </motion.p>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        {['Instant Generation', 'Multiple Styles', 'High Quality'].map((feature, index) => (
          <div
            key={index}
            className="flex items-center text-sm text-gray-600"
          >
            <svg
              className="w-4 h-4 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default GenerateBtn
