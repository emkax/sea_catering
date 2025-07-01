"use client"

import styles from './signup.module.css';
import '../globals.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { json } from 'stream/consumers';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
    }
        
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual registration
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      
      if (jsonResponse.success === true) {
        alert('Account created successfully! Please sign in.');
        router.push('/login');
      } else if (jsonResponse.success === false) {
        alert(jsonResponse.error);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleSignInRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.signup_container}>
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

      {/* Main Signup Content */}
      <main className={styles.main_content}>
        <div className={styles.signup_wrapper}>
          {/* Left Side - Welcome Message */}
          <div className={styles.welcome_section}>
            <div className={styles.welcome_content}>
              <h1 className={styles.welcome_title}>Join Sea Catering!</h1>
              <p className={styles.welcome_subtitle}>
                Create your account and start enjoying fresh, healthy meals delivered right to your door.
              </p>
              <div className={styles.feature_highlights}>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🎯</span>
                  <span>Personalized Meal Planning</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>⚡</span>
                  <span>Quick & Easy Ordering</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>💚</span>
                  <span>Fresh, Healthy Ingredients</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🏆</span>
                  <span>Premium Quality Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
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
                <h2 className={styles.form_title}>Create Account</h2>
                <p className={styles.form_subtitle}>Fill in your details to get started</p>
              </div>

              <form className={styles.signup_form} onSubmit={handleSubmit}>
                <div className={styles.name_row}>
                  <div className={styles.form_group}>
                    <label htmlFor="firstName" className={styles.form_label}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`${styles.form_input} ${errors.firstName ? styles.error : ''}`}
                      placeholder="Enter first name"
                      required
                    />
                    {errors.firstName && <span className={styles.error_text}>{errors.firstName}</span>}
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="lastName" className={styles.form_label}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`${styles.form_input} ${errors.lastName ? styles.error : ''}`}
                      placeholder="Enter last name"
                      required
                    />
                    {errors.lastName && <span className={styles.error_text}>{errors.lastName}</span>}
                  </div>
                </div>

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
                    className={`${styles.form_input} ${errors.email ? styles.error : ''}`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && <span className={styles.error_text}>{errors.email}</span>}
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
                      className={`${styles.form_input} ${errors.password ? styles.error : ''}`}
                      placeholder="Create a password"
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
                  {errors.password && <span className={styles.error_text}>{errors.password}</span>}
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="confirmPassword" className={styles.form_label}>
                    Confirm Password
                  </label>
                  <div className={styles.password_input_wrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`${styles.form_input} ${errors.confirmPassword ? styles.error : ''}`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.password_toggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className={styles.error_text}>{errors.confirmPassword}</span>}
                </div>

                <div className={styles.form_options}>
                  <label className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkbox_label}>
                      I agree to the <a href="#" className={styles.terms_link}>Terms & Conditions</a> and <a href="#" className={styles.terms_link}>Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreeToTerms && <span className={styles.error_text}>{errors.agreeToTerms}</span>}
                </div>

                <button 
                  type="submit" 
                  className={styles.signup_btn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className={styles.form_footer}>
                <p className={styles.signin_prompt}>
                  Already have an account? 
                  <button 
                    type="button"
                    onClick={handleSignInRedirect}
                    className={styles.signin_link}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}