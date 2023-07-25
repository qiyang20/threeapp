import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from './camera'
import renderer from './renderer'
// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true
export default controls
