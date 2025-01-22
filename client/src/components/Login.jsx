import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'  // Add toast notification for errors

const Login = () => {

    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-8 sm:p-12 rounded-xl shadow-xl text-gray-700 w-full max-w-md mx-4 md:mx-0"
            >
                <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">{state}</h1>
                <p className="text-center text-sm text-gray-600 mb-6">{state === 'Login' ? 'Welcome back! Please sign in to continue.' : 'Create your account to get started.'}</p>

                {state !== 'Login' && (
                    <div className="flex items-center gap-4 border px-6 py-2 rounded-full mt-4 mb-6">
                        <img src={assets.profile_icon} alt="profile" className="w-10 h-10 rounded-full" />
                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type="text"
                            className="outline-none text-sm w-full"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                )}

                <div className="flex items-center gap-4 border px-6 py-2 rounded-full mt-4 mb-6">
                    <img src={assets.email_icon} alt="email" className="w-10 h-10 rounded-full" />
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="outline-none text-sm w-full"
                        placeholder="Email ID"
                        required
                    />
                </div>

                <div className="flex items-center gap-4 border px-6 py-2 rounded-full mt-4 mb-6">
                    <img src={assets.lock_icon} alt="lock" className="w-10 h-10 rounded-full" />
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="outline-none text-sm w-full"
                        placeholder="Password"
                        required
                    />
                </div>

                <p className="text-sm text-blue-600 my-4 cursor-pointer text-center">Forgot password?</p>

                <motion.button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-full text-lg mt-4 transition-transform transform hover:scale-105 active:scale-95"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </motion.button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    {state === 'Login' ? (
                        <>
                            Don't have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setState('Sign Up')}
                            >
                                Sign up
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setState('Login')}
                            >
                                Login
                            </span>
                        </>
                    )}
                </p>

                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt="close"
                    className="absolute top-5 right-5 cursor-pointer w-6 h-6"
                />
            </motion.form>
        </div>
    );
}

export default Login;

