import Navbar from "../sections/Navbar"
import Hero from "../sections/Hero"
import ShowcaseSection from "../sections/ShowcaseSection"
import FeatureCards from "../sections/FeatureCards"
import ExperienceSection from "../sections/ExperienceSection"
import TechStack from "../sections/TechStack"
import Testimonials from "../sections/Testimonials"
import Contact from "../sections/Contact"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      <Testimonials />
      <Contact />
    </>
  )
}

export default HomePage