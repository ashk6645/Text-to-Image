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
        Transform your words into stunning <span className="text-blue-600">images.</span>
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
        Generate Images
        <img src={assets.star_group} alt="star group" className="h-6" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className="flex flex-wrap justify-center mt-16 gap-6 sm:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(8)
  .fill('')
  .map((item, index) => (
    <motion.img
      key={index}
      src={assets[`sample_img_${(index % 8) + 1}`]} // This will alternate between sample_img_1, sample_img_2, and sample_img_3
      alt={`sample image ${index}`}
      width={70}
      className="rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
    />
  ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-6 text-neutral-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Images powered by Imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;





