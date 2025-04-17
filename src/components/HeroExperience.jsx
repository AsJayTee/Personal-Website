import { Model } from "./Library"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import Loading from "./Loading";
import Particles from "./HeroParticles";
import HeroLights from "./HeroLights";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return(
    <>
      <Canvas camera={{ position: [0, -4, 15], fov: 45 }}>
        <ambientLight intensity={0.2} color="#1a1a40" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 5} 
          maxPolarAngle={Math.PI / 2} 
        />
        <Suspense fallback={<Loading />}>
          <HeroLights />
          <Particles count={100} />
          <group
            scale={isMobile ? 0.55 : 0.7}
            position={[0, -3.5, 0]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <Model />
          </group>

        </Suspense>
      </Canvas>
    </>
  )
}

export default HeroExperience;