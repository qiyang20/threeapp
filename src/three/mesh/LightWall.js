import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/lightWall/vertex.glsl'
import fragment from '@/shader/lightWall/fragment.glsl'
export default class LightWall {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true)
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 1, 0)
    // 获取高度差，最大值和最小值
    this.mesh.geometry.computeBoundingBox()
    // console.log(mesh.geometry.boundingBox)
    let { min, max } = this.mesh.geometry.boundingBox
    let uHeight = max.y - min.y
    this.material.uniforms.uHeight = {
      value: uHeight
    }
    // 光强的变化
    gsap.to(this.mesh.scale, {
      x: 2,
      z: 2,
      duration: 1,
      repeat: -1,
      yoyo: true
    })
  }
}
