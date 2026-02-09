import { useState, useEffect } from 'react';
import './HeroBackground.css';

// Import frames
import frame3 from '../assets/refrence/hero_frame_3.png';
import frame4 from '../assets/refrence/hero_frame_4.png';
import frame5 from '../assets/refrence/hero_frame_5.png';
import frame6 from '../assets/refrence/hero_frame_6.png';
import frame7 from '../assets/refrence/hero_frame_7.png';
import frame8 from '../assets/refrence/hero_frame_8.png';

const frames = [frame3, frame4, frame5, frame6, frame7, frame8];

const HeroBackground = () => {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        // Slower frame transitions for smoother animation feel
        // 5 seconds per frame with 4 second crossfade = seamless blending
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % frames.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-background">
            {frames.map((src, index) => (
                <div
                    key={index}
                    className={`hero-frame ${index === currentFrame ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${src})` }}
                />
            ))}
            <div className="hero-overlay" /> {/* Gradient overlay for text readability */}
        </div>
    );
};

export default HeroBackground;
