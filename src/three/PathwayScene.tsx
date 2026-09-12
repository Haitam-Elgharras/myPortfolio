import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Grid,
  Sparkles,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useScroll, useVelocity, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import PathNode from "./PathNode";

const ACCENT = "#f8a312";
const BG = "#0a0a0a";

const PATH_START = 6;
const PATH_END = -40;


const CameraRig = () => {
  const { scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollYProgress);
  const reduce = useReducedMotion();
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const p = scrollYProgress.get();
    const desiredZ = THREE.MathUtils.lerp(PATH_START, PATH_END, p);
    const v = Math.min(Math.abs(velocity.get()), 2.2);

    if (reduce) {
      cam.position.set(0, 0.6, desiredZ);
    } else {
      cam.position.z = THREE.MathUtils.damp(cam.position.z, desiredZ, 3, delta);
      const sway = Math.sin(cam.position.z * 0.08) * 1.1 + state.pointer.x * 0.9;
      cam.position.x = THREE.MathUtils.damp(cam.position.x, sway, 2.5, delta);
      cam.position.y = THREE.MathUtils.damp(
        cam.position.y,
        0.6 + state.pointer.y * 0.4,
        2.5,
        delta
      );
    }

    // warp: widen FOV with scroll speed
    const targetFov = 62 + v * 16;
    cam.fov = THREE.MathUtils.damp(cam.fov, targetFov, 4, delta);
    cam.updateProjectionMatrix();

    lookTarget.current.set(
      Math.sin((cam.position.z - 6) * 0.08) * 1.1,
      0.5,
      cam.position.z - 6
    );
    cam.lookAt(lookTarget.current);
    // roll into the motion
    if (!reduce) cam.rotateZ(Math.sin(state.clock.elapsedTime) * 0.01 + v * 0.05);
  });

  return null;
};

/** Wireframe wormhole enveloping the path (CatmullRom tube), slowly swirling. */
const TunnelTube = () => {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(1.6, 0.4, -6),
      new THREE.Vector3(-1.6, -0.3, -18),
      new THREE.Vector3(1.3, 0.3, -30),
      new THREE.Vector3(0, 0, -46),
    ]);
    return new THREE.TubeGeometry(curve, 140, 4, 22, false);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.06;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={[0, 1, -14]}>
      <meshBasicMaterial
        color={ACCENT}
        wireframe
        transparent
        opacity={0.16}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

const gridProps = {
  args: [26, 120] as [number, number],
  infiniteGrid: true,
  cellSize: 0.7,
  cellThickness: 0.6,
  cellColor: "#3a2a12",
  sectionSize: 3.5,
  sectionThickness: 1.3,
  sectionColor: ACCENT,
  fadeDistance: 36,
  fadeStrength: 2,
};

const PathwayScene = () => {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 13, 38]} />

      <ambientLight intensity={0.26} />
      <pointLight position={[0, 3, 3]} intensity={22} color={ACCENT} distance={26} />
      <pointLight position={[0, 2, -14]} intensity={16} color={ACCENT} distance={26} />

      <Environment resolution={256} frames={1} background={false}>
        <Lightformer form="rect" intensity={2.2} color={ACCENT} position={[0, 3, -6]} scale={[9, 3, 1]} />
        <Lightformer form="rect" intensity={1} color="#ffffff" position={[-5, 1, -12]} scale={[3, 4, 1]} />
        <Lightformer form="ring" intensity={1.6} color={ACCENT} position={[4, 2, -16]} scale={4} />
      </Environment>

      <TunnelTube />

      {/* reflective floor mirroring the neon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.44, -16]}>
        <planeGeometry args={[60, 130]} />
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={1}
          mixStrength={4}
          blur={[320, 80]}
          roughness={0.9}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#050505"
          metalness={0.6}
          mirror={0.55}
        />
      </mesh>

      {/* neon grid corridor (floor + ceiling) just above the reflector */}
      <Grid position={[0, -1.4, -12]} {...gridProps} />
      <Grid position={[0, 4.4, -12]} rotation={[Math.PI, 0, 0]} {...gridProps} />

      <Sparkles
        count={120}
        scale={[16, 7, 52]}
        position={[0, 1.5, -18]}
        size={2.6}
        speed={0.4}
        opacity={0.65}
        noise={1}
        color={ACCENT}
      />

      <PathNode position={[2.4, 0.5, -5]} shape="ico" spin={1} />
      <PathNode position={[-2.6, 0.8, -13]} shape="knot" spin={1.3} />
      <PathNode position={[2.1, 0.4, -21]} shape="octa" spin={0.9} />
      <PathNode position={[-2.3, 0.7, -29]} shape="dodeca" spin={1.1} />
      <PathNode position={[1.8, 0.5, -37]} shape="ico" spin={0.8} />

      <CameraRig />
    </>
  );
};

export default PathwayScene;
