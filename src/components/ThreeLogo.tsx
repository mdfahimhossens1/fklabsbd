import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  interactive?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export const ThreeLogo: React.FC<ThreeLogoProps> = ({
  size = 'md',
  interactive = true,
  className = '',
  theme = 'dark',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<'indigo' | 'emerald' | 'gold'>('indigo');
  const [isDragging, setIsDragging] = useState(false);

  // Dimensions based on size prop
  const getDims = () => {
    switch (size) {
      case 'sm':
        return { width: 44, height: 44, cameraZ: 4.8 };
      case 'md':
        return { width: 80, height: 80, cameraZ: 4.5 };
      case 'lg':
        return { width: 140, height: 140, cameraZ: 4.2 };
      case 'hero':
      default:
        return { width: 340, height: 340, cameraZ: 4.0 };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { width, height, cameraZ } = getDims();

    // 1. Detect software WebGL safely
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

    // 2. Initialize Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Environment Map for realistic metallic sheen
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 3.0);
    rimLight.position.set(-4, -3, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(
      materialTheme === 'emerald' ? 0x10b981 : materialTheme === 'gold' ? 0xf59e0b : 0x818cf8,
      4,
      8
    );
    accentLight.position.set(0, 0, 1.8);
    scene.add(accentLight);

    // 5. Composite 3D FKLabs Emblem Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Material colors
    const getColors = () => {
      if (materialTheme === 'emerald') {
        return {
          primary: 0x10b981,
          secondary: 0x34d399,
          emissive: 0x064e3b,
          accent: 0xa7f3d0,
        };
      }
      if (materialTheme === 'gold') {
        return {
          primary: 0xf59e0b,
          secondary: 0xfbbf24,
          emissive: 0x78350f,
          accent: 0xfef08a,
        };
      }
      // default indigo
      return {
        primary: 0x6366f1,
        secondary: 0x818cf8,
        emissive: 0x1e1b4b,
        accent: 0xc7d2fe,
      };
    };

    const colors = getColors();

    // Part A: Central Hexagonal Core Shield (Extruded Polygon)
    const hexShape = new THREE.Shape();
    const hexSides = 6;
    const hexRadius = 1.05;
    for (let i = 0; i < hexSides; i++) {
      const angle = (i * Math.PI * 2) / hexSides + Math.PI / 6;
      const x = Math.cos(angle) * hexRadius;
      const y = Math.sin(angle) * hexRadius;
      if (i === 0) hexShape.moveTo(x, y);
      else hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };
    const coreGeometry = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
    coreGeometry.center();

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x0f172a : 0xf8fafc,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    logoGroup.add(coreMesh);

    // Part B: 3D "F" & "K" Stylized Geometry on front face
    // Let's create high-tech architectural letters using Box/Extrude shapes
    const glyphGroup = new THREE.Group();
    glyphGroup.position.set(0, 0, 0.16);

    const glyphMaterial = new THREE.MeshPhysicalMaterial({
      color: colors.primary,
      emissive: colors.emissive,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
    });

    // F letter construction
    // F - vertical stem
    const fStemGeo = new THREE.BoxGeometry(0.12, 0.72, 0.12);
    const fStem = new THREE.Mesh(fStemGeo, glyphMaterial);
    fStem.position.set(-0.55, 0, 0);
    glyphGroup.add(fStem);

    // F - top bar
    const fTopGeo = new THREE.BoxGeometry(0.35, 0.11, 0.12);
    const fTop = new THREE.Mesh(fTopGeo, glyphMaterial);
    fTop.position.set(-0.38, 0.3, 0);
    glyphGroup.add(fTop);

    // F - mid bar
    const fMidGeo = new THREE.BoxGeometry(0.26, 0.1, 0.12);
    const fMid = new THREE.Mesh(fMidGeo, glyphMaterial);
    fMid.position.set(-0.42, 0.04, 0);
    glyphGroup.add(fMid);

    // K letter construction
    // K - vertical stem
    const kStemGeo = new THREE.BoxGeometry(0.12, 0.72, 0.12);
    const kStem = new THREE.Mesh(kStemGeo, glyphMaterial);
    kStem.position.set(0.12, 0, 0);
    glyphGroup.add(kStem);

    // K - upper diagonal arm
    const kUpperGeo = new THREE.BoxGeometry(0.11, 0.44, 0.12);
    const kUpper = new THREE.Mesh(kUpperGeo, glyphMaterial);
    kUpper.position.set(0.32, 0.18, 0);
    kUpper.rotation.z = -Math.PI / 4;
    glyphGroup.add(kUpper);

    // K - lower diagonal arm
    const kLowerGeo = new THREE.BoxGeometry(0.11, 0.44, 0.12);
    const kLower = new THREE.Mesh(kLowerGeo, glyphMaterial);
    kLower.position.set(0.34, -0.18, 0);
    kLower.rotation.z = Math.PI / 4;
    glyphGroup.add(kLower);

    logoGroup.add(glyphGroup);

    // Part C: Outer Orbital Gyroscopic Rings
    const ringGeo1 = new THREE.TorusGeometry(1.45, 0.032, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: colors.secondary,
      metalness: 0.9,
      roughness: 0.2,
      emissive: colors.primary,
      emissiveIntensity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    logoGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.65, 0.024, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: colors.accent,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.5;
    logoGroup.add(ring2);

    // Part D: Floating Energy Satellites / Nodes
    const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: colors.secondary });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      logoGroup.add(node);
      nodes.push(node);
    }

    // 6. Interaction State & Mouse Handling
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let autoRotateAngle = 0;
    let isUserInteracting = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isUserInteracting = true;
      setIsDragging(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      if (isUserInteracting) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.012;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        // Subtle hover parallax
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 0.8;
        targetRotationX = -y * 0.8;
      }
    };

    const handlePointerUp = () => {
      isUserInteracting = false;
      setIsDragging(false);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 7. Silky Smooth Animation Loop with Exponential Damping
    let frameId = 0;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isUserInteracting) {
        autoRotateAngle += dt * 0.65;
        // Float oscillation
        logoGroup.position.y = Math.sin(autoRotateAngle * 1.5) * 0.08;
      }

      // Smooth exponential damping
      currentRotationX = THREE.MathUtils.damp(currentRotationX, targetRotationX, 6, dt);
      currentRotationY = THREE.MathUtils.damp(currentRotationY, targetRotationY, 6, dt);

      logoGroup.rotation.x = currentRotationX;
      logoGroup.rotation.y = currentRotationY + (isUserInteracting ? 0 : autoRotateAngle * 0.35);

      // Spin rings in opposing directions
      ring1.rotation.z += dt * 0.8;
      ring2.rotation.x += dt * 0.6;

      // Position satellite nodes along orbital paths
      nodes.forEach((node, i) => {
        const angle = autoRotateAngle * 1.2 + (i * Math.PI) / 2;
        node.position.x = Math.cos(angle) * 1.45;
        node.position.y = Math.sin(angle) * 0.6 * Math.sin(ring1.rotation.x);
        node.position.z = Math.sin(angle) * 1.45 * Math.cos(ring1.rotation.x);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      glyphMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
    };
  }, [size, materialTheme, theme, interactive]);

  const { width, height } = getDims();

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div
        ref={mountRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`touch-none ${interactive ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'pointer-events-none'}`}
        title="Interactive 3D FKLabs Emblem - Drag to rotate"
      />
      {size === 'hero' && (
        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg text-xs">
          <span className="text-slate-400 font-mono text-[11px]">3D Finish:</span>
          <button
            onClick={() => setMaterialTheme('indigo')}
            className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${materialTheme === 'indigo' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
            title="Cyber Indigo"
          />
          <button
            onClick={() => setMaterialTheme('emerald')}
            className={`w-4 h-4 rounded-full bg-emerald-500 transition-transform ${materialTheme === 'emerald' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
            title="Emerald Matrix"
          />
          <button
            onClick={() => setMaterialTheme('gold')}
            className={`w-4 h-4 rounded-full bg-amber-500 transition-transform ${materialTheme === 'gold' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
            title="Titan Gold"
          />
          <span className="text-slate-500 text-[10px] ml-1">✦ Drag to spin</span>
        </div>
      )}
    </div>
  );
};
