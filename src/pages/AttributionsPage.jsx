import TitleHeader from "../components/TitleHeader"

const AttributionsPage = () => {
  return (
    <div className="min-h-screen bg-[#171720] py-20">
      <div className="container mx-auto px-5 md:px-20 max-w-6xl">
        <TitleHeader
          title="Attributions & Credits"
          sub="Thanks & Recognition 🙏"
        />
        
        <div className="mt-16 space-y-12">
          {/* 3D Models & Assets */}
          <section className="card-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#43ccf7] mb-6">3D Models & Assets</h2>
            <div className="space-y-4 text-[#d9ecff]">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium">Library 3D Model:</span>
                <span>
                  Created by <a href="https://sketchfab.com/beebadea" target="_blank" rel="noopener noreferrer" className="text-[#43ccf7] hover:text-white transition-colors underline">Bee Badea</a>
                  {" "}• Licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#43ccf7] hover:text-white transition-colors underline">CC-BY-4.0</a>
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium">Icons:</span>
                <span>
                  <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-[#43ccf7] hover:text-white transition-colors underline">Lucide React</a>
                  {" "}• Free & Open Source Icon Library
                </span>
              </div>
            </div>
          </section>

          {/* Fonts & Typography */}
          <section className="card-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#43ccf7] mb-6">Fonts & Typography</h2>
            <div className="space-y-4 text-[#d9ecff]">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium">Mona Sans:</span>
                <span>
                  <a href="https://github.com/github/mona-sans" target="_blank" rel="noopener noreferrer" className="text-[#43ccf7] hover:text-white transition-colors underline">GitHub's Mona Sans</a>
                  {" "}• Open Source Font Family
                </span>
              </div>
            </div>
          </section>

          {/* Libraries & Frameworks */}
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
            </div>
          </section>

          {/* Images & Graphics */}
          <section className="card-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#43ccf7] mb-6">Images & Graphics</h2>
            <div className="space-y-4 text-[#d9ecff]">
              <div>
                <span className="font-medium text-white">Technology Icons:</span>
                <p className="text-sm mt-1">Various official sources and community resources</p>
              </div>
              <div>
                <span className="font-medium text-white">Hero Graphics:</span>
                <p className="text-sm mt-1">Custom designed and curated</p>
              </div>
            </div>
          </section>

          {/* Thank You Section */}
          <section className="text-center py-8">
            <div className="hero-badge mx-auto">
              <p className="text-[#d9ecff]">
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