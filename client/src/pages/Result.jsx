import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { generateImage } = useContext(AppContext);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center bg-gradient-to-r from-blue-100 to-teal-100 p-6"
    >
      <div className="relative w-full max-w-md">
        {/* Display Image */}
        <div className="relative">
          <img
            src={image}
            alt="Generated"
            className="max-w-full rounded-lg shadow-xl transition-all duration-500"
          />
          {/* Loading Progress Bar */}
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}
          />
        </div>

        {/* Loading State Text */}
        {loading && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-semibold">
            Generating Image...
          </p>
        )}
      </div>

      {/* Input Field to Describe Image */}
      {!isImageLoaded && !loading && (
        <div className="flex w-full max-w-xl bg-white text-gray-700 text-sm p-3 mt-8 rounded-xl shadow-md">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500 px-4 py-2 rounded-l-full"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
          >
            Generate
          </button>
        </div>
      )}

      {/* Image Action Buttons after Image is Loaded */}
      {isImageLoaded && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setIsImageLoaded(false)}
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
