'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

function MercedesModel() {
  const modelRef = useRef<Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Enhanced Mercedes-style luxury car model
  return (
    <group ref={modelRef}>
      {/* Main car body - Mercedes S-Class style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 1.3, 1.9]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Car roof - more elegant curve */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[3.2, 0.8, 1.5]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Front section - Mercedes grille */}
      <mesh position={[-2.25, 0.4, 0]}>
        <boxGeometry args={[0.3, 1.0, 1.4]} />
        <meshStandardMaterial color="#333333" metalness={0.95} roughness={0.05} />
      </mesh>
      
      {/* Mercedes star logo */}
      <mesh position={[-2.1, 0.4, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Side mirrors */}
      <mesh position={[-1.8, 0.8, 1.2]}>
        <boxGeometry args={[0.2, 0.3, 0.15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-1.8, 0.8, -1.2]}>
        <boxGeometry args={[0.2, 0.3, 0.15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Wheels - more detailed */}
      {[-1.4, 1.4].map((x) => 
        [-1.0, 1.0].map((z) => (
          <group key={`${x}-${z}`} position={[x, -0.8, z]}>
            {/* Wheel rim */}
            <mesh>
              <cylinderGeometry args={[0.6, 0.6, 0.25, 16]} />
              <meshStandardMaterial 
                color="#2a2a2a" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
            {/* Tire */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.65, 0.65, 0.2, 16]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                metalness={0.1} 
                roughness={0.8}
              />
            </mesh>
            {/* Wheel center */}
            <mesh position={[0, 0, 0.13]}>
              <circleGeometry args={[0.2]} />
              <meshStandardMaterial 
                color="#c0c0c0" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
          </group>
        ))
      )}
      
      {/* Headlights - LED style */}
      <mesh position={[-2.3, 0.3, 0.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      <mesh position={[-2.3, 0.3, -0.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Front bumper */}
      <mesh position={[-2.3, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.6, 1.8]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Rear lights */}
      <mesh position={[2.3, 0.3, 0.6]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[2.3, 0.3, -0.6]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Window glass */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[3.0, 0.6, 1.4]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.1} 
          roughness={0.1}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Door handles */}
      <mesh position={[-0.5, 0.5, 1.0]}>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.5, 0.5, 1.0]}>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Car3D() {
  return (
    <div className="w-full h-[600px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.3} penumbra={1} />
        <pointLight position={[-5, 0, 5]} intensity={0.4} color="#ffaa00" />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <MercedesModel />
        </PresentationControls>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
