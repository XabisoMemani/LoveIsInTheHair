import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform float u_mouseX;
uniform float u_mouseY;
uniform vec2 u_resolution;
uniform float u_scale;

#define PI 3.14159265359

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec2 coverUvs(vec2 imageRes, vec2 containerRes, vec2 vUv) {
  float s = containerRes.x / containerRes.y;
  float i = imageRes.x / imageRes.y;
  vec2 new = vec2(i/s, 1.0);
  if (i > s) {
    new = vec2(1.0, s/i);
  }
  return vUv * new + (1.0 - new) * 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  uv = uv * aspect;

  float scale = u_scale;
  uv *= scale;

  vec2 mouse = vec2(u_mouseX, u_mouseY) * aspect;
  float mouseDistance = length(uv - mouse);

  vec2 displacedUv = uv;
  displacedUv.x += snoise(vec3(uv * 0.5 + vec2(u_time * 0.05, 0.0), u_time * 0.02)) * (0.1 + 0.4 * exp(-mouseDistance * 3.0));
  displacedUv.y += snoise(vec3(uv * 0.5 + vec2(0.0, u_time * 0.05), u_time * 0.02 + 100.0)) * (0.1 + 0.4 * exp(-mouseDistance * 3.0));

  vec2 flowDirection = vec2(
    snoise(vec3(displacedUv * 0.3, u_time * 0.05 + 200.0)),
    snoise(vec3(displacedUv * 0.3, u_time * 0.05 + 300.0))
  ) * 0.3;

  displacedUv += flowDirection;

  float noise1 = snoise(vec3(displacedUv * 1.0, u_time * 0.1)) * 0.5 + 0.5;
  float noise2 = snoise(vec3(displacedUv * 2.0 + vec2(50.0, 30.0), u_time * 0.15 + 10.0)) * 0.5 + 0.5;
  float noise3 = snoise(vec3(displacedUv * 4.0 + vec2(100.0, 70.0), u_time * 0.2 + 20.0)) * 0.5 + 0.5;

  float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

  displacedUv -= flowDirection * 2.0;
  vec2 rotatedUv = rotate2D(finalNoise * 2.0 * PI) * (displacedUv - vec2(0.5));
  rotatedUv += vec2(0.5);

  vec3 col1 = vec3(0.973, 0.686, 0.827);
  vec3 col2 = vec3(0.984, 0.980, 0.973);
  vec3 col3 = vec3(0.878, 0.333, 0.627);

  float colorMix = snoise(vec3(rotatedUv * 0.8, u_time * 0.1 + 400.0)) * 0.5 + 0.5;

  vec3 finalColor = mix(col1, col2, colorMix);
  finalColor = mix(finalColor, col3, noise2 * 0.4);
  finalColor += vec3(1.0) * pow(noise3, 4.0) * 0.15;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function spring({
  value,
  target,
  velocity,
  k,
  d,
}: {
  value: number
  target: number
  velocity: number
  k: number
  d: number
}) {
  const delta = target - value
  velocity += delta * k
  velocity *= d
  value += velocity
  return { value, velocity }
}

export default function FluidSilkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const uniforms = {
      u_time: { value: 0.0 },
      u_mouseX: { value: 0.5 },
      u_mouseY: { value: 0.5 },
      u_resolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      u_scale: { value: 1.0 },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let targetX = 0.5
    let targetY = 0.5
    const springValues = {
      x: { value: 0.5, velocity: 0 },
      y: { value: 0.5, velocity: 0 },
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth
      targetY = 1.0 - e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      renderer.setSize(w, h)
      uniforms.u_resolution.value.set(w, h)
    }

    window.addEventListener('resize', onResize)

    let isVisible = true
    let rafId: number

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(container)

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      if (!isVisible) return

      springValues.x = spring({ ...springValues.x, target: targetX, k: 0.02, d: 0.75 })
      springValues.y = spring({ ...springValues.y, target: targetY, k: 0.02, d: 0.75 })

      uniforms.u_time.value = performance.now() * 0.001
      uniforms.u_mouseX.value = springValues.x.value
      uniforms.u_mouseY.value = springValues.y.value

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-cursor="pointer"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
