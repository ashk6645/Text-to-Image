import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Button from './shared/Button';

const Navbar = ({ onMobileMenuToggle }) => {
    const location = useLocation();
    const { user, credit, handleLogout, setShowLogin, toggleTheme } = useContext(AppContext);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Create', path: '/result' },
        { name: 'Buy Credits', path: '/buy' }
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.img
                            src={assets.logo_icon}
                            alt="Logo"
                            className="w-8 h-8"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
                            Imagify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        

                        {/* User Section */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {/* Credits Display */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="hidden sm:flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full"
                                >
                                    <img src={assets.credit_star} alt="Credits" className="w-4 h-4" />
                                    <span className="text-sm font-medium text-blue-600">{credit}</span>
                                </motion.div>

                                {/* User Menu */}
                                <div className="relative group">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <img
                                            src={user.profileImg || assets.profile_icon}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                                            {user.name}
                                        </span>
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <Button
                                    variant="primary"
                                    onClick={() => setShowLogin(true)}
                                >
                                    Sign In
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onMobileMenuToggle}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;