import * as THREE from "three";
import { useRef, useEffect } from "react";

const LightHelperSphere = ({ position, color = "white" }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.05, 16, 16]} />
    <meshBasicMaterial color={color} />
  </mesh>
);

const PointingSpotLight = ({ position, targetPosition, color, showHelper=true, ...props }) => {
  const lightRef = useRef();
  const targetRef = useRef();

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      <spotLight ref={lightRef} position={position} color={color} {...props} />
      {/* invisible target object */}
      <object3D ref={targetRef} position={targetPosition} />
      {showHelper && (
        <>
          <LightHelperSphere position={position} color="red" />
          <LightHelperSphere position={targetPosition} color={color} />
        </>
      )}
    </>
  );
};

const HeroLights = ({ isMobile = false }) => {
  // Offset for mobile positioning
  const mobileOffset = isMobile ? -0.5 : 0;
  const scaleAdjust = isMobile ? 0.55 / 0.7 : 1; // Account for scale difference
  
  return (
    <>
      <PointingSpotLight
        position={[-2 + mobileOffset * 0.5, 3, 3]}
        targetPosition={[-1 + mobileOffset, -1.2, 1.3]} 
        angle={0.6}
        penumbra={0.7}
        intensity={isMobile ? 20 : 25}
        color="yellow"
        showHelper={false}
      />
      <PointingSpotLight
        position={[-1 + mobileOffset * 0.5, 3, 1]}
        targetPosition={[-0.5 + mobileOffset, -1.2, 1.5]} 
        angle={0.3}
        penumbra={0.3}
        intensity={isMobile ? 30 : 35}
        color="yellow"
        showHelper={false}
      />
      <PointingSpotLight
        position={[4, 5, 4]}
        targetPosition={[0.5 + mobileOffset, -1.2, 2]} 
        angle={0.4}
        penumbra={0.5}
        intensity={isMobile ? 15 : 20}
        color="#43ccf7"
        showHelper={false}
      />
      <PointingSpotLight
        position={[-3, 8, 5]}
        targetPosition={[2 + mobileOffset, 0.2, 1]} 
        angle={0.6}
        penumbra={1}
        intensity={isMobile ? 50 : 60}
        color="#9d4edd"
        showHelper={false}
      />
      <primitive
        object={new THREE.RectAreaLight("#a259ff", isMobile ? 6 : 8, 3, 2)}
        position={[1 + mobileOffset * 0.7, 3, 4]}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
        intensity={isMobile ? 4 : 5}
      />
      <PointingSpotLight
        position={isMobile ? [2.7, 0.7, 2] : [4, 1.6, 2]}
        targetPosition={isMobile ? [2.7, -0.7, 2] : [4, 0.2, 2]} 
        angle={0.9}
        penumbra={1}
        intensity={isMobile ? 25 : 30}
        color="#ffff80"
        showHelper={false}
      />
      <PointingSpotLight
        position={[0, 1, 8]}
        targetPosition={[2 + mobileOffset, 1, 2]} 
        angle={0.2}
        penumbra={1}
        intensity={isMobile ? 80 : 100}
        color="#7209b7"
        showHelper={false}
      />
      <PointingSpotLight
        position={[0, 1, 8]}
        targetPosition={[1.2 + mobileOffset, 0, 2]} 
        angle={0.2}
        penumbra={1}
        intensity={isMobile ? 80 : 100}
        color="#0d00a4"
        showHelper={false}
      />
    </>
  );
};

export default HeroLights;