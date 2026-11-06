import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroBackgroundProps {
  theme?: 'dark' | 'light';
  className?: string;
}

export const ThreeHeroBackground: React.FC<ThreeHeroBackgroundProps> = ({
  theme = 'dark',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Tech Particle Constellation
    const particleCount = isSoftwareGl ? 40 : 85;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const rangeX = 32;
    const rangeY = 18;
    const rangeZ = 12;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * rangeX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * rangeY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * rangeZ;

      velocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleColor = theme === 'dark' ? 0x818cf8 : 0x4f46e5;
    const pMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: isSoftwareGl ? 0.35 : 0.45,
      transparent: true,
      opacity: theme === 'dark' ? 0.65 : 0.45,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Floating 3D Tech Icosahedrons
    const polyGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const polyMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x6366f1 : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.2,
    });

    const floatingShapes: THREE.Mesh[] = [];
    const shapePositions = [
      [-10, 4, -4],
      [11, -3, -3],
      [-8, -5, -2],
      [9, 5, -5],
    ];

    shapePositions.forEach((pos) => {
      const mesh = new THREE.Mesh(polyGeo, polyMat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      scene.add(mesh);
      floatingShapes.push(mesh);
    });

    // Pointer Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
      targetCameraX = mouseX * 2.5;
      targetCameraY = -mouseY * 2.0;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth camera parallax
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraX, 3.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraY, 3.5, dt);
      camera.lookAt(0, 0, 0);

      // Rotate floating wireframes
      floatingShapes.forEach((shape, idx) => {
        shape.rotation.x += dt * (0.3 + idx * 0.1);
        shape.rotation.y += dt * (0.2 + idx * 0.12);
      });

      // Update particle positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce back within bounds
        if (posArray[i * 3] < -rangeX / 2 || posArray[i * 3] > rangeX / 2) velocities[i].x *= -1;
        if (posArray[i * 3 + 1] < -rangeY / 2 || posArray[i * 3 + 1] > rangeY / 2) velocities[i].y *= -1;
        if (posArray[i * 3 + 2] < -rangeZ / 2 || posArray[i * 3 + 2] > rangeZ / 2) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      pMaterial.dispose();
      polyGeo.dispose();
      polyMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
