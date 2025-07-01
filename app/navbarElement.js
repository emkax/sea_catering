//navbarElement
'use client'

import { UserCircle } from 'lucide-react';
import styles from './navbar.module.css'
import './globals.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

// Make sure to use default export
export default function Navbar({session, currPage}){
    const router = useRouter()
    
    const [activeSection, setActiveSection] = useState(currPage);
    const [currentPage, setCurrentPage] = useState(currPage);      
    
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'DELETE' });
        router.push('/login');
    };

    // ✅ Handle protected route navigation
    const handleProtectedNavigation = (page) => {
        if (page === 'subscription' && !session) {
            router.push('/login');
            return;
        }
        handlePageNavigation(page);
    };
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'testimonials', 'contact'];
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = sectionId === 'hero' ? 0 : element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const handlePageNavigation = (page) => {
        setCurrentPage(page);
        
        const normalizedPage = page === '/' ? 'home' : page;
        
        if (normalizedPage === 'home' && currPage === 'home' && session) {
            scrollToSection('hero');
        } else {
            router.push(page === 'home' ? '/' : `/${page}`);
            console.log(`Navigate to ${page} page`);
        }
    };

    const handleBackToHome = () => {
        router.push('/');
    }

    const handleAuthAction = () => {
        if (session) {
            router.push('/profile');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.nav_menu}>
            <nav className={styles.navbar}>
                <div className={styles.nav_logo} onClick={handleBackToHome}>
                    <h2 className={styles.logo_text}>👨🏻‍🍳 Sea Catering</h2>
                </div>
                <ul className={styles.ul_style}>
                    <li className={currPage === 'home' ? styles.active_page : styles.nav_item}>
                        <button className={styles.nav_link} onClick={() => handlePageNavigation('/')}>
                            Home
                        </button>
                    </li>
                    <li className={currPage === 'menu' ? styles.active_page : styles.nav_item}>
                        <button className={styles.nav_link} onClick={() => handlePageNavigation('menu')}>
                            Menu
                        </button>
                    </li>
                    
                    {/* ✅ Show different content based on authentication */}
                    {session ? (
                        // ✅ Authenticated user - show subscription link
                        <li className={currPage === 'subscription' ? styles.active_page : styles.nav_item}>
                            <button className={styles.nav_link} onClick={() => handlePageNavigation('subscription')}>
                                My Subscription
                            </button>
                        </li>
                    ) : (
                        // ✅ Non-authenticated user - show pricing link that redirects to login
                        <li className={styles.nav_item}>
                            <button className={styles.nav_link} onClick={() => handleProtectedNavigation('subscription')}>
                                Pricing
                            </button>
                        </li>
                    )}
                    
                    <li className={currPage === 'contact' ? styles.active_page : styles.nav_item}>
                        <button className={styles.nav_link} onClick={() => { 
                            setCurrentPage('contact'); 
                            handlePageNavigation('contact'); 
                        }}>
                            Contact Us
                        </button>
                    </li>
                    
                    {/* ✅ Authentication section - different for each state */}
                    <li className={styles.nav_item}>
                        {session ? (
                            // ✅ Authenticated - show profile + logout
                            <div className={styles.auth_section}>
                                <button className={styles.profile_button} onClick={handleAuthAction}>
                                    <UserCircle size={28} className={styles.profile_icon} />
                                </button>
                                <button className={styles.logout_button} onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            // ✅ Not authenticated - show sign in/up
                            <button className={styles.auth_button} onClick={handleAuthAction}>
                                Sign In / Sign Up
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}