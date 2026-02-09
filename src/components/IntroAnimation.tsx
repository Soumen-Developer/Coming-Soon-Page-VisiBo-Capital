import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import logo from '../assets/Group.png';
import './IntroAnimation.css';

interface IntroAnimationProps {
    onComplete: () => void;
    moveToHeader: boolean;
}

const IntroAnimation = ({ onComplete, moveToHeader }: IntroAnimationProps) => {
    // Check session flags ONCE on mount
    const hasSeenIntro = useRef(!!sessionStorage.getItem('visibo_intro_shown')).current;
    const hasSeenContent = useRef(!!sessionStorage.getItem('visibo_content_shown')).current;

    // Determine initial step
    const getInitialStep = () => {
        if (hasSeenContent) return 4; // Already seen everything -> header mode
        if (hasSeenIntro) return 3;   // Seen intro, at splash phase
        return 0;                      // Fresh start
    };

    const [step, setStep] = useState(getInitialStep);
    const hasCalledComplete = useRef(false);

    // Handle prop-driven move to header
    useEffect(() => {
        if (moveToHeader && step !== 4) {
            setStep(4);
            sessionStorage.setItem('visibo_intro_shown', 'true');
        }
    }, [moveToHeader, step]);

    // Run animation sequence ONLY if starting fresh (step 0)
    useEffect(() => {
        // If already past intro, notify parent immediately (once)
        if ((step === 3 || step === 4) && !hasCalledComplete.current) {
            hasCalledComplete.current = true;
            onComplete();
            return;
        }

        // Only run timers if we're in the intro sequence (step 0)
        if (step !== 0) return;

        const timer1 = setTimeout(() => setStep(1), 800);   // Fade in logo
        const timer2 = setTimeout(() => setStep(2), 2500);  // Slide text
        const timer3 = setTimeout(() => {
            setStep(3);
            sessionStorage.setItem('visibo_intro_shown', 'true');
            hasCalledComplete.current = true;
            onComplete();
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency - run once on mount only!

    // Logo goes to header position as soon as intro finishes (step 3+)
    const isHeaderMode = step >= 3;

    return (
        <motion.div
            className={`intro-container ${isHeaderMode ? 'header-mode' : ''}`}
            initial={false}
            animate={{
                backgroundColor: 'transparent',
            }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="logo-wrapper"
                layout
                animate={{
                    scale: isHeaderMode ? 0.6 : 1,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                <motion.img
                    src={logo}
                    alt="Visibo Capital Logo"
                    className="intro-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 1 }}
                />
                <motion.div
                    className="intro-text"
                    initial={{ width: 0, opacity: 0 }}
                    animate={step >= 2 ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <h1 className="brand-name text-white">VISIBO <span className="capital text-white">CAPITAL</span></h1>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default IntroAnimation;
