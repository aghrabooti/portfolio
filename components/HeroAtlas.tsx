"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera, RoundedBox, Stars, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const nodes = [
  { name: "KOOGYMAA", position: [-2.15, 0.95, 0.15] as [number, number, number], color: "#69dce8" },
  { name: "TELEGRAM", position: [2.12, 1.05, -0.2] as [number, number, number], color: "#91a5ff" },
  { name: "PARSICHIN", position: [-2.12, -1.05, -0.2] as [number, number, number], color: "#b9ef91" },
  { name: "AZIZI STORE", position: [2.12, -1.0, 0.2] as [number, number, number], color: "#69dce8" },
];

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.1, 0.025);
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
        <RoundedBox args={[1.08, 1.08, 1.08]} radius={0.1} smoothness={5}>
          <meshPhysicalMaterial color="#102b3a" metalness={0.7} roughness={0.2} transmission={0.24} thickness={0.8} />
        </RoundedBox>
        <mesh>
          <boxGeometry args={[1.13, 1.13, 1.13]} />
          <meshBasicMaterial color="#69dce8" wireframe transparent opacity={0.24} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial color="#69dce8" emissive="#168da5" emissiveIntensity={2.2} metalness={0.7} roughness={0.2} />
        </mesh>
        <Text position={[0, -0.78, 0]} fontSize={0.105} color="#a9edf2" letterSpacing={0.12} anchorX="center">
          SYSTEM CORE
        </Text>
      </Float>
    </group>
  );
}

function Module({ name, position, color }: (typeof nodes)[number]) {
  return (
    <Float speed={1.15} floatIntensity={0.18} rotationIntensity={0.07}>
      <group position={position}>
        <RoundedBox args={[1.12, 0.55, 0.16]} radius={0.055} smoothness={4}>
          <meshPhysicalMaterial color="#111f2d" metalness={0.7} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.09]}>
          <boxGeometry args={[0.9, 0.016, 0.014]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[-0.42, 0.14, 0.095]}>
          <sphereGeometry args={[0.027, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <Text position={[0, -0.06, 0.105]} fontSize={0.085} color="#dceaf0" anchorX="center">
          {name}
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  const links = useMemo(() => nodes.map((node) => [new THREE.Vector3(...node.position), new THREE.Vector3(0, 0, 0)]), []);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7.7]} fov={43} />
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} intensity={28} color="#42cde8" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#617cff" />
      <pointLight position={[0, 3, -4]} intensity={12} color="#b5f28a" />
      <Stars radius={40} depth={30} count={650} factor={1.7} fade speed={0.3} />
      <Core />
      {links.map((points, i) => (
        <Line key={i} points={points} color={nodes[i].color} transparent opacity={0.5} lineWidth={1} dashed dashScale={2} dashSize={0.12} gapSize={0.08} />
      ))}
      {nodes.map((node) => <Module key={node.name} {...node} />)}
      <mesh rotation={[Math.PI / 2.4, 0, 0]} position={[0, 0, -1.2]}>
        <torusGeometry args={[2.72, 0.005, 8, 120]} />
        <meshBasicMaterial color="#69dce8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0.3, 0.4, 0]} position={[0, 0, -1.4]}>
        <torusGeometry args={[3.12, 0.004, 8, 120]} />
        <meshBasicMaterial color="#7189ff" transparent opacity={0.16} />
      </mesh>
    </>
  );
}

export default function HeroAtlas() {
  return (
    <div className="hero-canvas">
      <div className="canvas-label"><span className="status-dot" /> SYSTEM TOPOLOGY <span className="label-muted">// LIVE RENDER</span></div>
      <div className="canvas-coordinate">X: 3D · Z: DEPTH</div>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}><Scene /></Suspense>
      </Canvas>
      <div className="canvas-footer"><span>INTERCONNECTED SYSTEMS · 08 NODES</span><span>MOVE TO EXPLORE</span></div>
    </div>
  );
}
