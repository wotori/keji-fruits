import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

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
