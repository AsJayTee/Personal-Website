import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';
import GlowCard from '../components/GlowCard';
import { testimonials } from '../constants/testimonials';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Animation setup
  useGSAP(() => {
    // Animate testimonial cards with stagger effect
    gsap.fromTo(
      cardsRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me"
          sub="Things They Said ⭐️"
        />
        
        {/* Testimonials Grid - Masonry Layout */}
        <div className="testimonials-container mt-16">
          <div className="testimonials-grid lg:columns-3 md:columns-2 columns-1 gap-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="testimonial-card-wrapper break-inside-avoid mb-6"
              >
                <GlowCard index={index}>
                  <div className="testimonial-content space-y-4">
                    {/* Quote Icon */}
                    <div className="quote-icon">
                      <svg 
                        className="w-5 h-5 text-[#43ccf7] opacity-60" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>

                    {/* Review Text */}
                    <div className="review-text">
                      <p className="text-[#d9ecff] leading-relaxed text-sm md:text-base">
                        {testimonial.review}
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="client-info flex items-center gap-3 pt-4 border-t border-[#333333]">
                      <div className="client-avatar">
                        <img 
                          src={testimonial.imgPath} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#43ccf7]/30"
                        />
                      </div>
                      <div className="client-details">
                        <p className="font-bold text-white text-sm md:text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-[#d9ecff] text-xs md:text-sm opacity-80">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;