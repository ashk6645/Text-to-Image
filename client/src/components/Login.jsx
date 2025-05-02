import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const endpoint = state === 'Login' ? '/login' : '/register'
            const { data } = await axios.post(
                `${backendUrl}/api/user${endpoint}`,
                formData
            )

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
                toast.success(`${state} successful!`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowLogin(false)}
                        className="absolute top-4 right-4 p-1"
                    >
                        <img src={assets.cross_icon} alt="close" className="w-6 h-6" />
                    </motion.button>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl font-bold text-center mb-2">{state}</h1>
                        <p className="text-gray-500 text-center mb-8">
                            {state === 'Login'
                                ? 'Welcome back! Please enter your details.'
                                : 'Create an account to get started.'}
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={onSubmitHandler}
                        className="space-y-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {state === 'Sign Up' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <img
                                        src={assets.profile_icon}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                                        alt="name"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-14 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <img
                                    src={assets.email_icon}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                                    alt="email"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-14 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <img
                                    src={assets.lock_icon}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                                    alt="password"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-14 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {state === 'Login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-medium flex justify-center items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <motion.span
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block animate-spin"
                                />
                            ) : (
                                state
                            )}
                        </motion.button>

                        <p className="text-center text-sm text-gray-600">
                            {state === 'Login' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setState('Sign Up')}
                                        className="text-blue-600 font-medium hover:text-blue-800"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setState('Login')}
                                        className="text-blue-600 font-medium hover:text-blue-800"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </p>
                    </motion.form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Login
