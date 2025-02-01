import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a description to generate an image');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
      }
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center bg-gradient-to-br from-sky-50 to-cyan-50 p-6"
    >
      {/* Header Section */}
      <header className="text-center mb-10 space-y-4">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Transform Ideas into Art
        </motion.h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Describe your vision and watch as AI brings it to life. Start with something like "A sunset over snow-capped mountains" or "cyberpunk cityscape".
        </p>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl space-y-8">
        {/* Image Display Area */}
        <div className="relative aspect-square w-full bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Generated artwork"
              className="w-full h-full object-cover transition-opacity duration-300"
              onLoad={() => setIsImageLoaded(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-lg">Your generated artwork will appear here</span>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center space-y-4">
              <div className="spinner-dot-pulse">
                <div className="dot-pulse"></div>
              </div>
              <p className="text-white font-medium text-lg">Crafting your masterpiece...</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-center px-4 py-2 bg-red-50 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Input Section */}
        {!isImageLoaded && !loading && (
          <div className="flex flex-col space-y-4">
            <div className="relative flex items-center bg-white shadow-md rounded-xl p-1">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                placeholder="Describe your vision..."
                className="flex-1 px-6 py-4 text-lg bg-transparent outline-none placeholder:text-gray-400"
                aria-label="Image description input"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-medium hover:scale-[1.02] transition-transform duration-200 shadow-lg"
              >
                Create Art
              </button>
            </div>
            <p className="text-gray-500 text-sm text-center">
              Tip: Be descriptive! Include colors, styles, and context for best results.
            </p>
          </div>
        )}

        {/* Post-Generation Actions */}
        {isImageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => {
                setIsImageLoaded(false);
                setInput('');
              }}
              className="px-8 py-3 rounded-xl bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-md"
            >
              Start Over
            </button>
            <a
              href={image}
              download="AI-Artwork.png"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg transition-shadow duration-200 text-center shadow-md"
            >
              Download Artwork
            </a>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
};

export default Result;