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
              force3D: true,  // GPU ACCELERATION OPTIMIZATION
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
                        delay: 0.3 * (otherIndex + 2), // Staggered delay
                        force3D: true  // GPU ACCELERATION OPTIMIZATION
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
            force3D: true,  // GPU ACCELERATION OPTIMIZATION
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
      { 
        opacity : 1, 
        duration : 1.5,
        force3D: true  // GPU ACCELERATION OPTIMIZATION
      }
    );
  }, []);

  return (
    <div id="projects" className="mt-0 max-md:-mt-25">
      <TitleHeader title={"My Projects"} sub={"Things I Built 🔧"} />
      <section className="app-showcase" ref={sectionRef}>
        <div className="w-full">
          <div className="showcaselayout">
            {/* LEFT - Main Project (MedQA - Research, no label) */}
            <div className="first-project-wrapper" ref={project1Ref}>
              <div 
                className="image-wrapper cursor-pointer"
                onClick={() => handleProjectClick(projects[0])}
              >
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                />
              </div>
              <div className="text-content">
                <h2>
                  {projects[0].title}
                </h2>
                <p className="text-white-50 md:text-xl">
                  A research project analyzing reward model overconfidence in medical AI systems, 
                  focusing on uncertainty quantification for safer clinical decision-making.
                  {projects[0].githubUrl && (
                    <>
                      {" "}Check it out: {" "}
                      <a href={projects[0].githubUrl} className="underline decoration-[1px] hover:text-white">
                        GitHub Repo
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
            
            {/* RIGHT - Professional Collaboration Projects */}
            <div className="project-list-wrapper">
              {/* Project 2 - Psychology Blossom Chatbot */}
              <div className="project" ref={project2Ref}>
                <div 
                  className="image-wrapper bg-[#c1fbff] cursor-pointer"
                  onClick={() => handleProjectClick(projects[1])}
                >
                  <FancyLabel text="Professional Collaboration" position="top-right" />
                  <img 
                    src={projects[1].image} 
                    alt={projects[1].title}
                  />
                </div>
                <h2>
                  {projects[1].title}
                </h2>
              </div>
              
              {/* Project 3 - Portfolio Website */}
              <div className="project" ref={project3Ref}>
                <div 
                  className="image-wrapper bg-[#000000] cursor-pointer"
                  onClick={() => handleProjectClick(projects[2])}
                >
                  <FancyLabel text="Professional Collaboration" position="top-right" />
                  <img 
                    src={projects[2].image} 
                    alt={projects[2].title}
                  />
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