"use client";

import { useEffect, useRef } from "react";

type PortalWarpCanvasProps = {
  active?: boolean;
  className?: string;
  overlay?: boolean;
  tone?: number;
};

export function PortalWarpCanvas({ active = false, className = "", overlay = false, tone = 0 }: PortalWarpCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (!overlay && window.matchMedia("(max-width: 767px)").matches)
    ) {
      return;
    }

    let cancelled = false;
    let frame = 0;
    let visible = true;
    let renderer: import("three").WebGLRenderer | undefined;
    let geometry: import("three").PlaneGeometry | undefined;
    let material: import("three").ShaderMaterial | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let visibilityObserver: IntersectionObserver | undefined;

    async function mount() {
      const THREE = await import("three");
      if (cancelled || !canvasRef.current) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
      material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uEnergy: { value: overlay ? 1 : 0.24 },
          uTone: { value: tone },
          uAspect: { value: 1 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uEnergy;
          uniform float uTone;
          uniform float uAspect;

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 345.45));
            p += dot(p, p + 34.345);
            return fract(p.x * p.y);
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= uAspect;
            float time = uTime;

            float foldA = sin((p.x * 8.0 + p.y * 4.0) - time * 1.6);
            float foldB = sin((p.y * 13.0 - p.x * 3.0) + time * 2.1);
            float foldC = sin((p.x + p.y) * 19.0 - time * 2.7);
            float ribbons = smoothstep(0.73, 1.0, abs(foldA * 0.54 + foldB * 0.31 + foldC * 0.15));

            float aperture = smoothstep(0.58, 0.08, abs(p.x) + abs(p.y) * 0.34);
            float edge = smoothstep(0.47, 0.49, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
            float scan = smoothstep(0.94, 1.0, sin((uv.y + time * 0.24) * 82.0));
            float dust = step(0.994, hash(floor(uv * vec2(90.0, 130.0)) + floor(time * 7.0)));

            vec3 cyan = vec3(0.24, 0.90, 1.0);
            vec3 gold = vec3(1.0, 0.68, 0.34);
            vec3 rose = vec3(1.0, 0.32, 0.62);
            vec3 accent = mix(cyan, gold, step(0.5, uTone));
            accent = mix(accent, rose, step(1.5, uTone));
            vec3 color = mix(accent, vec3(0.85, 0.95, 1.0), ribbons * 0.55);

            float energy = mix(0.18, 1.0, uEnergy);
            float alpha = (ribbons * aperture * 0.46 + scan * 0.08 + dust * 0.8 + edge * 0.1) * energy;
            gl_FragColor = vec4(color * (0.7 + energy * 0.7), alpha);
          }
        `
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setClearColor(0x000000, 0);

      const resize = () => {
        if (!renderer || !material || !canvasRef.current) {
          return;
        }
        const rect = canvasRef.current.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, overlay ? 1.35 : 1.15));
        renderer.setSize(rect.width, rect.height, false);
        material.uniforms.uAspect.value = rect.width / rect.height;
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvasRef.current);
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      }, { rootMargin: "120px" });
      visibilityObserver.observe(canvasRef.current);
      resize();

      let last = performance.now();
      let energy = overlay ? 1 : 0.24;
      const draw = (now: number) => {
        if (cancelled || !renderer || !material) {
          return;
        }
        const delta = Math.min(48, now - last);
        last = now;
        energy += ((activeRef.current || overlay ? 1 : 0.24) - energy) * Math.min(1, delta * 0.008);
        material.uniforms.uTime.value = now * 0.001;
        material.uniforms.uEnergy.value = energy;
        if (visible && !document.hidden) {
          renderer.render(scene, camera);
        }
        frame = window.requestAnimationFrame(draw);
      };
      frame = window.requestAnimationFrame(draw);
    }

    mount();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, [overlay, tone]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
