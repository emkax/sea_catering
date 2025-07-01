"use client"

import DynamicDiv from '../navbar.tsx'
import React, { useState, useEffect } from 'react';
import styles from './menu.module.css';
import '../globals.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from './modal.tsx';

export default function Menu() {
    const [activeSection, setActiveSection] = useState('menu');
    const [currentPage, setCurrentPage] = useState('menu');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curr, setCurr] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const router = useRouter();

    const handlePageNavigation = (page) => {
        setCurrentPage(page);
        router.push(`/${page}`);
        console.log(`Navigate to ${page} page`);
    };

    // fetch database
    const [sampleMealPlan, setSampleMealPlan] = useState(null);

    useEffect(() => {
        fetch('/api/menu')
        .then((res) => res.json())
        .then((json) => {
            setSampleMealPlan(json['payload']);
        });
    }, []);

    if (!sampleMealPlan || !sampleMealPlan) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    console.log(sampleMealPlan);

    return (
        <div className={styles.menuWrapper}>
            <DynamicDiv currPage="menu"/>
            
            {/* Background with animated particles */}
            <div className={styles.backgroundParticles}>
                {[...Array(50)].map((_, i) => (
                    <div key={i} className={styles.particle} style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${10 + Math.random() * 20}s`
                    }}></div>
                ))}
            </div>

            {/* Menu section */}
            <div className={styles.menu}>
                <div className={styles.heading}> 
                    <div className={styles.headingGlass}>
                        <h3 className={styles.menu_text}>✨ Our Menu ✨</h3>
                        <p className={styles.menu_subtitle}>Discover culinary excellence</p>
                    </div>
                </div>
                
                <div className={styles.menuGrid}>
                    {sampleMealPlan.map((menu, index) => (
                        <div 
                            className={`${styles.food_items} ${hoveredItem === index ? styles.hovered : ''}`} 
                            key={index}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className={styles.cardGlow}></div>
                            
                            <a 
                                className={styles.wrap_anchor} 
                                href='#' 
                                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setCurr(index) }}
                            >
                                <div className={styles.imageContainer}>
                                    <Image 
                                        src="/assets/menu/royal_plan.jpg" 
                                        alt="img" 
                                        width={300} 
                                        height={300} 
                                        className={styles.image_menu}
                                    />
                                    <div className={styles.imageOverlay}>
                                        <span className={styles.viewDetails}>View Details</span>
                                    </div>
                                </div>
                            </a>
                            
                            <div className={styles.details}>
                                <div className={styles.details_sub}>
                                    <h5 className={styles.menu_title}>{menu.name}</h5>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.currency}>Rp</span>
                                        <span className={styles.price}>{menu.price.toLocaleString('de-DE')}</span>
                                    </div>
                                </div>
                                
                                <p className={styles.description}>
                                    {menu.description.substring(0, 80)}...{' '}
                                    <a 
                                        href='#' 
                                        className={styles.seeMore}
                                        onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setCurr(index)}}
                                    >
                                        see more
                                    </a>
                                </p>
                                
                                <button 
                                    className={styles.add_to_cart_button}
                                    onClick={() => console.log('Added to cart:', menu.name)}
                                >
                                    <span className={styles.buttonIcon}>🛒</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Modal with meal plan details */}
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    mealPlan={sampleMealPlan[curr]}
                />
            </div>
        </div>
    );
}