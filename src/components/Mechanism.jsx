import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTransform } from 'framer-motion';

// Refactored Mechanism to react to scroll
export const Mechanism = () => {
    const group = useRef();
    const scroll = useScroll(); // Access scroll data from ScrollControls
    const { width, height } = useThree((state) => state.viewport);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        const r1 = scroll.range(0, 1 / 3); // Clarity Phase
        const r2 = scroll.range(1 / 3, 1 / 3); // Structure Phase
        const r3 = scroll.range(2 / 3, 1 / 3); // Flow Phase

        // Base Floating
        if (group.current) {
            // 1. CLARITY: Zoom/Focus - reduce noise, center object
            const zoom = 1 + r1 * 0.5;

            // 2. STRUCTURE: Deconstruct - explode parts
            const explode = r2 * 2;

            // 3. FLOW: Spin - rapid rotation
            const spin = r3 * 10;

            // Apply Animations
            group.current.rotation.x = (Math.cos(t / 4) / 8) + (spin * 0.5);
            group.current.rotation.y = (Math.sin(t / 4) / 8) + spin;

            // Scale pulse on Clarity
            const finalScale = 0.8 * zoom;
            group.current.scale.set(finalScale, finalScale, finalScale);
        }
    });

    const glassMaterial = {
        transmission: 1, opacity: 1, roughness: 0.2, thickness: 1.5, ior: 1.5,
        chromaticAberration: 0.04, anisotropy: 20, distortion: 0.2, distortionScale: 0.3,
        temporalDistortion: 0.5, clearcoat: 1, attenuationDistance: 0.5, attenuationColor: '#ffffff', color: '#ffffff'
    };

    const ChromeMaterial = <meshStandardMaterial color="#A1A1AA" metalness={1} roughness={0.1} />;

    return (
        <group ref={group}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh>
                    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                    <meshPhysicalMaterial {...glassMaterial} />
                </mesh>
                <mesh position={[2, 1, -1]} scale={0.4}>
                    <sphereGeometry args={[1, 32, 32]} />
                    {ChromeMaterial}
                </mesh>
                <mesh position={[-2, -1, 1]} scale={0.3}>
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    {ChromeMaterial}
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.5, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
                </mesh>
            </Float>
        </group>
    );
};
