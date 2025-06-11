'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimator = ({ children, from, to }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const fromState = from || { opacity: 0, y: 50 };
        const toState = to || { opacity: 1, y: 0 };

        const ctx = gsap.context(() => {
            gsap.fromTo(el, fromState, {
                ...toState,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse',
                }
            });
        }, ref);

        return () => ctx.revert();
    }, [from, to]);

    return (
        <div ref={ref} className="opacity-0">
            {children}
        </div>
    );
};

export default ScrollAnimator;