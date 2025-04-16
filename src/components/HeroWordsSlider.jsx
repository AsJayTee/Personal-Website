import { words } from "../constants/heroWords"

const HeroWordsSlider = () => {
  return(
    <span className="slide">
      <span className="wrapper">
        {words.map((word, index) => (
          <span
            key={index}
            className="flex items-center md:gap-3 gap-1 pb-2"
          >
            <div className="xl:w-12 xl:h-12 md:w-7 md:h-10 w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <img
                src={word.imgPath}
                alt="person"
                className="icon-container object-contain max-w-[60%] max-h-[60%]"
              />
            </div>
            <span>{word.text}</span>
          </span>
        ))}
      </span>
    </span>
  )
}

export default HeroWordsSlider;
