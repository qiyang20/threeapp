<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 导入gui对象
import gui from '@/three/gui'
// 导入场景
import scene from '@/three/scene'
// 导入相机
import camera from '@/three/camera'
// 导入辅助坐标轴
import axesHelper from '@/three/axeshelper'
// 导入渲染器
import renderer from '@/three/renderer'
// 初始化调整屏幕
import '@/three/init'
import animate from '@/three/animate'

// 场景元素div
let sceneDiv = ref(null)

// 使用gui对象
console.log(gui)
// 添加相机
scene.add(camera)
// 添加辅助坐标轴
scene.add(axesHelper)

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement)
  animate()
})
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
