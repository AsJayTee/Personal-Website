import { useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TitleHeader = ({ title, sub }) => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    // Set initial state
    gsap.set([badgeRef.current, titleRef.current], {
      opacity: 0,
      y: 30
    });

    // Create timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none"
      }
    });

    // Add animations to timeline
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3"); // Start 0.3 seconds before the previous animation ends

  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-5">
      <div ref={badgeRef} className="hero-badge">
        <p>{sub}</p>
      </div>
      <div ref={titleRef}>
        <h1 className="font-semibold md:text-5xl text-3xl text-center">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;