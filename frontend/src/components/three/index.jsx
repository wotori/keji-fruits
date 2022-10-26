import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

export function Three(props) {
  const { obj } = props;
  let gltf = useLoader(GLTFLoader, `${obj}.glb`);
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight />

        {gltf && (
          <Suspense fallback={null}>
            <primitive object={gltf.scene} />
          </Suspense>
        )}

        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </>
  );
}
