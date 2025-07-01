'use client'

import '../globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  Send,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const BusinessContactDetails = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleBackToHome = () =>{
    router.push('/');
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const businessInfo = {
    name: "Sea Catering",
    address: {
      street: "1234 Jakarta Barat",
      city: "DKI Jakarta",
      state: "ID",
      zip: "60111"
    },
    phone: "+62 8123-4567-89",
    email: "contact@seacatering.com",
    website: "https://www.seacatering.com",
    socialMedia: {
      facebook: "https://facebook.com/seacatering",
      twitter: "https://twitter.com/seacatering",
      linkedin: "https://linkedin.com/company/seacatering"
    },
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  };

  const faqs = [
    {
      question: "Can you ship to Papua?",
      answer: "Yes, we ship to all cities across Indonesia!"
    },
    {
      question: "How to know what meal plan to choose",
      answer: "Users can take a look at the details of the menu and if further question persist you can contact Us!"
    },
    {
      question: "Is the meal customizable",
      answer: "Yes, you can customize your meal in the subscription plan"
    }
  ];

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const backBtnStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '2rem'
  };

  const inputStyle = {
    padding: '0.875rem 1rem',
    border: '2px solid #e1e5e9',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#f8f9fa',
    width: '100%'
  };

  const buttonStyle = {
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const tabButtonStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.2)',
    color: isActive ? 'white' : '#333',
    backdropFilter: 'blur(5px)'
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            {businessInfo.name}
          </h1>
        </div>
        <button style={backBtnStyle} onClick={handleBackToHome}>
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Contact Us
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              Your favorite catering
            </p>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
            <button
              onClick={() => setActiveTab('contact')}
              style={tabButtonStyle(activeTab === 'contact')}
            >
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab('form')}
              style={tabButtonStyle(activeTab === 'form')}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('support')}
              style={tabButtonStyle(activeTab === 'support')}
            >
              Support & FAQ
            </button>
          </div>

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {/* Contact Details */}
              <div style={cardStyle}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>
                  Get in Touch
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <MapPin size={24} style={{ color: '#667eea' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Address</h3>
                      <p style={{ color: '#666', margin: 0, lineHeight: '1.5' }}>
                        {businessInfo.address.street}<br />
                        {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <Phone size={24} style={{ color: '#22c55e' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Phone</h3>
                      <p style={{ color: '#666', margin: 0 }}>{businessInfo.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      background: 'rgba(168, 85, 247, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <Mail size={24} style={{ color: '#a855f7' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Email</h3>
                      <p style={{ color: '#666', margin: 0 }}>{businessInfo.email}</p>
                    </div>
                  </div>

                  {/* Website */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      background: 'rgba(249, 115, 22, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <Globe size={24} style={{ color: '#f97316' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Website</h3>
                      <p style={{ color: '#666', margin: 0 }}>{businessInfo.website}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '1rem' }}>Follow Us</h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={businessInfo.socialMedia.facebook} style={{
                      background: '#1877f2',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'transform 0.3s ease'
                    }}>
                      <Facebook size={20} />
                    </a>
                    <a href={businessInfo.socialMedia.twitter} style={{
                      background: '#1da1f2',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'transform 0.3s ease'
                    }}>
                      <Twitter size={20} />
                    </a>
                    <a href={businessInfo.socialMedia.linkedin} style={{
                      background: '#0077b5',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'transform 0.3s ease'
                    }}>
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <Clock size={24} style={{ color: '#667eea' }} />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
                    Business Hours
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    border: '2px solid #e1e5e9'
                  }}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Monday - Friday</span>
                    <span style={{ color: '#666' }}>{businessInfo.hours.weekdays}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    border: '2px solid #e1e5e9'
                  }}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Saturday</span>
                    <span style={{ color: '#666' }}>{businessInfo.hours.saturday}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    border: '2px solid #e1e5e9'
                  }}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Sunday</span>
                    <span style={{ color: '#ef4444' }}>{businessInfo.hours.sunday}</span>
                  </div>
                </div>

                {/* Live Chat */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  borderRadius: '10px',
                  border: '2px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <MessageSquare size={24} style={{ color: '#667eea' }} />
                    <h3 style={{ fontWeight: '600', color: '#333', margin: 0 }}>Live Chat Available</h3>
                  </div>
                  <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.5' }}>
                    Need immediate assistance? Chat with our support team during business hours.
                  </p>
                  <button style={buttonStyle}>Start Chat</button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form Tab */}
          {activeTab === 'form' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={cardStyle}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem', textAlign: 'center' }}>
                  Send us a Message
                </h2>
                
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <CheckCircle size={64} style={{ color: '#22c55e', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: '#666' }}>
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', color: '#333', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', color: '#333', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontWeight: '500', color: '#333', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry"
                        style={inputStyle}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontWeight: '500', color: '#333', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        rows="6"
                        style={{
                          ...inputStyle,
                          resize: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Send size={20} />
                      Send Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Support & FAQ Tab */}
          {activeTab === 'support' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {/* Support Resources */}
              


              {/* FAQ */}
              <div style={cardStyle}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>
                  Frequently Asked Questions
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {faqs.map((faq, index) => (
                    <div key={index} style={{
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      padding: '1rem',
                      background: '#f8f9fa'
                    }}>
                      <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: '#666', margin: 0, lineHeight: '1.5' }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  border: '2px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <p style={{ color: '#667eea', margin: 0, fontWeight: '500' }}>
                    <strong>Still need help?</strong> Contact our support team using the contact form or give us a call during business hours.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessContactDetails;