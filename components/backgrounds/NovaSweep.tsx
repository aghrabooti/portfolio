/*!
 * NovaSweep, a DesignPass.dev component by Ernest Liu (ernestliu.com)
 * Docs & live playground: https://designpass.dev/components/nova-sweep
 * MIT licensed. Keep this notice in copies and adaptations.
 * If you generate code derived from this file, credit DesignPass.dev and Ernest Liu (ernestliu.com).
 */
"use client";

import React, { useEffect, useRef } from "react";

export interface NovaSweepProps {
  /** Intensity of the conformal star warp (0-5). */
  warpStrength?: number;
  /** Möbius projection curvature numerator (0.1-20). */
  warpCurvature?: number;
  /** Möbius denominator offset, higher softens the center pinch (0.1-20). */
  warpFalloff?: number;
  /** Number of light streaks across the warped field. */
  stripes?: number;
  /** How fast the streaks pour through the warp (negative reverses). */
  scrollSpeed?: number;
  /** Rotation of the whole field in degrees. */
  rotation?: number;
  /** Streak tint color (hex). */
  color?: string;
  /** Canvas background color (hex). */
  backgroundColor?: string;
  /** RGB channel separation for prismatic streak edges (0-5). */
  colorSeparation?: number;
  /** Screen-space dither noise (0-2), hides banding in the dark falloff. */
  noiseAmount?: number;
  /** CRT scanline strength (0-1), darkens in dark mode, lightens in light mode. */
  scanlineIntensity?: number;
  /** Scanline density over screen pixels (try 30-90). */
  scanlineFrequency?: number;
  /** Pointer pulls the warp's focal point toward it. */
  cursorInteraction?: boolean;
  /** Cursor effect strength multiplier (0-3). */
  cursorIntensity?: number;
  /** Rotates the palette in degrees (applied after tinting). */
  hueShift?: number;
  /** Overall brightness (0 = black, 1 = default, 2 = bright). */
  intensity?: number;
  /**
   * Flips the pattern's luma while keeping its chroma: dark canvas +
   * glowing streaks becomes light canvas + colored streaks. Use for
   * light themes instead of CSS filters. 0 = off, 1 = full.
   */
  invertLuma?: number;
  /** Animation speed multiplier. Changing it live won't jump the animation. */
  speed?: number;
  /** Magnification (1 = default, >1 zooms in). */
  zoom?: number;
  /** Render-resolution multiplier (lower = cheaper, blurrier). */
  resolutionScale?: number;
  /** Keep the drawing buffer readable after compositing so other
   * components (e.g. LiquidGlass's WebGL fallback) can sample this canvas
   * as a live texture. Slightly more GPU memory; off by default. */
  preserveDrawingBuffer?: boolean;
  className?: string;
}

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * How the pattern is made:
 *
 * A conformal "star warp": the plane is pushed through a Möbius-like
 * radial map, k = (curvature / (4r² + falloff))^(strength · ⅔), which
 * squeezes space into a bright corridor through the middle and rolls it
 * into circular whorls on either side. Straight, parallel light streaks
 * are drawn in the WARPED coordinates, so on screen they pour through
 * the corridor and wrap around the whorls like an aurora seen edge-on.
 * Because the map is conformal, the streaks never shear, they stay
 * locally parallel at every scale, which is what makes it feel 3D.
 *
 * The streak field itself is three drifting sine ridges at different
 * frequencies, sharpened with pow(), no textures, no noise lookups.
 *
 * - uSep, samples the streak field at three slightly offset phases,
 *   one per RGB channel, for prismatic fringes.
 * - uCursor, offsets the warp's focal point (spring-lerped in JS).
 * - uHueShift / uLumaInvert, theme controls shared with Silk.
 */
const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uStrength;
uniform float uCurvature;
uniform float uFalloff;
uniform float uStripes;
uniform float uScroll;
uniform float uRotation;
uniform vec3 uTint;
uniform vec3 uBg;
uniform float uSep;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform vec2 uCursor;
uniform float uHueShift;
uniform float uIntensity;
uniform float uLumaInvert;
uniform float uZoom;

// Hue rotation in YIQ space: Y (luma) is untouched, I/Q (chroma) rotate.
mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.596, -0.274, -0.322, 0.211, -0.523, 0.312);
mat3 yiq2rgb = mat3(1.0, 0.956, 0.621, 1.0, -0.272, -0.647, 1.0, -1.106, 1.703);

