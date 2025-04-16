import HeroWordsSlider from "../components/HeroWordsSlider";

const Hero = () => {
  return(
    <>
      <section className="hero-layout">
        <div className="hero-text">
          <h1>Building Solutions</h1>
          <h1>
            with
            <HeroWordsSlider />
          </h1>
          <h1>and a Love for Learning</h1>
        </div>
      </section>
    </>
  )
}

export default Hero;