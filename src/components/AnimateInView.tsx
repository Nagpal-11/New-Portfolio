import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface AnimateInViewProps {
  key?: React.Key;
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header';
  style?: React.CSSProperties;
}

export default function AnimateInView({
  children,
  direction = 'up',
  distance = 36,
  duration = 750,
  delay = 0,
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  className = '',
  id,
  as: Component = 'div',
  style = {},
}: AnimateInViewProps) {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Calculate transform offset based on chosen direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const animatedStyle: React.CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate3d(0, 0, 0)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Luxury architectural cubic-bezier
    transitionDelay: `${delay}ms`,
    willChange: isInView ? 'auto' : 'opacity, transform',
    ...style,
  };

  return (
    <Component
      ref={ref as any}
      id={id}
      className={className}
      style={animatedStyle}
    >
      {children}
    </Component>
  );
}
