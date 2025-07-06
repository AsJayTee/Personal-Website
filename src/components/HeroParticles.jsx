import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  const particlesData = useRef([]);
  
  // Initialize particles data only once
  useMemo(() => {
    if (particlesData.current.length === 0) {
      for (let i = 0; i < count; i++) {
        particlesData.current.push({
          position: [
            (Math.random() - 0.5) * 10,
            Math.random() * 10,
            (Math.random() - 0.5) * 10,
          ],
          speed: 0.005 + Math.random() * 0.001,
          initialY: Math.random() * 10,
        });
      }
    }
  }, [count]);

  // Create geometry and initial positions
  const { positions, geometry } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    
    particlesData.current.forEach((p, i) => {
      positions[i * 3] = p.position[0];
      positions[i * 3 + 1] = p.position[1];
      positions[i * 3 + 2] = p.position[2];
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return { positions, geometry };
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const particle = particlesData.current[i];
      let y = positions[i * 3 + 1];
      
      // Update position
      y -= particle.speed;
      
      // Reset to top when reaching bottom
      if (y < -2) {
        y = particle.initialY + 5;
      }
      
      positions[i * 3 + 1] = y;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default Particles;