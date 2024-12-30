import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from 'framer-motion';

const UseCases = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Real-Life Use Cases</h1>
      <p className="text-gray-500 mb-12">How our users apply our service in everyday scenarios</p>

      <div className="flex flex-wrap gap-6 justify-center">
        {/* Use Case 1 */}
        <div className="p-11 rounded-lg shadow-md border w-80 text-center cursor-pointer hover:scale-[1.02] transition-all">
          <img src={assets.content} alt="Content Creation" className="w-16 mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">For Content Creators</h2>
          <p className="text-gray-500">Quickly generate visuals for blogs, social media, and more.</p>

        </div>

        {/* Use Case 2 */}
        <div className="p-6 rounded-lg shadow-md border w-80 text-center cursor-pointer hover:scale-[1.02] transition-all">
          <img src={assets.marketer} alt="Marketing" className="w-16 mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">For Marketers</h2>
          <p className="text-gray-500">Create stunning visuals for ads, banners, and campaigns.</p>
        </div>

        {/* Use Case 3 */}
        <div className="p-10 rounded-lg shadow-md border w-80 text-center cursor-pointer hover:scale-[1.02] transition-all">
          <img src={assets.business_icon} alt="Business" className="w-16 mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">For Businesses</h2>
          <p className="text-gray-500">Generate unique images for product presentations and branding.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UseCases;
