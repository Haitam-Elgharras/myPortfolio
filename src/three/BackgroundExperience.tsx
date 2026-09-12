import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import PathwayScene from "./PathwayScene";

const BackgroundExperience = () => {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        camera={{ position: [0, 0.6, 6], fov: 62, near: 0.1, far: 60 }}
      >
        <Suspense fallback={null}>
          <PathwayScene />
        </Suspense>

        <EffectComposer multisampling={4}>
          <Bloom
            mipmapBlur
            intensity={0.9}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.35}
            radius={0.75}
          />
          <Vignette offset={0.25} darkness={0.75} eskil={false} />
          <Noise opacity={0.035} premultiply blendFunction={BlendFunction.SCREEN} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default BackgroundExperience;
