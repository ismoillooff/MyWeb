import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { CameraRig } from "./camera-rig";
import { useEffect, useState } from "react";

type Quality = {
  size: number;
  pointSize: number;
  aperture: number;
  opacity: number;
  dpr: number;
  reducedMotion: boolean;
  drift: boolean;
};

export const GL = ({ hovering }: { hovering: boolean }) => {
  const [quality, setQuality] = useState<Quality | null>(null);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fewer, slightly larger points on mobile — same fog, far less GPU work
    const drift = !isMobile && !reducedMotion;
    setQuality(
      isMobile
        ? { size: 176, pointSize: 8.2, aperture: 0.82, opacity: 0.88, dpr: 1, reducedMotion, drift }
        : { size: 284, pointSize: 8.6, aperture: 0.86, opacity: 0.92, dpr: 1.25, reducedMotion, drift }
    );
  }, []);

  // Reduced motion: let the reveal play once, then freeze the last frame
  useEffect(() => {
    if (!quality?.reducedMotion) return;
    const id = window.setTimeout(() => setFrozen(true), 4500);
    return () => window.clearTimeout(id);
  }, [quality]);

  if (!quality) return null;

  return (
    <div id="webgl" className="fixed inset-0 w-full h-screen bg-black">
      <Canvas
        dpr={[1, quality.dpr]}
        frameloop={frozen ? "never" : "always"}
        gl={{
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        <color attach="background" args={["#000"]} />
        <CameraRig enabled={quality.drift} />
        <group position={[0, -0.4, 0]}>
          <Particles
            speed={1.0}
            aperture={quality.aperture}
            focus={4.0}
            size={quality.size}
            noiseScale={0.44}
            noiseIntensity={0.74}
            timeScale={1}
            pointSize={quality.pointSize}
            opacity={quality.opacity}
            planeScale={11.4}
            introspect={hovering}
          />
        </group>
      </Canvas>
      {/* CSS vignette — replaces the fullscreen postprocessing pass for free */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 78% at 50% 52%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.28) 44%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.95) 100%), linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.48) 72%, rgba(0,0,0,0.92))",
        }}
      />
    </div>
  );
};
