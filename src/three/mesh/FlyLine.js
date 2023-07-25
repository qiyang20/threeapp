import * as THREE from 'three'
import gsap from 'gsap'

export default class FlyLine {
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(10, 0, 0)
    ]
    // 1/创建曲线
    // CatmullRomCurve3根据提供的点创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
    // 2/根据曲线生成管道几何体
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.4, 2, false)
    // 3/设置飞线材质
    // 创建纹理
    const textloader = new THREE.TextureLoader()
    this.texture = textloader.load('./textures/z_11.png')
    // 重复纹理 y重复 径向重复
    this.texture.repeat.set(1, 2)
    // 水平重复
    this.texture.wrapS = THREE.RepeatWrapping
    // 径向重复
    this.texture.wrapT = THREE.MirroredRepeatWrapping

    this.material = new THREE.MeshBasicMaterial({
      // color: 0xfff000,
      // 使用纹理
      map: this.texture,
      // 添加透明
      transparent: true
    })

    // 4/创建飞线物体
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    // 5/创建飞线的动画
    gsap.to(this.texture.offset, {
      x: -1,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }
}
