import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { CameraRig } from "./camera-rig";
import { useEffect, useState } from "react";

type Quality = {
  size: number;
  pointSize: number;
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
        ? { size: 192, pointSize: 17, opacity: 1.0, dpr: 1.5, reducedMotion, drift }
        : { size: 320, pointSize: 13, opacity: 0.9, dpr: 1.75, reducedMotion, drift }
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
        <Particles
          speed={1.0}
          aperture={1.79}
          focus={3.8}
          size={quality.size}
          noiseScale={0.6}
          noiseIntensity={0.52}
          timeScale={1}
          pointSize={quality.pointSize}
          opacity={quality.opacity}
          planeScale={10.0}
          introspect={hovering}
        />
      </Canvas>
      {/* CSS vignette — replaces the fullscreen postprocessing pass for free */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 32%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </div>
  );
};
