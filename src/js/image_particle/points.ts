import * as THREE from 'three';

type PointParams = {
  positions: Float32Array;
  colors: Float32Array;
  opacities: Float32Array;
  sizes: Float32Array;
  vertexShader: string;
  fragmentShader: string;
  texture: THREE.Texture;
}

export default class Points {
  readonly pointObj: THREE.Points;

  readonly material!: THREE.ShaderMaterial;

  readonly geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

  constructor(pointParams: PointParams) {
    // this.material = new THREE.ShaderMaterial({
    //   uniforms: {
    //     pointTexture: { value: pointParams.texture },
    //   },
    //   vertexShader: pointParams.vertexShader,
    //   fragmentShader: pointParams.fragmentShader,
    //   transparent: true,
    //   depthWrite: false,
    //   blending: THREE.NormalBlending,
    // });
    this.geometry.setAttribute('position', new THREE.BufferAttribute(pointParams.positions, 3));
    this.geometry.setAttribute('pointSize', new THREE.BufferAttribute(pointParams.sizes, 1));
    this.geometry.setAttribute('pointColor', new THREE.BufferAttribute(pointParams.colors, 3));
    this.geometry.setAttribute('pointOpacity', new THREE.BufferAttribute(pointParams.opacities, 1));
    this.pointObj = new THREE.Points(
      this.geometry,
      new THREE.PointsMaterial({ color: 0xff0000 }),
    );
    console.log(pointParams);
  }
}
