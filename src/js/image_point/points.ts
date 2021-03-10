import * as THREE from 'three';
import Mover from './mover';
import util from '../../lib/util';

type PointParams = {
  positions: Float32Array;
  colors: Float32Array;
  opacities: Float32Array;
  sizes: Float32Array;
  vertexShader: string;
  fragmentShader: string;
  texture: THREE.Texture;
}

export default class Points extends Mover {
  readonly pointObj: THREE.Points;

  readonly material!: THREE.ShaderMaterial;

  readonly geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

  pointParams: PointParams;

  constructor(pointParams: PointParams) {
    super(pointParams.positions, 0.3, 0.35);
    this.pointParams = pointParams;
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: {value: pointParams.texture},
      },
      vertexShader: pointParams.vertexShader,
      fragmentShader: pointParams.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    // console.log(new THREE.BufferAttribute(pointParams.positions, 3))
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('pointColor', new THREE.BufferAttribute(pointParams.colors, 3));
    this.geometry.setAttribute('pointOpacity', new THREE.BufferAttribute(pointParams.opacities, 1));
    // 队列中与顶点相关的数据值的大小。
    // 举例，如果 attribute 存储的是三元组（例如顶点空间坐标、法向量或颜色值）则itemSize的值应该是3。
    this.geometry.setAttribute('pointSize', new THREE.BufferAttribute(pointParams.sizes, 1));
    this.pointObj = new THREE.Points(
      this.geometry,
      this.material,
    );
  }

  update() {
    this.updateMover((i) => {
      // eslint-disable-next-line no-mixed-operators
      this.pointParams.sizes[i] = Math.log(util.getRandomInt(1, 128)) / Math.log(128) * Math.sqrt(document.body.clientWidth);
    });
    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.pointSize as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.pointColor as THREE.BufferAttribute).needsUpdate = true;
  }
}
