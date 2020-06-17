import * as THREE from 'three';

export default {
  cameraHelper(camera: THREE.Camera, scene: THREE.Scene) {
    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);
  },
  axesHelper(scene: THREE.Scene) {
    // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    const helper = new THREE.AxesHelper(500);
    scene.add(helper);
  },
  gridHelper(scene: THREE.Scene) {
    const gridHelper = new THREE.GridHelper(100, 30, 0x2C2C2C, 0x888888);
    scene.add(gridHelper);
  },
};
