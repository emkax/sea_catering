"use client"

import DynamicDiv from './navbar.tsx'
import styles from './page.module.css';
import './globals.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'; // Uncomment when you create separate pages

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home'); // Track current page
  
  // Testimonial state
  const [testimonials, setTestimonials] = useState([]);
  
  

  useEffect(() => {
      fetch('/api/testimonial')
      .then((res) => res.json())
      .then((json) => {
          setTestimonials(json['payload']);
      });
  }, []);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5
  });

  const sendReview = async (formJson) => {
    const res = await fetch('/api/testimonial', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
    });

    const result = await res.json();
    console.log(result);
    };

  // Handle testimonial form submission
  const handleTestimonialSubmit = (e) => {
    e.preventDefault(); 
    if (formData.name.trim() && formData.message.trim()) {
      const newTestimonial = {
        id: testimonials.length + 1,
        name: formData.name,
        message: formData.message,
        rating: formData.rating
      };
      sendReview(formData);
      console.log(formData)
      setTestimonials([...testimonials, newTestimonial]);
      setFormData({ name: '', message: '', rating: 5 });
      // alert('Thank you for your testimonial!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navigation functions for testimonials
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? styles.star_filled : styles.star_empty}>
        ★
      </span>
    ));
  };

  const handleBackToHome = () =>{
    router.push('/');
  }


  
  const handlePageNavigation = (page) => {
    setCurrentPage(page);
    const session = true; // Temporarily hardcoded, replace with real auth session check
    if (page === 'home' && currentPage === 'home' && session === true) {
      scrollToSection('hero');
    } else if (page === 'subscription' && session === false) {
      router.push(`/login`);
    } else {
      router.push(`/${page}`);
      console.log(`Navigate to ${page} page`);
    }
  };


  const router = useRouter();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = sectionId === 'hero' ? 0 : element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
        });
    }
    };

  
  return (
    <div>
      <DynamicDiv currPage="home"/>
      <main>
        {/* HOME PAGE CONTENT */}
        {/* Hero section */}
        <section id="hero" className={styles.hero_section}> 
          <div className={styles.content_section}>
            <div className={styles.text_block}>
              <h1 className={styles.title}>SEA CATERING</h1>
              <p className={styles.slogan}>Healthy Meals, Anytime, Anywhere</p>
              <div className={styles.buttons}>
                <a href="#" className={styles.button_order_now} onClick={(e) => {handlePageNavigation('subscription')}}>
                  Order Now
                </a>
                <a 
                  href="#contact" 
                  className={styles.button_contact_us}
                  onClick={(e) => { e.preventDefault(); handlePageNavigation('contact'); setCurrentPage('contact')}}
                >
                  <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Contact Us
                </a>
              </div>
            </div>
            <div className={styles.hero_image_wrapper}>
              <Image src='/assets/logo_main.jpg' alt="Sea Catering delicious meals" width={500} height={300} className={styles.hero_image}/>
            </div>
          </div>
        </section>
        
        {/* About section - Part of Home page */}
        <section id="about" className={styles.about_section}>
          <div className={styles.about_section_content}>
            <div className={styles.about_image_wrapper}>
              <Image src='/assets/food_plate.jpg' alt="menu examples" width={500} height={300} className={styles.about_image}/>
            </div>
            <div className={styles.about_detail}>
              <h2 className={styles.about_section_detail}>About us</h2>
              <p className={styles.about_text}>SEA Catering is one of Indonesia's fastest-growing healthy meal services, known for our fully customizable menus and reliable delivery across major cities. we serve thousands of customers who trust us to bring fresh, balanced meals right to their doorstep — anytime, anywhere. Our mission is simple: to make healthy eating accessible, effortless, and enjoyable for everyone in Indonesia.</p>
            </div>
          </div>
        </section>
        {/* Services section - Part of Home page */}
        <section id="services" className={styles.services_section}>
          <div className={styles.services_section_content}>
            <ul className={styles.services_list}>
              <li className={styles.services_item}>
                <Image src='/assets/meal_customization.jpg' width={300} height={300} alt="customization" className={styles.services_image}/>
                <h3 className={styles.service_name}>Meal Customization</h3>
                <p className={styles.service_text}>we offer meal customization</p>
              </li>
              <li className={styles.services_item}>
                <Image src='/assets/meal_delivery.jpg' width={300} height={300} alt="delivery" className={styles.services_image}/>
                <h3 className={styles.service_name}>City Delivery</h3>
                <p className={styles.service_text}>we deliver to many city</p>
              </li>
              <li className={styles.services_item}>
                <Image src='/assets/detailed_nutrition.jpg' alt='detailed nutrition' width={300} height={300} className={styles.services_image}/>
                <h3 className={styles.service_name}>Detailed Nutrition</h3>
                <p className={styles.service_text}>we put detailed nutrition facts onto the meal</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Testimonials section */}
        <section id="testimonials" className={styles.testimonials_section}>
          <div className={styles.testimonials_content}>
            <h2 className={styles.testimonials_title}>What Our Customers Say</h2>
            
            {/* Testimonials Slider */}
            <div className={styles.testimonials_slider}>
              <button 
                className={styles.slider_btn_prev} 
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              
              <div className={styles.testimonial_card}>
                <div className={styles.testimonial_stars}>
                  {renderStars(testimonials[currentTestimonial]?.rating)}
                </div>
                <p className={styles.testimonial_message}>
                  "{testimonials[currentTestimonial]?.message}"
                </p>
                <h4 className={styles.testimonial_name}>
                  - {testimonials[currentTestimonial]?.name}
                </h4>
              </div>
              
              <button 
                className={styles.slider_btn_next} 
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>

            {/* Testimonial dots indicator */}
            <div className={styles.testimonial_dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentTestimonial ? styles.dot_active : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Testimonial Form */}
            <div className={styles.testimonial_form_section}>
              <h3 className={styles.form_title}>Share Your Experience</h3>
              <form className={styles.testimonial_form} onSubmit={handleTestimonialSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="name" className={styles.form_label}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.form_input}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="rating" className={styles.form_label}>Rating</label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className={styles.form_select}
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Good</option>
                    <option value={2}>2 Stars - Fair</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="message" className={styles.form_label}>Your Review</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.form_textarea}
                    rows={4}
                    required
                    placeholder="Tell us about your experience with Sea Catering..."
                  />
                </div>

                <button type="submit" className={styles.form_submit_btn}>
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Contact section - Part of Home page */}
        <section id="contact" className={styles.contact_section}>
          <div className={styles.contact_container}>
            <h2 className={styles.contact_title}>Get In Touch</h2>
            <p className={styles.contact_subtitle}>We'd love to hear from you. Reach out to us anytime!</p>
            
            <div className={styles.contact_content}>
              <div className={styles.contact_card}>
                <div className={styles.contact_header}>
                  <div className={styles.icon_wrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className={styles.contact_icon}>
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <h3 className={styles.contact_label}>Manager</h3>
                </div>
                <p className={styles.contact_value}>Brian</p>
              </div>

              <div className={styles.contact_card}>
                <div className={styles.contact_header}>
                  <div className={styles.icon_wrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className={styles.contact_icon}>
                      <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.21 1.11z"/>
                    </svg>
                  </div>
                  <h3 className={styles.contact_label}>Phone</h3>
                </div>
                <a href="tel:08123456789" className={styles.contact_value}>
                  +62 812 3456 789
                </a>
              </div>


            </div>
          </div>
        </section>
      </main>
    </div>
  );
}