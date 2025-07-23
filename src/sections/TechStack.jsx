import React from 'react'
import TitleHeader from '../components/TitleHeader'
import SkillCards from '../components/SkillCards'

const TechStack = () => {
  return(
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title={"Technical Skills"}
          sub={"Things I Use 🛠️"}
        />
        
        {/* Skills Cards - Now using tech stack inspired design */}
        <SkillCards />
      </div>
    </div>
  )
}

export default TechStack