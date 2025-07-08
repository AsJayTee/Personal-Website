import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from "../components/TitleHeader";
import FancyLabel from "../components/FancyLabel";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50, 
          opacity: 0
        },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100"
          }
        }
      )
    }
    )
    gsap.fromTo(
      sectionRef.current, 
      { opacity : 0 }, 
      { opacity : 1, duration : 1.5 }
    )
  }, []);

  return (
    <div className="mt-0 max-md:-mt-25">
      <TitleHeader title={"My Projects"} sub={"Things I Build 🔧"} />
      <section id="projects" className="app-showcase" ref={sectionRef}>
        <div className="w-full">
          <div className="showcaselayout">
            {/* LEFT */}
            <div className="first-project-wrapper" ref={project1Ref}>
              <div className="image-wrapper">
                <FancyLabel text="Professional Collaboration" position="top-right" />
                <img src="images\showcase\pb_chatbot.png" alt="Psychology Blossom Chatbot" />
              </div>
              <div className="text-content">
                <h2>
                  Business Enquiries Made Simple with a Reliable, Robust, and Responsive Chatbot
                </h2>
                <p className="text-white-50 md:text-xl">
                  A full-stack project powered by JavaScript, Python, and Google Cloud, 
                  designed for fast and seamless user engagement.
                  Check it out here: {" "}
                  <a href="https://psychologyblossom.com/" className="underline decoration-[1px] hover:text-white">
                    Live Chatbot
                  </a> 
                  {" "} | {" "}
                  <a href="https://github.com/AsJayTee/PB-Chatbot" className="underline decoration-[1px] hover:text-white">
                    GitHub Repo
                  </a>
                </p>
              </div>
            </div>
            {/* RIGHT */}
            <div className="project-list-wrapper overflow-hidden">
              <div className="project" ref={project2Ref}>
                <div className="image-wrapper bg-[#dbffdc]">
                  <img src="images\showcase\3d_ai_avatar.png" alt="3D Avatar Waving" />
                </div>
                <h2>
                  Interactive 3D AI Avatars
                </h2>
              </div>
              <div className="project" ref={project3Ref}>
                <div className="image-wrapper bg-[#e7e7ff]">
                  <img src="images\showcase\fraud_analysis.png" alt="ROC Curve" />
                </div>
                <h2>
                  Fraud in Electricity and Gas Consumption
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ShowcaseSection