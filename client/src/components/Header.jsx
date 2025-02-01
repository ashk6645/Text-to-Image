import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20 px-6 sm:px-0"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Badge */}
      <motion.div
        className="inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-sm text-gray-600">Describe it, generate it, and bring your imagination to life.</p>
        <img src={assets.star_icon} alt="star icon" className="w-6 h-6" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl max-w-[600px] mx-auto mt-10 font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Transform Text into Visual <span className="text-blue-600">Masterpiece.</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg sm:text-xl max-w-xl mx-auto mt-5 text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Bring your imagination to life with AI-powered image generation.
      </motion.p>

      {/* Generate Button */}
      <motion.button
        onClick={onClickHandler}
        className="mt-8 px-8 py-3 bg-black text-white rounded-full flex items-center gap-3 text-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
        
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0 }, opacity: { delay: 0, duration: 0.2 } }}
      >
        Start Creating Now!
        <img src={assets.star_group} alt="star group" className="h-6" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-20 px-4 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <motion.div
            key={item}
            className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={assets[`sample_img_${item}`]}
              alt={`AI generated example: ${assets[`sample_img_${item}_desc`] || 'Creative artwork'}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Attribution */}
      <motion.p
        className="mt-12 text-gray-500 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Powered by <span className="text-blue-600">Imagify AI</span> • Trusted by 250k+ creators worldwide
      </motion.p>
    </motion.div>
  );
};

export default Header;





