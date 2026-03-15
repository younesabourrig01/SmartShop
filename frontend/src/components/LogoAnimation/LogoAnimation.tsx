import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import logo from '../../assets/smartShopLogo.png';

interface LogoAnimationProps {
  height?: string;
  logoWidth?: string;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ 
  height = "h-[400px] md:h-[550px]", 
  logoWidth = "w-40 md:w-56" 
}) => {
  return (
    <div className={`w-full ${height} relative pointer-events-auto overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={null}>
          {/* Principal Sphere */}
          <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <Sphere args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#0046be"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.2}
                />
            </Sphere>
          </Float>

          {/* Small Secondary Elements */}
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[-2, 1.2, -1]}>
            <Sphere args={[0.25, 32, 32]}>
              <MeshDistortMaterial color="#01b0d3" distort={0.3} speed={3} />
            </Sphere>
          </Float>

          <Float speed={3.5} rotationIntensity={0.8} floatIntensity={1.5} position={[2, -1, 0.5]}>
            <Sphere args={[0.18, 16, 16]}>
              <meshStandardMaterial color="#0046be" roughness={0} metalness={0.8} />
            </Sphere>
          </Float>

          <Float speed={2} rotationIntensity={2} floatIntensity={3} position={[-1.5, -1.8, -0.5]}>
            <Sphere args={[0.12, 16, 16]}>
              <meshStandardMaterial color="#01b0d3" roughness={0.2} metalness={0.5} />
            </Sphere>
          </Float>

          <Float speed={4.5} rotationIntensity={0.4} floatIntensity={0.8} position={[2.5, 1.5, -2]}>
             <Sphere args={[0.08, 16, 16]}>
              <meshBasicMaterial color="white" transparent opacity={0.6} />
            </Sphere>
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      {/* Overlaying the actual logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img 
            src={logo} 
            alt="SmartShop Logo" 
            className={`${logoWidth} drop-shadow-[0_25px_60px_rgba(0,70,190,0.4)]`}
            animate={{ 
                y: [0, -15, 0],
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.04, 1]
            }}
            transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        />
      </div>
    </div>
  );
};

export default LogoAnimation;
