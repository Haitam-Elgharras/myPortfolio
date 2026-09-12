import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

type Shape = "ico" | "octa" | "dodeca" | "knot";

interface Props {
  position: [number, number, number];
  color?: string;
  spin?: number;
  shape?: Shape;
}

function CoreGeometry({ shape }: { shape: Shape }) {
  switch (shape) {
    case "octa":
      return <octahedronGeometry args={[0.82, 0]} />;
    case "dodeca":
      return <dodecahedronGeometry args={[0.72, 0]} />;
    case "knot":
      return <torusKnotGeometry args={[0.5, 0.17, 96, 14]} />;
    default:
      return <icosahedronGeometry args={[0.72, 0]} />;
  }
}

/**
 * A refractive glass crystal caged in a glowing wireframe icosahedron. Reveals
 * (scale 0→1) as the camera nears, recedes once passed. Float drives organic
 * drift/rotation; scale damped in useFrame (no React state).
 */
const PathNode = ({ position, color = "#f8a312", spin = 1, shape = "ico" }: Props) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const ahead = state.camera.position.z - position[2];
    const target = ahead < 13 && ahead > -4 ? 1 : 0;
    const s = THREE.MathUtils.damp(g.scale.x, target, 4, delta);
    g.scale.setScalar(s);
  });

  return (
    <Float
      position={position}
      speed={2.2}
      rotationIntensity={0.8 * spin}
      floatIntensity={1}
      floatingRange={[-0.16, 0.16]}
    >
      <group ref={group} scale={0}>
        <mesh>
          <icosahedronGeometry args={[1.12, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
        </mesh>
        <mesh>
          <CoreGeometry shape={shape} />
          <MeshTransmissionMaterial
            samples={3}
            resolution={160}
            transmission={1}
            thickness={1.1}
            roughness={0.08}
            ior={1.45}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.4}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color={color}
            attenuationColor={color}
            attenuationDistance={2}
          />
        </mesh>
        <pointLight color={color} intensity={5} distance={5.5} />
      </group>
    </Float>
  );
};

export default PathNode;
