import React, { useState } from 'react';
import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Transform your ideas into stunning visuals in three simple steps
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-teal-400 transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Step Number */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    backgroundColor: hoveredIndex === index ? '#3B82F6' : '#ffffff'
                  }}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-6 relative z-10"
                >
                  <span 
                    className={`text-xl font-bold ${
                      hoveredIndex === index ? 'text-white' : 'text-blue-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  initial={false}
                  animate={{
                    y: hoveredIndex === index ? -5 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1
                  }}
                  className="flex justify-center mb-6"
                >
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1
                  }}
                  className="text-center px-4"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </motion.div>

                {/* Background Card */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    boxShadow: hoveredIndex === index 
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  className="absolute inset-0 bg-white rounded-2xl -z-10"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => window.location.href = '/result'}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Creating Now
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Steps;
