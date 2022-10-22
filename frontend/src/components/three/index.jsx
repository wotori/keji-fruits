import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export function Three(props) {
  console.log("Render model:", props.obj);
  let gltf = useLoader(GLTFLoader, `${props.obj}.glb`);
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight />

        <Suspense fallback={null}>
          <primitive object={gltf.scene} />
        </Suspense>

        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </>
  );
}
