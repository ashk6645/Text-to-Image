import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '/buy' },
        { name: 'Generate', href: '/result' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ]
    }
  ]

  const socialLinks = [
    { icon: assets.facebook_icon, href: '#', name: 'Facebook' },
    { icon: assets.twitter_icon, href: '#', name: 'Twitter' },
    { icon: assets.instagram_icon, href: '#', name: 'Instagram' }
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#FFEBD6] to-[#FFF6EC] pt-16 pb-8 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <motion.img 
                src={assets.logo} 
                alt="Imagify" 
                className="h-8 mb-4"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-gray-700 text-sm">
              Transform your ideas into stunning visuals with our AI-powered image generation platform.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((category) => (
            <div key={category.title}>
              <h3 className="text-gray-900 font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 Imagify. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="h-6 w-6"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
