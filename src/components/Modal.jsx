import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  className = '',
  backdropBlur = true,
  exitAnimation = 'default'
}) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Size variants
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    fullscreen: 'max-w-[95vw] max-h-[95vh]'
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isAnimating) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, isAnimating]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current && !isAnimating) {
      handleClose();
    }
  };

  // Handle close with animation
  const handleClose = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Run exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        setShouldShow(false);
        setIsAnimating(false);
        onClose();
      }
    });

    // Close button exit
    if (closeButtonRef.current) {
      tl.to(closeButtonRef.current, {
        rotation: 90,
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });
    }

    // Enhanced content exit based on animation type
    if (exitAnimation === 'enhanced') {
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.7,
        y: -50,
        rotationX: 15,
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.1")
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2");
    } else {
      // Default exit animation
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.25,
        ease: "power2.in"
      }, "-=0.1")
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");
    }
  };

  // Entrance animation
  useGSAP(() => {
    if (!modalRef.current) return;

    if (isOpen && !shouldShow) {
      setShouldShow(true);
      
      // Set initial state
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        y: 50,
        rotationX: -15
      });

      // Entrance animation
      const tl = gsap.timeline();
      
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "back.out(1.4)"
      }, "-=0.1");

      // Close button animation
      if (closeButtonRef.current) {
        gsap.fromTo(closeButtonRef.current, 
          { rotation: -90, opacity: 0, scale: 0.8 },
          { 
            rotation: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.4, 
            delay: 0.3,
            ease: "back.out(1.7)" 
          }
        );
      }
    }
  }, [isOpen]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen && shouldShow) {
      setShouldShow(false);
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!shouldShow && !isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] items-center justify-center p-4"
      style={{ display: shouldShow ? 'flex' : 'none' }}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={`absolute inset-0 bg-black/80 ${backdropBlur ? 'backdrop-blur-md' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`
          relative w-full ${sizeClasses[size]} 
          max-h-[90vh] overflow-hidden
          bg-[#1a1a1a] border border-[#333333] 
          rounded-xl shadow-2xl
          ${className}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-[#333333]">
            {title && (
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="ml-auto p-2 hover:bg-[#333333] rounded-lg transition-colors duration-200 group"
                aria-label="Close modal"
                disabled={isAnimating}
              >
                <svg
                  className="w-6 h-6 text-[#d9ecff] group-hover:text-white transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;