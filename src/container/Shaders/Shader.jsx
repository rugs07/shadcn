import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ShaderMaterial for ripple effect
const RippleMaterial = shaderMaterial(
  {
    uTime: 0,
    uRippleCenter: new THREE.Vector2(0.0, 0.0),
    uRippleStrength: 0.0,
  },
  `
    uniform float uTime;
    uniform vec2 uRippleCenter;
    uniform float uRippleStrength;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float dist = distance(vec2(pos.x, pos.y), uRippleCenter);
      float ripple = sin(dist * 10.0 - uTime * 5.0) * 0.1 * uRippleStrength;
      pos.z += ripple;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    void main() {
      vec3 color = mix(vec3(0.0, 0.4, 1.0), vec3(1.0, 1.0, 0.5), vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ RippleMaterial });

// Target component
const Target = ({ position, onClick }) => {
  const meshRef = useRef();

  return (
    <mesh position={[...position, 0.01]} onClick={onClick} ref={meshRef}>
      <circleGeometry args={[0.1, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

const RipplePlane = ({ score, setScore }) => {
  const materialRef = useRef();
  const [targetPos, setTargetPos] = useState([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = THREE.MathUtils.randFloatSpread(2.5); // -1.25 to 1.25
      const y = THREE.MathUtils.randFloatSpread(2.5);
      setTargetPos([x, y]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      materialRef.current.uRippleStrength *= 0.95; 
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const [x, y] = targetPos;
    materialRef.current.uRippleCenter = new THREE.Vector2(x, y);
    materialRef.current.uRippleStrength = 1.0;
    setScore((prev) => prev + 1);
    setTargetPos([THREE.MathUtils.randFloatSpread(2.5), THREE.MathUtils.randFloatSpread(2.5)]);
  };

  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3, 3, 128, 128]} />
        <rippleMaterial ref={materialRef} />
      </mesh>

      <Target position={targetPos} onClick={handleClick} />
    </>
  );
};

const Shader = () => {
  const [score, setScore] = useState(0);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 1.5, 3.5], fov: 50 }}>
        <ambientLight intensity={1} />
        <RipplePlane score={score} setScore={setScore} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          fontSize: '1.5rem',
          fontFamily: 'sans-serif',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default Shader;
