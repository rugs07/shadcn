import React from "react";
import { OrbitControls } from "@react-three/drei";
import { BoxGeometry } from "three";

const ShaderExample = () => {
  return (
    <>
      <OrbitControls makeDefault />

      <mesh>
        <BoxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default ShaderExample;
