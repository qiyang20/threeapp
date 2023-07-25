import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'

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
      }
    })
    scene.add(gltf.scene)
  })
}
