import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';
import FormField from '../components/shared/FormField';
import { toast } from 'react-toastify';

const stylePresets = [
  { name: 'Realistic', value: 'realistic photo', description: 'Photorealistic style' },
  { name: 'Artistic', value: 'artistic painting', description: 'Creative artistic interpretation' },
  { name: 'Digital Art', value: 'digital art', description: 'Modern digital artwork' },
  { name: 'Anime', value: 'anime style', description: 'Japanese anime style' },
  { name: '3D', value: '3d rendered', description: '3D rendered visualization' }
];

const sizeOptions = [
  { name: 'Square', value: '1:1', resolution: '1024x1024' },
  { name: 'Portrait', value: '2:3', resolution: '1024x1536' },
  { name: 'Landscape', value: '3:2', resolution: '1536x1024' },
  { name: 'Widescreen', value: '16:9', resolution: '1792x1024' }
];

const promptSuggestions = [
  'A serene mountain landscape at sunset',
  'A futuristic cityscape with flying cars',
  'An enchanted forest with magical creatures',
  'A cozy cafe interior with warm lighting',
  'An abstract representation of emotions'
];

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [formData, setFormData] = useState({
    prompt: '',
    style: '',
    negativePrompt: '',
    size: '1:1'
  });

  const { generateImage, user } = useContext(AppContext);

  // Load image history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('imageHistory') || '[]');
    setImageHistory(history);
  }, []);

  const saveToHistory = (imageData) => {
    const newHistory = [
      { 
        ...imageData, 
        timestamp: new Date().toISOString() 
      },
      ...imageHistory
    ].slice(0, 10); // Keep only last 10 images
    setImageHistory(newHistory);
    localStorage.setItem('imageHistory', JSON.stringify(newHistory));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStyleSelect = (style) => {
    setFormData(prev => ({
      ...prev,
      style: style.value
    }));
  };

  const handleSizeSelect = (size) => {
    setFormData(prev => ({
      ...prev,
      size: size.value
    }));
  };

  const handlePromptSuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      prompt: suggestion
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const finalPrompt = formData.style 
        ? `${formData.prompt}, ${formData.style}` 
        : formData.prompt;

      const generatedImage = await generateImage(
        finalPrompt,
        formData.negativePrompt,
        formData.size
      );

      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
        saveToHistory({
          image: generatedImage,
          prompt: formData.prompt,
          style: formData.style,
          size: formData.size
        });
      }
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My AI Generated Image',
        text: formData.prompt,
        url: image
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast.error('Failed to share image');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Generator
          </h1>
          <p className="text-xl text-gray-600">
            Transform your ideas into stunning visuals
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Display Section */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src={image}
                alt="Generated"
                className="w-full object-cover transition-all duration-500"
              />
              {loading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-white text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                    />
                    <p className="text-xl font-semibold">Creating your masterpiece...</p>
                  </div>
                </div>
              )}
            </div>

            {isImageLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setIsImageLoaded(false);
                    setFormData(prev => ({ ...prev, prompt: '' }));
                  }}
                >
                  Generate Another
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleShare}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  }
                >
                  Share
                </Button>
                <a
                  href={image}
                  download="ai-generated-image.png"
                  className="flex-1"
                >
                  <Button
                    variant="secondary"
                    fullWidth
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    }
                  >
                    Download
                  </Button>
                </a>
              </motion.div>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-8">
            <form onSubmit={onSubmitHandler} className="space-y-6">
              {/* Prompt Input */}
              <FormField
                label="Describe your image"
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="Enter a detailed description of what you want to generate..."
                as="textarea"
                rows={4}
              />

              {/* Prompt Suggestions */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Try these prompts:
                </label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePromptSuggestion(suggestion)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Style Presets */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Style Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {stylePresets.map((style) => (
                    <motion.button
                      key={style.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStyleSelect(style)}
                      className={`p-3 rounded-lg text-left ${
                        formData.style === style.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{style.name}</div>
                      <div className="text-xs opacity-80">{style.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Image Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Image Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sizeOptions.map((size) => (
                    <motion.button
                      key={size.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSizeSelect(size)}
                      className={`p-2 rounded-lg text-center ${
                        formData.size === size.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-xs opacity-80">{size.resolution}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <FormField
                label="Negative Prompt (Optional)"
                name="negativePrompt"
                value={formData.negativePrompt}
                onChange={handleInputChange}
                placeholder="Elements you want to avoid in the generation..."
              />

              {/* Generate Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={!formData.prompt || loading}
              >
                {loading ? 'Generating...' : 'Generate Image'}
              </Button>
            </form>

            {/* History Button */}
            {imageHistory.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => setShowHistory(true)}
                className="mt-4"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                View History
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* History Modal */}
      <Modal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="Generation History"
        size="lg"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {imageHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => {
                setImage(item.image);
                setIsImageLoaded(true);
                setShowHistory(false);
              }}
            >
              <img
                src={item.image}
                alt={item.prompt}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-4">
                <p className="text-white text-sm line-clamp-3">{item.prompt}</p>
                <p className="text-white/60 text-xs absolute bottom-4 left-4">
                  {new Date(item.timestamp).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Modal>
    </motion.div>
  );
};

export default Result;
