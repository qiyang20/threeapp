import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import scene from '../scene'

export default function craeteCity() {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('./model/city.glb', (gltf) => {
    // console.log(gltf)
    // 修改材质
    gltf.scene.traverse((item) => {
      // console.log(item)
      if (item.type == 'Mesh') {
        item.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x00ffff)
        })
      }
    })
    scene.add(gltf.scene)
  })
}
