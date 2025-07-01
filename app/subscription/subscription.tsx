"use client";

import DynamicDiv from '../navbar.tsx'
import styles from './subscription.module.css';
import React, { useState } from 'react';
import '../globals.css';
import { useRouter } from 'next/navigation';

function ModalExist({isOpen, onClose}){
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_icon}>❌</div>
        <h2 className={styles.modal_title}>Subscription has existed!</h2>
        <p className={styles.modal_price}>
          Loading your current subscription
        </p>
        <p className={styles.modal_message}>
          Modify the subscription and will be updated for next weeek
        </p>
        <button onClick={onClose} className={styles.modal_button}>
          Continue
        </button>
      </div>
    </div>
  );
}

function ModalSuccess({ isOpen, onClose, price }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_icon}>✅</div>
        <h2 className={styles.modal_title}>Subscription Successful!</h2>
        <p className={styles.modal_price}>
          Total Price: <strong>Rp{price.toLocaleString()},00</strong>
        </p>
        <p className={styles.modal_message}>
          Thank you for choosing Sea Catering! We'll contact you soon with delivery details.
        </p>
        <button onClick={onClose} className={styles.modal_button}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default function Subscription(userSession) {
    const router = useRouter();
    const [ShowModalExist, setShowModalExist] = useState(false);
    const [ShowModalSuccess, setShowModalSuccess] = useState(false);
    const [subscriptionPrice, setSubscriptionPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid,setIsValid] = useState(false);


    const checkExisting = async () => {
      const res = await fetch(`/api/handle_subscription?email=${encodeURIComponent(userSession.userSession)}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      const result = await res.json();
      console.log(result);
      if (result.success === true){ 
        return {payload : result.payload , condition:true};
      }
      else {
        return {condition:false};
      }
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target;
        const formData = new FormData(form);


        const existed = await checkExisting();
        
        if (existed.condition === true){
            // const formJson = {
            //   mealType: existed.payload.mealType,
            //   deliveryDays: existed.payload.deliveryDays,
            //   email: userSession.userSession,
            // };
          setShowModalExist(true);
          const form = document.querySelector('form');

          if (form) {
            for (let [key, value] of Object.entries(existed.payload)) {
              if (key === 'mealType' || key === 'deliveryDays') {
                const values = Array.isArray(value) ? value : [value];
                values.forEach(v => {
                  const checkbox = form.querySelector(`input[name="${key}"][value="${v}"]`);
                  if (checkbox) checkbox.checked = true;
                });
              } else {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) input.value = value;
              }
            }
          }

          setIsLoading(false)
        } else {
          // Validation
          const mealTypes = formData.getAll('mealType');
          if (mealTypes.length === 0) {
              alert('Please select at least one meal type.');
              setIsLoading(false);
              return;
          }

          const deliveryDays = formData.getAll('deliveryDays');
          if (deliveryDays.length === 0) {
              alert('Please select at least one delivery day.');
              setIsLoading(false);
              return;
          }

          // Convert to JSON
          const formJson = {
              mealType: mealTypes,
              deliveryDays: deliveryDays,
              email: userSession.userSession,
          };
          
          for (let [key, value] of formData.entries()) {
              if (key !== 'mealType' && key !== 'deliveryDays') {
                  formJson[key] = value;
              }
          }

          try {
              const res = await fetch('/api/handle_subscription', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formJson),
              });

              const result = await res.json();
              console.log(result);

              if (res.ok) {
                  setSubscriptionPrice(result.price);
                  setShowModalSuccess(true);
                  form.reset(); // Clear the form
              } else {
                  alert(`Error: ${result.error || 'Something went wrong.'}`);
              }
          } catch (error) {
              console.error('Submission error:', error);
              alert('An unexpected error occurred.');
          } finally {
              setIsLoading(false);
          }
        }
        

    };

  
  return (
    <div className={styles.subscription_container}>
      {/* Navigation Header */}
      
      <DynamicDiv currPage="subscription"/>

      {/* Main Subscription Content */}
      <main className={styles.main_content}>
        <div className={styles.subscription_wrapper}>
          {/* Left Side - Welcome Message */}
          <div className={styles.welcome_section}>
            <div className={styles.welcome_content}>
              <h1 className={styles.welcome_title}>Create Your Meal Plan</h1>
              <p className={styles.welcome_subtitle}>
                Customize your perfect meal subscription with fresh, healthy ingredients delivered to your door.
              </p>
              <div className={styles.feature_highlights}>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🥗</span>
                  <span>Diet Plan - Rp30,000/meal</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>🥩</span>
                  <span>Protein Plan - Rp40,000/meal</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>👑</span>
                  <span>Royal Plan - Rp60,000/meal</span>
                </div>
                <div className={styles.feature_item}>
                  <span className={styles.feature_icon}>📅</span>
                  <span>Flexible Delivery Schedule</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Subscription Form */}
          <div className={styles.form_section}>
            <div className={styles.form_container}>
              <div className={styles.form_header}>
                <div className={styles.form_icon}>🍽️</div>
                <h2 className={styles.form_title}>Subscription Details</h2>
                <p className={styles.form_subtitle}>Fill in your preferences to get started</p>
              </div>

              <form className={styles.subscription_form} onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="fullName" className={styles.form_label}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={styles.form_input}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="phone" className={styles.form_label}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.form_input}
                    placeholder="e.g., 08123456789"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="plan" className={styles.form_label}>
                    Plan Selection *
                  </label>
                  <select name="plan" className={styles.form_select} required>
                    <option value="">Select a plan</option>
                    <option value="diet">Diet Plan – Rp30,000/meal</option>
                    <option value="protein">Protein Plan – Rp40,000/meal</option>
                    <option value="royal">Royal Plan – Rp60,000/meal</option>
                  </select>
                </div>

                <div className={styles.form_group}>
                  <label className={styles.form_label}>
                    Meal Type *
                  </label>
                  <div className={styles.checkbox_grid}>
                    <label className={styles.checkbox_item}>
                      <input type="checkbox" name="mealType" value="breakfast" />
                      <span className={styles.checkbox_text}>🌅 Breakfast</span>
                    </label>
                    <label className={styles.checkbox_item}>
                      <input type="checkbox" name="mealType" value="lunch" />
                      <span className={styles.checkbox_text}>☀️ Lunch</span>
                    </label>
                    <label className={styles.checkbox_item}>
                      <input type="checkbox" name="mealType" value="dinner" />
                      <span className={styles.checkbox_text}>🌙 Dinner</span>
                    </label>
                  </div>
                  <small className={styles.form_note}>At least one must be selected</small>
                </div>

                <div className={styles.form_group}>
                  <label className={styles.form_label}>
                    Delivery Days *
                  </label>
                  <div className={styles.checkbox_grid}>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                      <label key={day} className={styles.checkbox_item}>
                        <input type="checkbox" name="deliveryDays" value={day} />
                        <span className={styles.checkbox_text}>{day}</span>
                      </label>
                    ))}
                  </div>
                  <small className={styles.form_note}>At least one must be selected</small>
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="allergies" className={styles.form_label}>
                    Allergies / Dietary Restrictions
                  </label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    className={styles.form_textarea}
                    placeholder="List any allergies or special requests..."
                    rows="4"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={styles.submit_btn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Create Subscription'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ModalSuccess 
        isOpen={ShowModalSuccess} 
        onClose={() => setShowModalSuccess(false)} 
        price={subscriptionPrice}
      />

      <ModalExist 
        isOpen={ShowModalExist} 
        onClose={() => setShowModalExist(false)} 
      />
    </div>
  );
}