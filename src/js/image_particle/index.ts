import * as THREE from 'three';
import {YRender} from '../../types';
import ImageLoader from './image_loader';
import Helper from '../../lib/helper';

const elephant = require('../../static/elephant.png').default;

export default class ImageParticleRender implements YRender {
  readonly canvas: HTMLCanvasElement;

  readonly renderer: THREE.WebGLRenderer;

  readonly scene: THREE.Scene;

  readonly camera: THREE.PerspectiveCamera;

  readonly WIDTH = 400;

  readonly HEIGHT = 400;

  constructor(id: string) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: this.canvas,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    Helper.cameraHelper(this.camera, this.scene);
    Helper.axesHelper(this.scene);
    // Helper.gridHelper(this.scene);
    this.camera.position.set(1, 1, 111);
    // this.camera.lookAt(new THREE.Vector3(0,0, 1))
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xb9d3ff, 1);
    this.renderer.render(this.scene, this.camera);
  }

  init(): ImageParticleRender {
    const img = new ImageLoader(elephant, this.WIDTH, this.HEIGHT, 3);
    const imgData = img.getImageData();
    console.log(imgData);
    return this;
  }
}
