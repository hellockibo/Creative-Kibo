import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick, 
  href,
  ...props 
}) {
  const { setCursorState } = useCursorStore();

  const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden rounded-full transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-kibo-orange text-white hover:bg-opacity-90",
    secondary: "bg-kibo-blue text-white hover:bg-opacity-90",
    outline: "border-2 border-kibo-blue text-kibo-blue hover:bg-kibo-blue hover:text-white",
    ghost: "text-kibo-blue hover:bg-kibo-cream"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = twMerge(clsx(baseStyles, variants[variant], sizes[size], className));

  const handleMouseEnter = () => setCursorState('hover');
  const handleMouseLeave = () => setCursorState('default');

  const Wrapper = motion[href ? 'a' : 'button'];
  const wrapperProps = href ? { href, ...props } : { onClick, ...props };

  return (
    <Wrapper
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...wrapperProps}
    >
      {children}
    </Wrapper>
  );
}
