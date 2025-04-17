import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroWordsSlider from "../components/HeroWordsSlider";
import HeroExperience from "../components/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return(
    <>
      <section className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>Building Solutions</h1>
              <h1>
                with
                <HeroWordsSlider />
              </h1>
              <h1>and a Love for Learning</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi! I'm Jin Thau. A Data Science & Computer Science Undergrad @ NUS
            </p>
          </div> 
        </header>

        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </section>
    </>
  )
}

export default Hero;