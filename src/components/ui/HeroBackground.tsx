'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 1. LES SHADERS COMPLETS (Le moteur visuel) ---

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;
varying vec3 vViewPosition;

// Fonction de Bruit Simplex 3D (Classique)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vec3 pos = position;
  float time = uTime * 0.15;

  // Création des vagues soyeuses
  float noiseVal = snoise(vec3(uv * 1.5, time));
  float noiseVal2 = snoise(vec3(uv * 2.5 + 4.0, time * 0.8));
  
  float h = (noiseVal * 0.6 + noiseVal2 * 0.3) * 1.5;

  pos.z += h;
  vElevation = h;

  // Calcul des normales (approx)
  float offset = 0.01;
  float hRight = snoise(vec3((uv + vec2(offset, 0.0)) * 1.5, time)) * 0.6 + snoise(vec3((uv + vec2(offset, 0.0)) * 2.5 + 4.0, time * 0.8)) * 0.3;
  hRight *= 1.5;
  
  float hTop = snoise(vec3((uv + vec2(0.0, offset)) * 1.5, time)) * 0.6 + snoise(vec3((uv + vec2(0.0, offset)) * 2.5 + 4.0, time * 0.8)) * 0.3;
  hTop *= 1.5;

  vec3 tangent = normalize(vec3(offset, 0.0, hRight - h));
  vec3 bitangent = normalize(vec3(0.0, offset, hTop - h));
  vNormal = normalize(cross(tangent, bitangent));

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorBg;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(-0.5, 0.5, 1.0));

  float t = uTime * 0.15;
  
  // Flux visqueux
  float flow1 = sin(vUv.x * 2.5 + t + vElevation * 0.4); 
  float flow2 = cos(vUv.y * 2.0 - t * 0.8 + vElevation * 0.4);

  // Mélange couleurs
  vec3 blobColor = mix(uColor1, uColor2, smoothstep(-0.6, 0.6, flow1));
  blobColor = mix(blobColor, uColor3, smoothstep(-0.6, 0.6, flow2));

  // Profondeur
  float depthFactor = smoothstep(-1.2, 1.5, vElevation);
  vec3 finalColor = uColorBg;
  finalColor = mix(finalColor, blobColor, depthFactor * 0.85);

  // Reflets
  vec3 halfVector = normalize(lightDir + viewDir);
  float NdotH = max(dot(normal, halfVector), 0.0);
  float specWet = pow(NdotH, 6.0); 
  float specShiny = pow(NdotH, 30.0); 
  vec3 specColor = vec3(1.0) * (specWet * 0.25 + specShiny * 0.5);
  finalColor += specColor;

  // Fresnel
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
  finalColor += blobColor * fresnel * 0.6;
  finalColor += uColorBg * fresnel * 0.4;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

// --- 2. LE COMPOSANT 3D ---

const GradientPlane = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColorBg: { value: new THREE.Color("#0a0520") },
            uColor1: { value: new THREE.Color("#06b6d4") }, // Cyan
            uColor2: { value: new THREE.Color("#fbbf24") }, // Gold
            uColor3: { value: new THREE.Color("#d946ef") }, // Violet
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (meshRef.current.material as any).uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={[2, 2, 1]}>
            {/* Segments réduits à 64 pour optimiser les performances (LCP/TBT) */}
            <planeGeometry args={[5, 5, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// --- 3. LE COMPOSANT EXPORTÉ AVEC SÉCURITÉ ---

export function HeroBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div
            className="absolute inset-0 z-0 bg-[#0a0520]"
            // FALLBACK CSS : Si le 3D plante, on voit quand même les couleurs
            style={{
                background: `
                    radial-gradient(circle at 20% 30%, rgba(6,182,212,0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(217,70,239,0.15) 0%, transparent 50%),
                    linear-gradient(to bottom, #0a0520 0%, #050210 100%)
                `
            }}
        >
            {mounted && (
                <Canvas
                    camera={{ position: [0, 0, 1.5] }}
                    // OPTIMISATIONS ANTI-CRASH
                    dpr={[1, 1.5]} // On bride la résolution pour sauver la carte graphique
                    gl={{
                        antialias: false,
                        powerPreference: "high-performance",
                        alpha: false
                    }}
                >
                    <GradientPlane />
                </Canvas>
            )}
        </div>
    );
}