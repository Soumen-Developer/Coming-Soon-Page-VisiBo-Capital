import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './ComingSoonContent.css';
import StockTicker from './StockTicker';
import JoinWaitlistForm from './form';

// Animated counter component
interface CountUpProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
    delay?: number;
}

const CountUp = ({ end, suffix = '', prefix = '', duration = 2, decimals = 0, delay = 0 }: CountUpProps) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        // Add delay before starting animation
        const delayTimer = setTimeout(() => {
            setHasStarted(true);
        }, delay * 1000);

        return () => clearTimeout(delayTimer);
    }, [isInView, delay]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, end, duration]);

    return (
        <span ref={ref} style={{
            display: 'inline-block',
            transition: 'transform 0.3s ease',
        }}>
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
        </span>
    );
};

// Rotating text component for animated word cycling
const rotatingWords = ['CLARITY', 'CONFIDENCE', 'CONTROL'];

const RotatingText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 3000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={rotatingWords[currentIndex]}
                className="rotating-word"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1] // Smooth cubic bezier
                }}
            >
                {rotatingWords[currentIndex]}
            </motion.span>
        </AnimatePresence>
    );
};

interface ComingSoonContentProps {
    onSplashComplete?: () => void;
}

const ComingSoonContent = ({ onSplashComplete }: ComingSoonContentProps) => {
    // Check if the CONTENT splash has been shown this session.
    // This is separate from the INTRO flag so the splash can play after the intro on first visit.
    const hasSeenContent = sessionStorage.getItem('visibo_content_shown');
    const [stage, setStage] = useState<'coming-soon' | 'content'>(hasSeenContent ? 'content' : 'coming-soon');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // If we are already in content mode (from session storage), ensure logo is moved
        if (stage === 'content') {
            // Use a small timeout to let App render first or ensure call happens
            // But immediate call is better for syncing state
            if (onSplashComplete) onSplashComplete();
            return;
        }

        // Otherwise, show "COMING SOON" for 8s then switch and mark as seen.
        const timer = setTimeout(() => {
            setStage('content');
            sessionStorage.setItem('visibo_content_shown', 'true');
            if (onSplashComplete) onSplashComplete();
        }, 8000);
        return () => clearTimeout(timer);
    }, [stage]); // Removed onSplashComplete from dependency to avoid loop, though it's stable usually.

    return (
        <div className="page-wrapper">
            <AnimatePresence mode="wait">
                {stage === 'coming-soon' ? (
                    <motion.div
                        key="coming-soon-splash"
                        className="coming-soon-simple"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.p
                            className="coming-soon-pretitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Something Amazing is Brewing
                        </motion.p>
                        <motion.h1
                            className="coming-soon-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            COMING SOON
                        </motion.h1>
                        <motion.p
                            className="coming-soon-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            Your gateway to smarter investments
                        </motion.p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="coming-soon-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="content-wrapper">
                                <motion.span
                                    className="pre-title"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Invest with
                                </motion.span>

                                <motion.h1
                                    className="coming-soon-title rotating-title"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <RotatingText />
                                </motion.h1>

                                <motion.p
                                    className="coming-soon-subtitle"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    Access actionable, data-backed investing insights to make<br />
                                    clear, confident investment decisions.
                                </motion.p>

                                <motion.div
                                    className="n-form"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="white-pill-button text-semibold"
                                    >
                                        Secure Your Spot
                                    </button>

                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="stats-footer"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="stat-item">
                                <h3 className="stat-number"><CountUp end={5} suffix="+" delay={0.5} duration={1.5} /></h3>
                                <p className="stat-label">Years of Experience</p>
                                {/* <span className="text-bold text-grey">*</span> */}
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number"><CountUp end={100} suffix="+" delay={0.7} duration={1.8} /></h3>
                                <p className="stat-label">Reports Published</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number"><CountUp end={20} suffix="+" delay={0.9} duration={1.5} /></h3>
                                <p className="stat-label">Portfolios Managed</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number"><CountUp end={2.5} suffix=" CR+" decimals={1} delay={1.1} duration={2} /></h3>
                                <p className="stat-label">Assets Under Management</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {stage === 'coming-soon' && <StockTicker />}
            <JoinWaitlistForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ComingSoonContent;
