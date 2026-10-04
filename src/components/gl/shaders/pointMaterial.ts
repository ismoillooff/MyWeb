import * as THREE from 'three'
import { periodicNoiseGLSL } from './utils'

// Static grid of particle home positions, sampled once per vertex.
// The noise displacement is stateless, so it is computed directly in the
// vertex shader — no FBO simulation pass is needed.
function createPositionsTexture(size: number, scale: number) {
  const data = new Float32Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    const i4 = i * 4
    const x = (i % size) / (size - 1)
    const z = Math.floor(i / size) / (size - 1)
    data[i4 + 0] = (x - 0.5) * 2 * scale
    data[i4 + 1] = 0
    data[i4 + 2] = (z - 0.5) * 2 * scale
    data[i4 + 3] = 1
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType)
  texture.needsUpdate = true
  return texture
}

export class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor(size = 256, planeScale = 1.0) {
    super({
      vertexShader: /* glsl */ `
      uniform sampler2D positions;
      uniform float uTime;
      uniform float uNoiseScale;
      uniform float uNoiseIntensity;
      uniform float uTimeScale;
      uniform float uLoopPeriod;
      uniform float uFocus;
      uniform float uBlur;
      uniform float uPointSize;
      uniform float uOpacity;
      uniform float uRevealFactor;
      uniform float uRevealProgress;
      uniform float uTransition;
      varying float vAlpha;

      ${periodicNoiseGLSL}

      // Sparkle noise function for subtle brightness variations
      float sparkleNoise(vec3 seed, float time) {
        float hash = sin(seed.x * 127.1 + seed.y * 311.7 + seed.z * 74.7) * 43758.5453;
        hash = fract(hash);
        float slowTime = time * 1.0;
        float sparkle = 0.0;
        sparkle += sin(slowTime + hash * 6.28318) * 0.5;
        sparkle += sin(slowTime * 1.7 + hash * 12.56636) * 0.3;
        sparkle += sin(slowTime * 0.8 + hash * 18.84954) * 0.2;
        float hash2 = sin(seed.x * 113.5 + seed.y * 271.9 + seed.z * 97.3) * 37849.3241;
        hash2 = fract(hash2);
        float sparkleMask = sin(hash2 * 6.28318) * 0.7;
        sparkleMask += sin(hash2 * 12.56636) * 0.3;
        if (sparkleMask < 0.3) {
          sparkle *= 0.05;
        }
        float normalizedSparkle = (sparkle + 1.0) * 0.5;
        float smoothCurve = pow(normalizedSparkle, 4.0);
        float blendFactor = normalizedSparkle * normalizedSparkle;
        float finalBrightness = mix(normalizedSparkle, smoothCurve, blendFactor);
        return 0.7 + finalBrightness * 1.3;
      }

      void main() {
        vec3 originalPos = texture2D(positions, position.xy).xyz;

        // Periodic displacement (previously the FBO simulation pass)
        float continuousTime = uTime * uTimeScale * (6.28318530718 / uLoopPeriod);
        vec3 noiseInput = originalPos * uNoiseScale;
        vec3 distortion = vec3(
          periodicNoise(noiseInput, continuousTime),
          periodicNoise(noiseInput + vec3(50.0, 0.0, 0.0), continuousTime + 2.094),
          periodicNoise(noiseInput + vec3(0.0, 50.0, 0.0), continuousTime + 4.188)
        ) * uNoiseIntensity;
        float waveA = sin(originalPos.x * 1.28 + continuousTime * 0.32);
        float waveB = cos(originalPos.z * 1.72 - continuousTime * 0.24);
        float waveC = sin((originalPos.x + originalPos.z) * 0.72 + continuousTime * 0.18);
        float waveD = cos((originalPos.x - originalPos.z) * 1.08 - continuousTime * 0.16);
        float terrainWave = waveA * 0.46 + waveB * 0.34 + waveC * 0.28 + waveD * 0.18;

        vec3 pos = originalPos;
        pos.x += distortion.x * 0.22;
        pos.z += distortion.z * 0.22;
        pos.y += terrainWave * 0.88 + distortion.y * 0.28;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float dist = abs(uFocus - -mvPosition.z);
        gl_PointSize = clamp(dist * uBlur * uPointSize, 2.2, 8.4);

        // Reveal mask + sparkle + DOF fade — constant across each point,
        // so computed per-vertex instead of per-fragment
        float distanceFromCenter = length(pos.xz);
        float noiseValue = periodicNoise(originalPos * 4.0, 0.0);
        float revealThreshold = uRevealFactor + noiseValue * 0.3;
        float revealMask = 1.0 - smoothstep(revealThreshold - 0.2, revealThreshold + 0.1, distanceFromCenter);
        float sparkleBrightness = mix(0.84, sparkleNoise(originalPos, uTime), 0.28);
        vec2 ndc = gl_Position.xy / gl_Position.w;
        float heroTextClearance = smoothstep(0.16, 0.62, length(ndc / vec2(0.88, 0.58)));
        float centerFade = mix(0.56, 1.0, heroTextClearance);
        float depthFade = 1.0 - smoothstep(1.2, 4.8, dist);
        float ridgeLight = smoothstep(-0.24, 0.72, terrainWave);
        float screenFalloff = smoothstep(-1.05, -0.18, ndc.y) * (1.0 - smoothstep(1.05, 1.55, ndc.y));
        float alpha = depthFade * screenFalloff * uOpacity * revealMask * uRevealProgress * sparkleBrightness * centerFade * mix(0.42, 1.0, ridgeLight);
        vAlpha = mix(alpha, sparkleBrightness - 1.1, uTransition);
      }`,
      fragmentShader: /* glsl */ `
      varying float vAlpha;

      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        float circle = 1.0 - smoothstep(0.42, 0.58, dot(cxy, cxy));
        if (circle < 0.01) discard;
        gl_FragColor = vec4(vec3(1.0), vAlpha * circle);
      }`,
      uniforms: {
        positions: { value: createPositionsTexture(size, planeScale) },
        uTime: { value: 0 },
        uNoiseScale: { value: 1.0 },
        uNoiseIntensity: { value: 0.5 },
        uTimeScale: { value: 1.0 },
        uLoopPeriod: { value: 24.0 },
        uFocus: { value: 5.1 },
        uBlur: { value: 30 },
        uPointSize: { value: 2.0 },
        uOpacity: { value: 1.0 },
        uRevealFactor: { value: 0.0 },
        uRevealProgress: { value: 0.0 },
        uTransition: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })
  }
}
