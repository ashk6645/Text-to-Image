import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const controls = useAnimation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAction = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  // Auto-rotate sample images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sampleImages = Array.from({ length: 8 }, (_, i) => assets[`sample_img_${i + 1}`]);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-teal-50 opacity-70" />

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5
              }
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-200 shadow-lg mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600">AI-Powered Image Generation</p>
          <motion.img
            src={assets.star_icon}
            alt="star"
            className="w-5 h-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Transform Text into{' '}
          <span className="relative">
            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
              Visual Magic
            </span>
            <motion.span
              className="absolute inset-x-0 bottom-0 h-3 bg-teal-200 opacity-30"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Bring your imagination to life with AI-powered image generation.
          Create stunning visuals from simple text descriptions.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleAction}
          className="group relative inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>Start Creating Now</span>
          <motion.img
            src={assets.star_group}
            alt="stars"
            className="h-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'blur(20px)', zIndex: -1 }}
          />
        </motion.button>

        {/* Sample Images Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 max-w-6xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {sampleImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{
                scale: activeImageIndex === index ? 1.05 : 1,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src={image}
                alt={`AI generated example ${index + 1}`}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.p
          className="mt-12 text-gray-500 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Trusted by</span>
          <strong className="text-gray-900">250,000+</strong>
          <span>creators worldwide</span>
          <motion.img
            src={assets.rating_star}
            alt="rating"
            className="w-5 h-5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Header;




