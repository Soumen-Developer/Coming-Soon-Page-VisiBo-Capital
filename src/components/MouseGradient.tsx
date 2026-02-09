import { useEffect, useRef } from 'react';
import './MouseGradient.css';

const MouseGradient = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const x = e.clientX;
                const y = e.clientY;

                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(() => {
                    if (containerRef.current) {
                        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
                        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
                    }
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="mouse-gradient-container" />
    );
};

export default MouseGradient;
