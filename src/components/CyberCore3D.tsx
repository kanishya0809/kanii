import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundManager } from '../audio/soundManager';

interface CyberCore3DProps {
  className?: string;
  onCoreClick?: () => void;
}

export const CyberCore3D: React.FC<CyberCore3DProps> = ({ className = '', onCoreClick }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold all rotating elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Icosahedron / Quantum Core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050510,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe overlay on the core with electric cyan glow
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    coreGroup.add(wireMesh);

    // 2. Inner Glowing Pulsating Sphere
    const innerGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 3. Gyroscopic Cyber Ring 1 (Horizontal Torus)
    const ring1Geo = new THREE.TorusGeometry(2.5, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);

    // 4. Gyroscopic Cyber Ring 2 (Vertical Torus)
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xb026ff });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // 5. Gyroscopic Cyber Ring 3 (Diagonal Toxic Green Torus)
    const ring3Geo = new THREE.TorusGeometry(2.9, 0.02, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10f596 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    // 6. Orbital Satellite Nodes
    const satelliteGroup = new THREE.Group();
    const satGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let i = 0; i < 8; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 8) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5);
      satelliteGroup.add(sat);
    }
    ring1.add(satelliteGroup);

    // 7. Ambient Particle Field (1,200 Glowing Stardust Points)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x00f0ff);
    const colorB = new THREE.Color(0xb026ff);
    const colorC = new THREE.Color(0x10f596);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const px = radius * Math.sin(phi) * Math.cos(theta);
      const py = radius * Math.sin(phi) * Math.sin(theta);
      const pz = radius * Math.cos(phi);

      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;

      originalPositions[i * 3] = px;
      originalPositions[i * 3 + 1] = py;
      originalPositions[i * 3 + 2] = pz;

      const mixed = Math.random() < 0.4 ? colorA : Math.random() < 0.8 ? colorB : colorC;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleSystem);

    // Lighting
    const pointLightCyan = new THREE.PointLight(0x00f0ff, 4, 15);
    pointLightCyan.position.set(3, 4, 3);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xb026ff, 5, 15);
    pointLightPurple.position.set(-3, -3, 3);
    scene.add(pointLightPurple);

    const ambientLight = new THREE.AmbientLight(0x121424, 2);
    scene.add(ambientLight);

    // Mouse tracking variables
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovering = false;
    let burstProgress = 1; // 1 means stable

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = normX * 0.9;
      targetRotX = -normY * 0.7;
    };

    const handleMouseEnter = () => {
      isHovering = true;
      soundManager.playHover();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    const triggerBurst = () => {
      burstProgress = 0;
      soundManager.playWarp();
      if (onCoreClick) onCoreClick();
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseenter', handleMouseEnter);
    mount.addEventListener('mouseleave', handleMouseLeave);
    mount.addEventListener('click', triggerBurst);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped mouse rotation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      coreGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.5) * 0.1;
      coreGroup.rotation.y = currentRotY + elapsedTime * (isHovering ? 0.6 : 0.25);

      // Rotate individual gyroscopic rings on independent axes
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * -0.5;
      ring3.rotation.y = elapsedTime * 0.35;
      satelliteGroup.rotation.z = elapsedTime * -0.8;

      // Pulsing quantum core scale
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.05;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Handle Energy Burst shockwave
      if (burstProgress < 1) {
        burstProgress += 0.025;
        const burstScale = 1 + Math.sin(burstProgress * Math.PI) * 0.6;
        coreMesh.scale.set(burstScale, burstScale, burstScale);
        wireMesh.scale.set(burstScale, burstScale, burstScale);

        // Displace particles outward
        const positions = particleGeo.attributes.position.array as Float32Array;
        const factor = Math.sin(burstProgress * Math.PI) * 1.8;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = originalPositions[i * 3] * (1 + factor);
          positions[i * 3 + 1] = originalPositions[i * 3 + 1] * (1 + factor);
          positions[i * 3 + 2] = originalPositions[i * 3 + 2] * (1 + factor);
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount) {
        mount.removeEventListener('mousemove', handleMouseMove);
        mount.removeEventListener('mouseenter', handleMouseEnter);
        mount.removeEventListener('mouseleave', handleMouseLeave);
        mount.removeEventListener('click', triggerBurst);
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      coreGeo.dispose();
      innerGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particleGeo.dispose();
    };
  }, [onCoreClick]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-pointer select-none ${className}`}
      title="Click to trigger Quantum Burst"
    >
      {/* Interactive Core HUD Ring */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-dashed border-[#00f0ff]/20 animate-spin-slow" />
        <div className="absolute w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full border border-dotted border-[#b026ff]/20" />
      </div>

      {/* Floating Tactical Coordinate Badges */}
      <div className="absolute bottom-6 left-6 font-mono text-[11px] text-[#00f0ff]/70 pointer-events-none hidden md:block">
        <div>CORE://Q-992-ALPHA</div>
        <div className="text-[#10f596]">STATUS: SYNCHRONIZED</div>
      </div>
      <div className="absolute top-6 right-6 font-mono text-[11px] text-[#b026ff]/70 pointer-events-none hidden md:block text-right">
        <div>FREQ: 432.89 THz</div>
        <div>FIELD: 99.8% STABLE</div>
      </div>
    </div>
  );
};
