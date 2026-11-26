"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Box3, MathUtils, Vector3, type Group } from "three";

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Portrait({ animated }: { animated: boolean }) {
  const pivot = useRef<Group>(null);
  const { scene } = useGLTF("/parham-head-web.glb");
  const { center, scale } = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const size = bounds.getSize(new Vector3());
    return {
      center: bounds.getCenter(new Vector3()).negate(),
      scale: 4.15 / Math.max(size.x, size.y, size.z),
    };
  }, [scene]);

  useFrame(({ clock, pointer }, delta) => {
    if (!animated || !pivot.current) return;

    const turn = -1.35 + Math.sin(clock.elapsedTime * .55) * .2 + pointer.x * .28;
    pivot.current.rotation.y = MathUtils.damp(pivot.current.rotation.y, turn, 5, delta);
    pivot.current.rotation.x = MathUtils.damp(pivot.current.rotation.x, -pointer.y * .14, 5, delta);
  });

  return (
    <group ref={pivot} rotation={[0, -1.35, 0]} scale={scale}>
      <group position={center}><primitive object={scene} /></group>
    </group>
  );
}

export default function HeroAtlas() {
  const artwork = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!artwork.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(artwork.current);
    return () => observer.disconnect();
  }, []);

  const animated = visible && !reduceMotion;

  return (
    <div className="hero-art" ref={artwork} aria-hidden="true">
      <SceneBoundary>
        <Canvas dpr={[1, 1.5]} frameloop={animated ? "always" : "demand"} camera={{ position: [0, .3, 6.8], fov: 43 }}>
          <hemisphereLight args={["#fff6ed", "#283f50", 1.65]} />
          <directionalLight position={[4, 4, 5]} color="#fff4ec" intensity={2.3} />
          <directionalLight position={[-4, 1, -3]} color="#3acbff" intensity={3.2} />
          <Suspense fallback={null}><Portrait animated={animated} /></Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
