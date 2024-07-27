import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';
import vertexShader from './shaders/vertexShaders/vertexShader.glsl';
import stars from './shaders/fragShaders/starsV1.glsl'

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get window dimensions
    const { innerWidth: width, innerHeight: height } = window;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      -1000,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // Set renderer size and attach it to the DOM
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Geometry and Shader Material
    const geometry = new THREE.PlaneGeometry(width, height);
    const uniforms = {
      uResolution: { type: 'v2', value: new THREE.Vector2(width, height) },
      uScale: { value: 400.0 },
      uTime: { value: 0.0 }
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: stars,
      uniforms: uniforms
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      // Update uTime uniform
      uniforms.uTime.value = clock.getElapsedTime();

      // console.log(uniforms.uTime);

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ overflow: 'hidden', width: '100%', height: '100vh' }}>
      {/* The canvas will automatically fill the div */}
    </div>
  );
}

export default App;
