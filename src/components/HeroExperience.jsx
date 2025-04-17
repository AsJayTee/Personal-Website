import { Model } from "./Library"
import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useState, useEffect, useRef } from "react";
import Particles from "./HeroParticles";
import HeroLights from "./HeroLights";

const spinnerStyles = {
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    borderTop: '3px solid hsl(190, 100%, 98%)',
    animation: 'spin 1s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

const LoadingManager = () => {
  const { active, progress } = useProgress();
  
  useEffect(() => {
    if (!active && progress === 100) {
      window.dispatchEvent(new Event('model-loaded'));
    }
  }, [active, progress]);
  
  return null;
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isLoading, setIsLoading] = useState(true);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const minTimeElapsedRef = useRef(false);
  const modelLoadedRef = useRef(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeElapsedRef.current = true;
      checkIfShouldReveal();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleModelLoaded = () => {
      modelLoadedRef.current = true;
      checkIfShouldReveal();
    };
    
    window.addEventListener('model-loaded', handleModelLoaded);
    return () => window.removeEventListener('model-loaded', handleModelLoaded);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanvasVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  const checkIfShouldReveal = () => {
    if (minTimeElapsedRef.current && modelLoadedRef.current) {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#171720',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 7,
          opacity: isLoading ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: isLoading ? 'auto' : 'none',
        }}
      >
        <div 
          style={spinnerStyles.spinner} 
          className="spinner"
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
      
      {canvasVisible && (
        <Canvas camera={{ position: [0, -4, 15], fov: 45 }}>
          <LoadingManager />
          
          <ambientLight intensity={0.2} color="#1a1a40" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 5} 
            maxPolarAngle={Math.PI / 2} 
          />
          
          <Suspense fallback={null}>
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
      )}
    </div>
  );
};

export default HeroExperience;