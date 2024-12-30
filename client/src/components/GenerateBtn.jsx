import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-800 py-6 sm:py-12">
        See the magic. Try now.
      </h1>

      <button
        onClick={onClickHandler}
        className="inline-flex items-center gap-4 px-10 sm:px-12 py-3 sm:py-4 rounded-full bg-black text-white m-auto hover:bg-blue-600 hover:scale-105 transition-all duration-500 shadow-lg"
      >
        Generate Images
        <img src={assets.star_group} alt="star icon" className="h-6 sm:h-8" />
      </button>
    </motion.div>
  )
}

export default GenerateBtn
