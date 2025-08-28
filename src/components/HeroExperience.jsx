import { Model } from "./Library"
import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useState, useEffect, useRef, useCallback, memo } from "react";
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

// Memoize the 3D scene content to prevent unnecessary re-renders
const SceneContent = memo(({ isMobile }) => {
  return (
    <>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <HeroLights isMobile = {isMobile} />
      <Particles count={100} />
      <group
        scale={isMobile ? 0.55 : 0.7}
        position={isMobile ? [-0.5, -3.5, 0] : [0, -3.5, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <Model />
      </group>
    </>
  );
});

SceneContent.displayName = 'SceneContent';

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isLoading, setIsLoading] = useState(true);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const minTimeElapsedRef = useRef(false);
  const modelLoadedRef = useRef(false);
  const canvasRef = useRef();
  const controlsRef = useRef();
  const interactionTimeoutRef = useRef();
  
  // Initialize timers
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeElapsedRef.current = true;
      checkIfShouldReveal();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Model loaded handler
  useEffect(() => {
    const handleModelLoaded = () => {
      modelLoadedRef.current = true;
      checkIfShouldReveal();
    };
    
    window.addEventListener('model-loaded', handleModelLoaded);
    return () => window.removeEventListener('model-loaded', handleModelLoaded);
  }, []);
  
  // Canvas visibility
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

  // Handle interaction with debouncing to prevent scroll interference
  const handleInteractionStart = useCallback((e) => {
    // Clear any pending timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    
    setIsInteracting(true);
    
    // Temporarily prevent scroll on the body during interaction
    document.body.style.overflow = 'hidden';
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false);
    
    // Re-enable scrolling after a short delay to prevent accidental scrolls
    interactionTimeoutRef.current = setTimeout(() => {
      document.body.style.overflow = '';
    }, 100);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Loading Spinner */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '15%',
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
      
      {/* 3D Canvas */}
      {canvasVisible && (
        <div 
          ref={canvasRef}
          style={{ 
            width: '100%', 
            height: '100%',
            touchAction: isInteracting ? 'none' : 'pan-y',
            cursor: isInteracting ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onTouchCancel={handleInteractionEnd}
        >
          <Canvas 
            camera={{ 
              position: [0, -3.5, 16.5], 
              fov: isMobile ? 50 : 57
            }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              logarithmicDepthBuffer: false,
              precision: "highp"
            }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
            performance={{ min: 0.5 }}
          >
            <LoadingManager />
            
            <OrbitControls 
              ref={controlsRef}
              enablePan={false} 
              enableZoom={false}
              minPolarAngle={Math.PI / 5} 
              maxPolarAngle={Math.PI / 2}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={isMobile ? 0.7 : 0.5}
              // Disable all zoom
              zoomSpeed={0}
              minDistance={0}
              maxDistance={Infinity}
              // Mouse controls
              mouseButtons={{
                LEFT: 0,  // ROTATE
                MIDDLE: -1,  // Disabled
                RIGHT: -1   // Disabled
              }}
              // Touch controls
              touches={{
                ONE: 0,  // ROTATE
                TWO: -1  // Disabled
              }}
              // No keyboard
              enableKeys={false}
            />
            
            <Suspense fallback={null}>
              <SceneContent isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default HeroExperience;