import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Imagify Credits',
      description: `${selectedPlan?.credits} Credits Purchase`,
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razorpay`,
            { response },
            { headers: { token } }
          )
          if (data.success) {
            loadCreditsData()
            toast.success('Payment successful! Credits added to your account.')
            navigate('/result')
          }
        } catch (error) {
          toast.error('Payment verification failed. Please contact support.')
        }
      },
      theme: {
        color: '#3B82F6'
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePurchase = async (plan) => {
    if (!user) {
      setShowLogin(true)
      return
    }

    try {
      setIsLoading(true)
      setSelectedPlan(plan)
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razorpay`,
        { planId: plan.id },
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the credits you need to bring your creative ideas to life with our AI-powered image generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{plan.id}</h2>
                    <p className="text-gray-500">{plan.desc}</p>
                  </div>
                  <img src={assets.credit_star} alt="credits" className="w-12 h-12" />
                </div>

                <div className="mb-8">
                  <p className="text-4xl font-bold text-gray-900">${plan.price}</p>
                  <p className="text-gray-500">{plan.credits} credits</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    High-quality image generation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Multiple style options
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 support
                  </li>
                </ul>

                <motion.button
                  onClick={() => handlePurchase(plan)}
                  disabled={isLoading && selectedPlan?.id === plan.id}
                  className={`w-full py-4 rounded-xl font-semibold text-white
                    ${isLoading && selectedPlan?.id === plan.id
                      ? 'bg-gray-400'
                      : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
                    } transition-all duration-300`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading && selectedPlan?.id === plan.id ? (
                    <motion.span
                      className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    'Get Started'
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            Need a custom plan?{' '}
            <a href="mailto:support@imagify.ai" className="text-blue-500 hover:text-blue-700">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default BuyCredit
