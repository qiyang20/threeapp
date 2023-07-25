import * as THREE from 'three'
// 修改城市的材质
export default function modifyCityMaterial(mesh) {
  // 编译之前
  mesh.material.onBeforeCompile = (shader) => {
    console.log(shader.vertexShader)
    console.log(shader.fragmentShader)
    gradColor(shader, mesh)
  }
}

export function gradColor(shader, mesh) {
  // 获取高度差，最大值和最小值
  mesh.geometry.computeBoundingBox()
  console.log(mesh.geometry.boundingBox)
  let { min, max } = mesh.geometry.boundingBox
  let uHeight = max.y - min.y
  // 传颜色
  shader.uniforms.uTopColor = {
    value: new THREE.Color('#aaaeff')
  }
  // 传高度差
  shader.uniforms.uHeight = {
    value: uHeight
  }
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
      #include <common>
      varying vec3 vPosition;
    `
  )
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      #include <begin_vertex>
      vPosition = position;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `
      #include <dithering_fragment>
      vec4 distGradColor = gl_FragColor;
      // 设置混合的百分比
      float gradMix = (vPosition.y +uHeight /2.0) /uHeight;
      // 计算出混合颜色
      vec3 gradMinColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMinColor,1);
    `
  )
}
