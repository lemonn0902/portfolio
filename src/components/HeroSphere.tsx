"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 400;
    const H = mount.clientHeight || 400;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Gold wireframe icosahedron
    const geo      = new THREE.IcosahedronGeometry(1, 1);
    const edges    = new THREE.EdgesGeometry(geo);
    const mat      = new THREE.LineBasicMaterial({
      color:       0xc9a84c,
      transparent: true,
      opacity:     0.7,
    });
    const sphere   = new THREE.LineSegments(edges, mat);
    scene.add(sphere);

    // Outer sparse shell
    const outerGeo   = new THREE.IcosahedronGeometry(1.35, 0);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat   = new THREE.LineBasicMaterial({
      color:       0xc9a84c,
      transparent: true,
      opacity:     0.15,
    });
    scene.add(new THREE.LineSegments(outerEdges, outerMat));

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      sphere.rotation.x += 0.0018;
      sphere.rotation.y += 0.0028;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
