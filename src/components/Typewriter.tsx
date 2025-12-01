import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, className = '', delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (hasStarted && index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeoutId);
        }
    }, [index, text, speed, hasStarted]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse ml-1 inline-block bg-current w-[2px] h-[1em] align-middle"></span>
        </span>
    );
};

export default Typewriter;
