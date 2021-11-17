import React, { useState, useEffect } from 'react';
import { scrollToTop } from '@utils/scrollToTop';

import styles from './ScrollToTopButton.module.scss';

type ButtonProps = {
    visibilityPoint: Number;
};

const ScrollToTopButton: React.FC<ButtonProps> = ({ visibilityPoint }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > visibilityPoint);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [visibilityPoint]);

    return isVisible ? (
        <div className={styles['scroll-to-top-button-component']}>
            <button className={`${styles['scroll-to-top-button']}`} onClick={scrollToTop}>
                <span className={styles['scroll-to-top-button-content']}>&#8593;</span>
            </button>
        </div>
    ) : null;
};

export default ScrollToTopButton;
