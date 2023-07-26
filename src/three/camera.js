import * as THREE from 'three'
// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50000
)

// 设置相机位置
camera.position.set(5, 10, 15)

export default camera
