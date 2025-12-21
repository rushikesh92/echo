import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { Loader, LoaderIcon, MessageCircleIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components';

function LoginPage() {

  const { login, isLoggingIn } = useAuthStore();
  const [formdata, setFormdata] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formdata);
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[650px] h-[650px]">
        <Container>
          <div className="w-full flex flex-col md:flex-row">
            {/* left */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* heading */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Sign In</h2>
                  <p className="text-slate-400">Log in into your account</p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* input email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formdata.email}
                        onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                        className="input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* input password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formdata.password}
                        onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  {/* submit */}
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
              <div className='flex flex-col items-center justify-center'>
                <img
                  src="./dialogue.png"
                  alt="signup display"
                  className="w-[40%] h-auto  object-contain"
                />
                <div className=" text-center flex flex-col gap-3">
                  <div className='text-4xl font-bold'>QuickChat</div> 
                  <h3 className="text-xl font-medium text-cyan-400">Connect to the world!</h3>

                  <div className=" flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default LoginPage