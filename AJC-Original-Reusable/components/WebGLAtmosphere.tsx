"use client";

import { useEffect, useRef } from "react";

type AtmosphereVariant = "hero" | "portal" | "editorial";

const palettes: Record<AtmosphereVariant, { colorA: [number, number, number]; colorB: [number, number, number]; accent: [number, number, number] }> = {
  hero: {
    colorA: [0.02, 0.38, 0.52],
    colorB: [0.95, 0.34, 0.2],
    accent: [0.24, 0.9, 1]
  },
  portal: {
    colorA: [0.12, 0.04, 0.34],
    colorB: [0.02, 0.5, 0.62],
    accent: [1, 0.5, 0.24]
  },
  editorial: {
    colorA: [0.02, 0.18, 0.28],
    colorB: [0.34, 0.08, 0.22],
    accent: [0.94, 0.7, 0.38]
  }
};

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform vec3 u_color_a;
  uniform vec3 u_color_b;
  uniform vec3 u_accent;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(13.7, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    vec2 pointer = (u_pointer - 0.5) * aspect;
    float t = u_time * 0.12;

    float field = fbm(p * 2.4 + vec2(t, -t * 0.7));
    float ribbons = sin((p.x + field * 0.34) * 10.0 - t * 5.0) * 0.5 + 0.5;
    float distanceToPointer = length(p - pointer * 0.42);
    float halo = smoothstep(0.58, 0.02, distanceToPointer);
    float ringDistance = abs(distanceToPointer - (0.2 + sin(t * 2.0) * 0.025));
    float ring = smoothstep(0.024, 0.002, ringDistance);
    float grain = noise(gl_FragCoord.xy * 0.32 + u_time) - 0.5;

    vec3 color = mix(u_color_a, u_color_b, smoothstep(0.12, 0.9, field + uv.x * 0.18));
    color = mix(color, u_accent, ring * 0.42 + halo * ribbons * 0.18);
    color += grain * 0.035;

    float alpha = clamp(field * 0.18 + halo * 0.16 + ring * 0.2, 0.02, 0.38);
    gl_FragColor = vec4(color, alpha);
  }
`;

export function WebGLAtmosphere({ variant, className = "" }: { variant: AtmosphereVariant; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 767px)").matches;

    if (!canvasElement || reduceMotion || compactViewport || navigator.hardwareConcurrency <= 2) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasElement;

    const maybeGl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: true
    });

    if (!maybeGl) {
      return;
    }
    const gl: WebGLRenderingContext = maybeGl;

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) {
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const buffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const colorALocation = gl.getUniformLocation(program, "u_color_a");
    const colorBLocation = gl.getUniformLocation(program, "u_color_b");
    const accentLocation = gl.getUniformLocation(program, "u_accent");
    const palette = palettes[variant];
    let animationFrame = 0;
    let isVisible = false;
    let pointerX = 0.5;
    let pointerY = 0.5;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform3fv(colorALocation, palette.colorA);
    gl.uniform3fv(colorBLocation, palette.colorB);
    gl.uniform3fv(accentLocation, palette.accent);

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    function render(time: number) {
      if (!isVisible || document.hidden) {
        animationFrame = 0;
        return;
      }

      resizeCanvas();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(pointerLocation, pointerX, 1 - pointerY);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = window.requestAnimationFrame(render);
    }

    function startRendering() {
      if (isVisible && !document.hidden && !animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX += (event.clientX / window.innerWidth - pointerX) * 0.18;
      pointerY += (event.clientY / window.innerHeight - pointerY) * 0.18;
    }

    function handleVisibilityChange() {
      if (document.hidden && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        startRendering();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      startRendering();
    }, { rootMargin: "180px" });

    observer.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
