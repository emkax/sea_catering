"use client"

import styles from './login.module.css';
import '../globals.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual authentication
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        }),
      });
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      if (jsonResponse.state === true) {
        // Redirect to dashboard or home page
        router.push('/subscription');
      } else if (jsonResponse.state === false){
        alert('Invalid credentials. Please try again.');
      } else {
        alert('you havent registered before')
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.login_container}>
      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className={styles.nav_logo} onClick={handleBackToHome}>
          <h2 className={styles.logo_text}>👨🏻‍🍳 Sea Catering</h2>
        </div>
        <button 
          className={styles.back_btn}
          onClick={handleBackToHome}
        >
          ← Back to Home
        </button>
      </nav>

      {/* Main Login Content */}
      <main className={styles.main_content}>
        <div className={styles.login_wrapper}>
          {/* Left Side - Welcome Message */}
          <div className={styles.welcome_section}>
            <div className={styles.welcome_content}>
              <h1 className={styles.welcome_title}>Welcome Back!</h1>
              <p className={styles.welcome_subtitle}>
                Sign in to access your Sea Catering account and enjoy healthy meals delivered to your doorstep.
              </p>
              <div className={styles.feature_highlights}>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🍽️</span>
                  <span>Customizable Meal Plans</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🚚</span>
                  <span>Fast City-wide Delivery</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>📊</span>
                  <span>Detailed Nutrition Info</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className={styles.form_section}>
            <div className={styles.form_container}>
              <div className={styles.form_header}>
                <Image 
                  src='/assets/logo_main.jpg' 
                  alt="Sea Catering Logo" 
                  width={80} 
                  height={80} 
                  className={styles.form_logo}
                />
                <h2 className={styles.form_title}>Sign In</h2>
                <p className={styles.form_subtitle}>Enter your credentials to continue</p>
              </div>

              <form className={styles.login_form} onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="email" className={styles.form_label}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.form_input}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="password" className={styles.form_label}>
                    Password
                  </label>
                  <div className={styles.password_input_wrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.form_input}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.password_toggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className={styles.form_options}>
                  <label className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkbox_label}>Remember me</span>
                  </label>
                  <a href="#" className={styles.forgot_password}>
                    Forgot Password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className={styles.login_btn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className={styles.form_footer}>
                <p className={styles.signup_prompt}>
                  Don't have an account? 
                  <a href="/signup" className={styles.signup_link}>Sign Up</a>
                </p>
        
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}