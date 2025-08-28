'use client'

import React, { useState } from 'react';
import { User, Settings, Heart, ShoppingBag, MapPin, Phone, Mail, Edit3, Save, X, Bell, CreditCard, Shield, LogOut } from 'lucide-react';

import styles from './profile.module.css';
import {useRouter} from 'next/navigation'

export default function UserProfileDashboard() {

    const router = useRouter();
    const handleBackHome = () => {
        router.push('/')
    }
    const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Ocean View Drive, California, CA 90210',
    bio: 'Food lover and health enthusiast. Always looking for fresh, quality meals delivered with care.',
    joinDate: 'March 2024',
    totalOrders: 47,
    favoriteItems: 12
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      setTempData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const renderTabContent = () => {

    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Profile Information</h2>
              {!isEditing ? (
                <button onClick={handleEditToggle} className={styles.editBtn}>
                  <Edit3 size={20} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button onClick={handleSave} className={styles.saveBtn}>
                    <Save size={20} />
                    Save
                  </button>
                  <button onClick={handleEditToggle} className={styles.cancelBtn}>
                    <X size={20} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  value={isEditing ? tempData.firstName : profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  value={isEditing ? tempData.lastName : profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={isEditing ? tempData.email : profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  value={isEditing ? tempData.phone : profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.formGroup} md:col-span-2`}>
                <label className={styles.label}>Address</label>
                <input
                  type="text"
                  value={isEditing ? tempData.address : profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.formGroup} md:col-span-2`}>
                <label className={styles.label}>Bio</label>
                <textarea
                  rows="4"
                  value={isEditing ? tempData.bio : profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Order History</h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Order #{2024000 + order}</h3>
                      <p className="text-gray-600">Delivered on March {15 + order}, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Delivered
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <p className="font-medium">Grilled Salmon Bowl, Fresh Salad</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>
                      <p className="font-medium">${(29.99 + order * 5).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span>
                      <p className="font-medium">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Favorite Items</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Grilled Salmon Bowl', 'Mediterranean Wrap', 'Quinoa Power Salad'].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-32 rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                    🍽️
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Fresh, healthy, and delicious meal prepared with premium ingredients.</p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:-translate-y-0.5 transition-all duration-300">
                    Order Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Account Settings</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Bell size={20} />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
                    <span>Email notifications for order updates</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
                    <span>SMS notifications for delivery</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                    <span>Marketing emails and promotions</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment Methods
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <span>•••• •••• •••• 1234</span>
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </div>
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                    + Add Payment Method
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Shield size={20} />
                  Security
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-400 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-400 transition-colors">
                    Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          👨🏻‍🍳 Sea Catering
        </div>
        <button className={styles.backBtn} onClick={handleBackHome}>
          ← Back to Home
        </button>
      </nav>

      {/* Main Dashboard Content */}
      <main className={styles.mainContent}>
        <div className={styles.dashboardWrapper}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.profileSection}>
                <div className={styles.avatar}>
                  👨🏻
                </div>
                <h3 className={styles.userName}>{profileData.firstName} {profileData.lastName}</h3>
                <p className={styles.userEmail}>{profileData.email}</p>
              </div>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{profileData.totalOrders}</span>
                  <span className={styles.statLabel}>Total Orders</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{profileData.favoriteItems}</span>
                  <span className={styles.statLabel}>Favorites</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{profileData.joinDate}</span>
                  <span className={styles.statLabel}>Member Since</span>
                </div>
              </div>

              <nav className={styles.navMenu}>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${styles.navItem} ${activeTab === 'profile' ? styles.activeNavItem : ''}`}
                >
                  <User size={20} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`${styles.navItem} ${activeTab === 'orders' ? styles.activeNavItem : ''}`}
                >
                  <ShoppingBag size={20} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`${styles.navItem} ${activeTab === 'favorites' ? styles.activeNavItem : ''}`}
                >
                  <Heart size={20} />
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`${styles.navItem} ${activeTab === 'settings' ? styles.activeNavItem : ''}`}
                >
                  <Settings size={20} />
                  Settings
                </button>
                <button className={`${styles.navItem} mt-8 text-red-200 hover:bg-red-500/20`}>
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className={styles.contentArea}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}