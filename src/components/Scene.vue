<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { scene } from '@/three/index'
// console.log(scene)
// import scene from '@/three/scene'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'
// import * as dat from 'dat.gui'

// 场景元素div
let sceneDiv = ref(null)

// 创建gui对象
// const gui = new dat.GUI()
// 1、创建场景

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50
)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(20, 20),
//   new THREE.MeshBasicMaterial()
// )
// plane.position.set(0, 0, -6)
// plane.receiveShadow = true
// scene.add(plane)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement)
  animate()
})
// const clock = new THREE.Clock()
function animate() {
  controls.update()

  requestAnimationFrame(animate)
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera)
}
</script>

<style scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
