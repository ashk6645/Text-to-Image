// import React from 'react'
// import { stepsData } from '../assets/assets'
// import { motion } from 'framer-motion'

// const Steps = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0.2, y: 100 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className='flex flex-col items-center justify-center my-32' >
//       <h1 className='text 3xl sm:text-4xl font-semobold mb-2' >How it works</h1>
//       <p className='text-lg text-gray-600 mb-8' >Transforms word into stunning Images</p>

//       <div className='space y-4 w-full max-w-3xl text-sm'>
//         {stepsData.map((item, index) => (
//           <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg' >
//             <img src={item.icon} alt="" />
//             <div>
//               <h2 className='text-xl font-medium'>{item.title}</h2>
//               <p className='text-gray-500'>{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   )
// }

// export default Steps



import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-20 sm:py-32"
    >
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        How it works
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Transform words into stunning images with ease. Follow these simple steps to unleash your creativity!
      </motion.p>

      {/* Steps Container */}
      <div className="w-full max-w-3xl space-y-6">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-6 p-6 bg-white shadow-lg rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
          >
            <img src={item.icon} alt={item.title} className="w-12 h-12 rounded-full object-contain" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
