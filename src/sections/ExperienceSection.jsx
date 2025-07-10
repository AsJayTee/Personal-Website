import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { experiences } from '../constants/experiences'

const ExperienceSection = () => {
  return(
    <section id="experience" className="w-full md:mt-10 mt-10 px-5 md:px-20 py-10 md:py-20">
      <div className="w-full overflow-hidden">
        <TitleHeader
          title={"Professional Work Experience"}
          sub={"Things I did 💼"}
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            { experiences.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper text-white"> 
                {card.title}
              </div>
            )) }
          </div>
        </div>
      </div>
    </section>
  )
}
export default ExperienceSection