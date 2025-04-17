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

const HeroLights = () => (
  <>
    <PointingSpotLight
      position={[-2, 3, 3]}
      targetPosition={[-1, -1.2, 1.3]} 
      angle={0.6}
      penumbra={0.7}
      intensity={25}
      color="yellow"
      showHelper={false}
    />
    <PointingSpotLight
      position={[-1, 3, 1]}
      targetPosition={[-0.5, -1.2, 1.5]} 
      angle={0.3}
      penumbra={0.3}
      intensity={35}
      color="yellow"
      showHelper={false}
    />
    <PointingSpotLight
      position={[4, 5, 4]}
      targetPosition={[0.5, -1.2, 2]} 
      angle={0.4}
      penumbra={0.5}
      intensity={20}
      color="#43ccf7"
      showHelper={false}
    />
    <PointingSpotLight
      position={[-3, 8, 5]}
      targetPosition={[2, 0.2, 1]} 
      angle={0.6}
      penumbra={1}
      intensity={60}
      color="#9d4edd"
      showHelper={false}
    />
    <primitive
      object={new THREE.RectAreaLight("#a259ff", 8, 3, 2)}
      position={[1, 3, 4]}
      rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      intensity={5}
    />
    <PointingSpotLight
      position={[4, 1.6, 2]}
      targetPosition={[4, 0.2, 2]} 
      angle={0.9}
      penumbra={1}
      intensity={30}
      color="#ffff80"
      showHelper={false}
    />
    <PointingSpotLight
      position={[0, 1, 8]}
      targetPosition={[2, 1, 2]} 
      angle={0.2}
      penumbra={1}
      intensity={100}
      color="#7209b7"
      showHelper={false}
    />
    <PointingSpotLight
      position={[0, 1, 8]}
      targetPosition={[1.2, 0, 2]} 
      angle={0.2}
      penumbra={1}
      intensity={100}
      color="#0d00a4"
      showHelper={false}
    />
  </>
);

export default HeroLights;