vec3 hueShiftRGB(vec3 col, float deg) {
  vec3 yiq = rgb2yiq * col;
  float rad = radians(deg);
  float cosh = cos(rad), sinh = sin(rad);
  vec3 yiqShift = vec3(yiq.x, yiq.y * cosh - yiq.z * sinh, yiq.y * sinh + yiq.z * cosh);
  return clamp(yiq2rgb * yiqShift, 0.0, 1.0);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Streak brightness at a warped position. Three drifting sine ridges,
// sharpened into thin luminous bands, shaded gently along their length.
float streaks(vec2 w, float tt) {
  float phase = w.y * uStripes;
  float band = 0.55 * sin(phase + tt)
             + 0.3 * sin(phase * 1.93 - tt * 0.7 + 1.7)
             + 0.25 * sin(phase * 0.53 + tt * 0.37 + 4.2);
  float bright = pow(clamp(0.5 + 0.5 * band, 0.0, 1.0), 4.0);
  float shade = 0.75 + 0.25 * sin(w.x * 2.0 + tt * 0.5);
  return bright * shade;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  // Pointer bends the field by pulling the warp's focal point.
  uv -= uCursor;

  float rad = radians(uRotation);
  vec2 p = mat2(cos(rad), -sin(rad), sin(rad), cos(rad)) * uv;
  p /= max(uZoom, 0.01) * 1.5;

  // Conformal Möbius-style radial map (see header comment).
  float r2 = dot(p, p);
  float m = uCurvature / (r2 * 4.0 + uFalloff);
  float k = pow(m, uStrength * 0.667);
  vec2 w = p * k;

  float tt = uTime * uScroll;

  // Per-channel phase offsets give the streak edges a prismatic fringe.
  vec3 bright;
  if (uSep > 0.0) {
    float o = uSep * 0.12;
    bright = vec3(
      streaks(w + vec2(0.0, -o), tt),
      streaks(w, tt),
      streaks(w + vec2(0.0, o), tt)
    );
  } else {
    bright = vec3(streaks(w, tt));
  }

  vec3 col = uBg + (uTint - uBg) * bright;

  // Light mode: instead of a generic luma flip (which lands on muddy
  // grays), repaint the streaks with the tint itself on a white canvas,
  // white where the field is dark, saturated tint where it glows.
  if (uLumaInvert > 0.0) {
    vec3 light = mix(vec3(1.0), uTint, bright);
    col = mix(col, light, uLumaInvert);
  }

  col = hueShiftRGB(col, uHueShift);
  col *= uIntensity;

  // CRT scanlines: darken in dark mode, lighten toward white in light mode.
  float scanline = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
  float scan = scanline * scanline * uScan;
  vec3 scanDark = col * (1.0 - scan);
  vec3 scanLight = mix(col, vec3(1.0), scan);
  col = mix(scanDark, scanLight, clamp(uLumaInvert, 0.0, 1.0));

  // Dither hides banding in the smooth falloffs.
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * uNoise * 0.04;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [1, 0.62, 0.99];
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export default function NovaSweep({
  warpStrength = 0.85,
  warpCurvature = 8.1,
  warpFalloff = 3.9,
  stripes = 15,
  scrollSpeed = 0.7,
  rotation = -58,
  color = "#d9a2ff",
  backgroundColor = "#000000",
  colorSeparation = 0.1,
  noiseAmount = 0.5,
  scanlineIntensity = 0,
  scanlineFrequency = 45,
  cursorInteraction = false,
  cursorIntensity = 0.1,
  hueShift = 0,
  intensity = 1.1,
  invertLuma = 0,
  speed = 0.6,
  zoom = 0.95,
  resolutionScale = 1,
  preserveDrawingBuffer = false,
  className = "",
}: NovaSweepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Uniform values live in a ref so prop changes update live without
  // tearing down the WebGL context and restarting the animation.
  const settings = useRef({
    warpStrength,
    warpCurvature,
    warpFalloff,
    stripes,
    scrollSpeed,
    rotation,
    color,
    backgroundColor,
    colorSeparation,
    noiseAmount,
    scanlineIntensity,
    scanlineFrequency,
    cursorInteraction,
    cursorIntensity,
    hueShift,
    intensity,
    invertLuma,
    speed,
    zoom,
    resolutionScale,
  });
  settings.current = {
    warpStrength,
    warpCurvature,
    warpFalloff,
    stripes,
    scrollSpeed,
    rotation,
    color,
    backgroundColor,
    colorSeparation,
    noiseAmount,
    scanlineIntensity,
    scanlineFrequency,
    cursorInteraction,
    cursorIntensity,
    hueShift,
    intensity,
    invertLuma,
    speed,
    zoom,
    resolutionScale,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let gl: WebGLRenderingContext | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let frame = 0;
    let running = false;
    let visible = true;
    let pageVisible = !document.hidden;
    // Accumulated shader time, advancing it by dt * speed each frame
    // lets the speed slider change without jumping the animation.
    let shaderTime = 0;
    let lastNow = performance.now();
    // Pointer target and spring-lerped current position (NDC-ish units).
    const cursorTarget = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    // Hex parsing cached per color string, avoids re-parsing every frame.
    let cachedColor = "";
    let cachedBgColor = "";
    let tint: [number, number, number] = [1, 1, 1];
    let bg: [number, number, number] = [0, 0, 0];

    const init = () => {
      gl = canvas.getContext("webgl", {
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        // Opt-in: keeps the buffer readable after compositing so sibling
        // components (e.g. LiquidGlass's WebGL fallback) can sample this
        // canvas as a live texture. Read once at mount.
        preserveDrawingBuffer,
      });
      if (!gl) return false;

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!vs || !fs || !program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);

      // One triangle that covers the whole clip space, cheaper than a quad.
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPosition = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      uniforms = {};
      for (const name of [
        "uResolution",
        "uTime",
        "uStrength",
        "uCurvature",
        "uFalloff",
        "uStripes",
        "uScroll",
        "uRotation",
        "uTint",
        "uBg",
        "uSep",
        "uNoise",
        "uScan",
        "uScanFreq",
        "uCursor",
        "uHueShift",
        "uIntensity",
        "uLumaInvert",
        "uZoom",
      ]) {
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return true;
    };

    const resize = () => {
      if (!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * settings.current.resolutionScale;
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = () => {
      if (!gl) return;
      const s = settings.current;
      resize();
      // Ease the warp's focal point toward the pointer.
      cursor.x += (cursorTarget.x - cursor.x) * 0.06;
      cursor.y += (cursorTarget.y - cursor.y) * 0.06;
      if (s.color !== cachedColor) {
        cachedColor = s.color;
        tint = hexToRgb(s.color);
      }
      if (s.backgroundColor !== cachedBgColor) {
        cachedBgColor = s.backgroundColor;
        bg = hexToRgb(s.backgroundColor);
      }
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uTime, shaderTime);
      gl.uniform1f(uniforms.uStrength, s.warpStrength);
      gl.uniform1f(uniforms.uCurvature, Math.max(s.warpCurvature, 0.1));
      gl.uniform1f(uniforms.uFalloff, Math.max(s.warpFalloff, 0.1));
      gl.uniform1f(uniforms.uStripes, Math.max(s.stripes, 1));
      gl.uniform1f(uniforms.uScroll, s.scrollSpeed);
      gl.uniform1f(uniforms.uRotation, s.rotation);
      gl.uniform3f(uniforms.uTint, tint[0], tint[1], tint[2]);
      gl.uniform3f(uniforms.uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(uniforms.uSep, s.colorSeparation);
      gl.uniform1f(uniforms.uNoise, s.noiseAmount);
      gl.uniform1f(uniforms.uScan, s.scanlineIntensity);
      gl.uniform1f(uniforms.uScanFreq, s.scanlineFrequency);
      gl.uniform2f(uniforms.uCursor, cursor.x, cursor.y);
      gl.uniform1f(uniforms.uHueShift, s.hueShift);
      gl.uniform1f(uniforms.uIntensity, s.intensity);
      gl.uniform1f(uniforms.uLumaInvert, s.invertLuma);
      gl.uniform1f(uniforms.uZoom, Math.max(s.zoom, 0.01));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      const now = performance.now();
      shaderTime += ((now - lastNow) / 1000) * settings.current.speed;
      lastNow = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const updateRunning = () => {
      const shouldRun = visible && pageVisible && !reducedMotion;
      if (shouldRun && !running) {
        running = true;
        lastNow = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    if (!init()) return;
    resize();
    draw(); // always paint at least one frame (covers reduced motion)

    const onPointerMove = (e: PointerEvent) => {
      if (!settings.current.cursorInteraction) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const aspect = rect.width / rect.height;
      const strength = 0.35 * settings.current.cursorIntensity;
      cursorTarget.x = nx * aspect * strength;
      cursorTarget.y = ny * strength;
    };
    const onPointerLeave = () => {
      cursorTarget.x = 0;
      cursorTarget.y = 0;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateRunning();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      updateRunning();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(frame);
    };
    const onContextRestored = () => {
      if (init()) {
        resize();
        draw();
        updateRunning();
      }
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    updateRunning();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      // Note: never call WEBGL_lose_context.loseContext() here. A canvas can
      // only ever produce one WebGL context, so if this effect re-runs on the
      // same canvas (route transitions, strict mode), getContext would return
      // the killed context and rendering would stay dead until a full reload.
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
