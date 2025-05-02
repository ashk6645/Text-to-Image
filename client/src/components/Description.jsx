import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  const features = [
    {
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge artificial intelligence for high-quality image generation.',
      icon: '🤖'
    },
    {
      title: 'Multiple Styles',
      description: 'Choose from various artistic styles to match your creative vision.',
      icon: '🎨'
    },
    {
      title: 'Fast Generation',
      description: 'Get your results in seconds, not minutes.',
      icon: '⚡'
    },
    {
      title: 'High Resolution',
      description: 'Generate crystal-clear images perfect for any use case.',
      icon: '✨'
    }
  ]

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Create AI Images
          </h2>
          <p className="text-xl text-gray-600">
            Turn your imagination into visuals
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl transform rotate-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
            />
            <motion.img
              src={assets.sample_img_1}
              alt="AI Generated Art"
              className="relative rounded-2xl shadow-2xl w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              AI-Powered Text to Image Generator
            </h3>
            
            <p className="text-gray-600 text-lg">
              Transform your creative ideas into stunning visuals with our advanced AI technology. 
              Whether you need product mockups, marketing materials, or artistic inspiration, 
              our platform makes it effortless to bring your vision to life.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8"
            >
              <a
                href="/result"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full text-lg font-medium hover:shadow-lg transition-all"
              >
                Try It Now
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
        >
          {[
            { number: '1M+', label: 'Images Generated' },
            { number: '50K+', label: 'Active Users' },
            { number: '100+', label: 'Style Options' },
            { number: '4.9/5', label: 'User Rating' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-md"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Description

