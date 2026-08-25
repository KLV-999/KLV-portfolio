'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CYAN = new THREE.Color('#00E5FF');

/**
 * Procedurally builds a "circuit plate" planet texture pair, generated once
 * on the client (this whole canvas is loaded with ssr:false):
 *  - albedo: dark metallic plating with lighter panel blotches, so the
 *    sphere reads as a solid, fully round planet body instead of a faint
 *    wireframe outline.
 *  - emissiveMap: glowing cyan circuit traces + node lights, independent of
 *    scene lighting, matching the site's HUD/circuit theme.
 */
function useCircuitPlanetTextures() {
  return useMemo(() => {
    const W = 1024;
    const H = 512;

    const albedoCanvas = document.createElement('canvas');
    albedoCanvas.width = W;
    albedoCanvas.height = H;
    const actx = albedoCanvas.getContext('2d')!;
    actx.fillStyle = '#12141c';
    actx.fillRect(0, 0, W, H);

    for (let i = 0; i < 90; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 60 + 20;
      const grad = actx.createRadialGradient(x, y, 0, x, y, r);
      const light = Math.random() > 0.5;
      grad.addColorStop(0, light ? 'rgba(80,88,105,0.55)' : 'rgba(6,7,10,0.5)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      actx.fillStyle = grad;
      actx.beginPath();
      actx.arc(x, y, r, 0, Math.PI * 2);
      actx.fill();
    }
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const v = Math.random() * 20 - 10;
      actx.fillStyle = `rgba(${150 + v},${160 + v},${175 + v},0.05)`;
      actx.fillRect(x, y, 1, 1);
    }

    const albedo = new THREE.CanvasTexture(albedoCanvas);
    albedo.wrapS = THREE.RepeatWrapping;
    albedo.colorSpace = THREE.SRGBColorSpace;

    const emCanvas = document.createElement('canvas');
    emCanvas.width = W;
    emCanvas.height = H;
    const ectx = emCanvas.getContext('2d')!;
    ectx.fillStyle = '#000000';
    ectx.fillRect(0, 0, W, H);
    ectx.strokeStyle = 'rgba(0,229,255,0.9)';
    ectx.lineWidth = 1.4;

    const traceCount = 46;
    for (let i = 0; i < traceCount; i++) {
      let x = Math.random() * W;
      let y = Math.random() * H;
      const segments = 3 + Math.floor(Math.random() * 5);
      ectx.beginPath();
      ectx.moveTo(x, y);
      for (let s = 0; s < segments; s++) {
        if (Math.random() > 0.5) {
          x += (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60);
        } else {
          y += (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60);
        }
        ectx.lineTo(x, y);
      }
      ectx.globalAlpha = 0.35 + Math.random() * 0.5;
      ectx.stroke();

      ectx.globalAlpha = 1;
      ectx.fillStyle = 'rgba(140,245,255,1)';
      ectx.beginPath();
      ectx.arc(x, y, 2.2, 0, Math.PI * 2);
      ectx.fill();
    }
    ectx.globalAlpha = 1;

    const emissive = new THREE.CanvasTexture(emCanvas);
    emissive.wrapS = THREE.RepeatWrapping;

    return { albedo, emissive };
  }, []);
}

/** Simple cratered grey moon texture, generated once client-side. */
function useMoonTexture() {
  return useMemo(() => {
    const S = 256;
    const canvas = document.createElement('canvas');
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#aeb2bb';
    ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * S;
      const y = Math.random() * S;
      const r = Math.random() * 10 + 2;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(70,73,80,0.55)');
      grad.addColorStop(1, 'rgba(70,73,80,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const RevolvingPlanet: React.FC = () => {
  const planetRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);
  const blipRef = useRef<THREE.Mesh>(null);

  const { albedo, emissive } = useCircuitPlanetTextures();
  const moonMap = useMoonTexture();

  useFrame((state, delta) => {
    // Planet self-rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
      planetRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
    }

    // Moon orbit — a gently tilted ellipse sized to stay comfortably inside
    // the camera frustum at every point in its path (unlike a flat x/z
    // circular orbit, which would swing off-screen on the sides and swell
    // hugely in size as it passed close to the camera).
    if (moonRef.current) {
      const t1 = state.clock.elapsedTime * 0.28;
      const R = 3.0;
      moonRef.current.position.x = Math.cos(t1) * R;
      moonRef.current.position.y = Math.sin(t1) * R * 0.35;
      moonRef.current.position.z = Math.sin(t1) * R * 0.9;
      moonRef.current.rotation.y += delta * 0.25;
    }

    // Secondary faint telemetry blip, fast inner orbit
    if (blipRef.current) {
      const t2 = state.clock.elapsedTime * 0.9 + 2.0;
      blipRef.current.position.x = Math.cos(t2) * 2.9;
      blipRef.current.position.z = Math.sin(t2) * 2.9;
      blipRef.current.position.y = Math.cos(t2 * 1.4) * 0.5;
    }
  });

  return (
    <group ref={planetRef} rotation={[0.3, 0, 0.1]}>
      {/* Primary Planet Sphere — full smooth sphere with a glowing
          circuit-plate surface (fully round, not a faceted low-poly shape) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.2, 96, 96]} />
        <meshStandardMaterial
          map={albedo}
          emissiveMap={emissive}
          emissive={CYAN}
          emissiveIntensity={1.1}
          roughness={0.55}
          metalness={0.6}
        />
      </mesh>

      {/* Outer Cyan Wireframe Grid Overlay for sci-fi HUD vibe */}
      <mesh scale={1.015}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Atmospheric Cyan Terminator Glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Thin Glowing Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
        <ringGeometry args={[3.1, 3.25, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          side={THREE.DoubleSide}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Faint Dust Ring */}
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <ringGeometry args={[3.3, 3.6, 64]} />
        <meshBasicMaterial
          color="#8899AA"
          side={THREE.DoubleSide}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Moon — a clearly visible cratered satellite revolving around the
          planet, well outside the ring system */}
      <group ref={moonRef}>
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial map={moonMap} roughness={0.95} metalness={0.05} />
        </mesh>
      </group>

      {/* Secondary telemetry blip (small, fast inner orbit) */}
      <mesh ref={blipRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

export const PlanetCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-10, -5, -5]} intensity={0.35} color="#00E5FF" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#00E5FF" />

        <RevolvingPlanet />
      </Canvas>
    </div>
  );
};
