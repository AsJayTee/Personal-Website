import { Link } from "react-router-dom"
import { useState } from "react"
import TitleHeader from "../components/TitleHeader"
import { attributions } from "../constants/attributions"

const AttributionsPage = () => {
  // Helper function to render links
  const renderLink = (item) => {
    if (Array.isArray(item) && item.length === 2) {
      return (
        <a 
          href={item[1]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#43ccf7] hover:text-white transition-colors underline"
        >
          {item[0]}
        </a>
      );
    }
    return item;
  };

  // Separate component for icon items to handle state
  const IconItem = ({ item }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-[#2a2a2f] rounded-lg hover:bg-[#333333] transition-colors">
        {/* Icon preview */}
        {item.path && (
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1a] rounded-lg p-3 border border-[#444444] overflow-hidden">
              {!imageError ? (
                <img 
                  src={item.path} 
                  alt="Icon preview" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#666666]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Attribution details */}
        <div className="flex-1 space-y-2 flex flex-col justify-center">
          {item.link && (
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-medium text-sm text-[#43ccf7]">Source:</span>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#43ccf7] hover:text-white transition-colors underline text-sm"
              >
                View on Flaticon
              </a>
            </div>
          )}
          {item['created-by'] && (
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-medium text-sm text-[#43ccf7]">Created by:</span>
              <span className="text-sm">{renderLink(item['created-by'])}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#171720] py-20">
      {/* Back Button */}
      <div className="container mx-auto px-5 md:px-20 max-w-6xl mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#d9ecff] hover:text-white transition-colors group"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="container mx-auto px-5 md:px-20 max-w-6xl">
        <TitleHeader
          title="Attributions & Credits"
          sub="Thanks & Recognition 🙏"
        />
        
        <div className="mt-16 space-y-12">
          {attributions.map((category, categoryIndex) => {
            const categoryName = Object.keys(category)[0];
            const categoryItems = category[categoryName];
            
            return (
              <section key={categoryIndex} className="card-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-[#43ccf7] mb-6">{categoryName}</h2>
                <div className="space-y-6 text-[#d9ecff]">
                  {categoryItems.map((item, itemIndex) => {
                    const itemKey = Object.keys(item)[0];
                    const itemValue = item[itemKey];
                    
                    // Special handling for Icons category
                    if (categoryName === "Icons") {
                      // If itemValue is an array (like Hero Words Slider), render each icon
                      if (Array.isArray(itemValue)) {
                        return (
                          <div key={itemIndex} className="space-y-4">
                            <h3 className="font-semibold text-white text-lg mb-2">{itemKey}</h3>
                            <div className="space-y-2">
                              {itemValue.map((iconItem, iconIndex) => 
                                <IconItem key={iconIndex} item={iconItem} />
                              )}
                            </div>
                          </div>
                        );
                      }
                      // If itemValue is a single icon object
                      else if (itemValue.path) {
                        return (
                          <div key={itemIndex} className="space-y-4">
                            <h3 className="font-semibold text-white text-lg mb-2">{itemKey}</h3>
                            <IconItem item={itemValue} />
                          </div>
                        );
                      }
                    }
                    
                    // For other categories (3D Models, Fonts)
                    return (
                      <div key={itemIndex} className="space-y-3">
                        <h3 className="font-semibold text-white text-lg mb-2">{itemKey}</h3>
                        <div className="bg-[#2a2a2f] rounded-lg p-6 hover:bg-[#333333] transition-colors">
                          <div className="space-y-3">
                            {Object.entries(itemValue).map(([prop, val]) => (
                              <div key={prop} className="flex flex-col md:flex-row md:items-start gap-2">
                                <span className="font-medium capitalize text-[#43ccf7]">{prop.replace(/-/g, ' ')}:</span>
                                <span>{renderLink(val)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Libraries & Frameworks - Keep existing section */}
          <section className="card-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#43ccf7] mb-6">Libraries & Frameworks</h2>
            <div className="grid md:grid-cols-2 gap-4 text-[#d9ecff]">
              <div>
                <span className="font-medium text-white">React:</span>
                <p className="text-sm mt-1">UI Framework by Meta</p>
              </div>
              <div>
                <span className="font-medium text-white">Three.js:</span>
                <p className="text-sm mt-1">3D Graphics Library</p>
              </div>
              <div>
                <span className="font-medium text-white">GSAP:</span>
                <p className="text-sm mt-1">Animation Library</p>
              </div>
              <div>
                <span className="font-medium text-white">Tailwind CSS:</span>
                <p className="text-sm mt-1">Utility-First CSS Framework</p>
              </div>
              <div>
                <span className="font-medium text-white">React Router:</span>
                <p className="text-sm mt-1">Client-Side Routing</p>
              </div>
              <div>
                <span className="font-medium text-white">React Three Fiber:</span>
                <p className="text-sm mt-1">React Renderer for Three.js</p>
              </div>
              <div>
                <span className="font-medium text-white">EmailJS:</span>
                <p className="text-sm mt-1">Email Service Integration</p>
              </div>
              <div>
                <span className="font-medium text-white">Vite:</span>
                <p className="text-sm mt-1">Build Tool & Dev Server</p>
              </div>
            </div>
          </section>

          {/* Thank You Section */}
          <section className="text-center py-8">
            <div className="hero-badge mx-auto">
              <p className="text-[#d9ecff] leading-relaxed whitespace-normal md:whitespace-nowrap">
                💫 Thank you to all the creators, maintainers, and communities behind these amazing tools! 💫
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AttributionsPage