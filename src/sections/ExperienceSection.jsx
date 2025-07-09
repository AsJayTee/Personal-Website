import React from 'react'
import TitleHeader from '../components/TitleHeader'

const ExperienceSection = () => {
  return(
    <section id="experience" className="w-full md:mt-10 mt-10 section-padding xl:px-0">
      <div className="w-full overflow-hidden">
        <TitleHeader
          title={"Professional Work Experience"}
          sub={"Things I did 💼"}
        />
      </div>
    </section>
  )
}
export default ExperienceSection