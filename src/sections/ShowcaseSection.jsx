import React, { useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from "../components/TitleHeader";
import FancyLabel from "../components/FancyLabel";
import ProjectModal from "../components/ProjectModal";
import { projects } from "../constants/projects";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Modal handlers
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

useGSAP(() => {
    const projectElements = [project1Ref.current, project2Ref.current, project3Ref.current];
    const isDesktop = window.innerWidth >= 1024; // xl breakpoint
    
    if (isDesktop) {
      // Set initial state for projects 2 and 3 to prevent flash
      gsap.set([projectElements[1], projectElements[2]], {
        y: 50,
        opacity: 0
      });
      // Desktop: All projects animate consecutively after first project triggers
      projectElements.forEach((card, index) => {
        if (index === 0) {
          // First project with scroll trigger
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
              delay: 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                once: true, // Only trigger once
                onEnter: () => {
                  // Trigger animations for other projects
                  projectElements.slice(1).forEach((otherCard, otherIndex) => {
                    gsap.fromTo(
                      otherCard,
                      {
                        y: 50, 
                        opacity: 0
                      },
                      {
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        delay: 0.3 * (otherIndex + 2) // Staggered delay
                      }
                    );
                  });
                }
              }
            }
          );
        }
        // Other projects are animated via the onEnter callback above
      });
    } else {
      // Mobile: Keep existing behavior with individual scroll triggers
      projectElements.forEach((card, index) => {
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
              start: "top bottom-=30",
              once: true // Only trigger once
            }
          }
        );
      });
    }
    
    gsap.fromTo(
      sectionRef.current, 
      { opacity : 0 }, 
      { opacity : 1, duration : 1.5 }
    );
  }, []);

  return (
    <div className="mt-0 max-md:-mt-25">
      <TitleHeader title={"My Projects"} sub={"Things I Built 🔧"} />
      <section id="projects" className="app-showcase" ref={sectionRef}>
        <div className="w-full">
          <div className="showcaselayout">
            {/* LEFT */}
            <div className="first-project-wrapper" ref={project1Ref}>
              <div 
                className="image-wrapper cursor-pointer group"
                onClick={() => handleProjectClick(projects[0])}
              >
                <FancyLabel text="Professional Collaboration" position="top-right" />
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                />
                {/* Click indicator overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-black/40 rounded-full p-3">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-content">
                <h2>
                  {projects[0].title}
                </h2>
                <p className="text-white-50 md:text-xl">
                  A full-stack project powered by JavaScript, Python, and Google Cloud, 
                  designed for fast and seamless user engagement.
                  {projects[0].liveUrl && (
                    <>
                      {" "}Check it out here: {" "}
                      <a href={projects[0].liveUrl} className="underline decoration-[1px] hover:text-white">
                        Live Chatbot
                      </a>
                    </>
                  )}
                  {projects[0].githubUrl && (
                    <>
                      {" "} | {" "}
                      <a href={projects[0].githubUrl} className="underline decoration-[1px] hover:text-white">
                        GitHub Repo
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="project-list-wrapper">
              <div className="project" ref={project2Ref}>
                <div 
                  className="image-wrapper bg-[#dbffdc] cursor-pointer group"
                  onClick={() => handleProjectClick(projects[1])}
                >
                  <img 
                    src={projects[1].image} 
                    alt={projects[1].title}
                  />
                  {/* Click indicator overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/40 rounded-full p-2">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2>
                  {projects[1].title}
                </h2>
              </div>
              <div className="project" ref={project3Ref}>
                <div 
                  className="image-wrapper bg-[#e7e7ff] cursor-pointer group"
                  onClick={() => handleProjectClick(projects[2])}
                >
                  <img 
                    src={projects[2].image} 
                    alt={projects[2].title}
                  />
                  {/* Click indicator overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/40 rounded-full p-2">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2>
                  {projects[2].title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  )
}

export default ShowcaseSection