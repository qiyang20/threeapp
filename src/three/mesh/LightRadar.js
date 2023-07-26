import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/lightRadar/vertex.glsl'
import fragment from '@/shader/lightRadar/fragment.glsl'
export default class LightRadar {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(2, 2)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new THREE.Color('#ff0000')
        },
        uTime: {
          value: 0
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(-10, 1, 10)
    this.mesh.rotation.x = -Math.PI / 2
    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }
}
