import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'
import FlyLine from './FlyLine'
import FlyLineShader from './FlyLineShader'
import MeshLine from './MeshLine'
import LightWall from './LightWall'
import LightRadar from './LightRadar'

export default function craeteCity() {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('./model/city.glb', (gltf) => {
    gltf.scene.traverse((item) => {
      if (item.type == 'Mesh') {
        // 对城市的金属材质进行修改
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33)
        })
        item.material = cityMaterial
        modifyCityMaterial(item)
        if (item.name == 'Layerbuildings') {
          const meshLine = new MeshLine(item.geometry)
          const size = item.scale.x
          meshLine.mesh.scale.set(size, size, size)
          scene.add(meshLine.mesh)
        }
      }
    })
    // 添加特效
    scene.add(gltf.scene)
    // 添加飞线
    const flyLine = new FlyLine()
    scene.add(flyLine.mesh)

    // 添加着色器飞线
    const flyLineShader = new FlyLineShader()
    scene.add(flyLineShader.mesh)

    // 添加光强
    const ligthWall = new LightWall()
    scene.add(ligthWall.mesh)

    // 添加雷达
    const lightRadar = new LightRadar()
    scene.add(lightRadar.mesh)
  })
}
