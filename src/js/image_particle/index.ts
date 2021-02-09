import * as THREE from 'three';
import { YRender } from '../../types';
import ImageLoader from './image_loader';
import Points from './points';
import CustomTexture from '../../lib/texture';

const elephant = require('../../static/test.jpg').default;
const vertexShader = require('./glsl/point.vs').default;
const fragmentShader = require('./glsl/point.fs').default;

export default class ImageParticleRender implements YRender {
  readonly canvas: HTMLCanvasElement;

  readonly renderer: THREE.WebGLRenderer;

  readonly scene: THREE.Scene;

  readonly camera: THREE.PerspectiveCamera;

  private points!: Points;

  constructor(id: string) {
    // eslint-disable-next-line no-undef
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: this.canvas,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('rgb(247, 234, 237)', 1.0);
  }

  async init(): Promise<void> {
    const WIDTH = 400;
    const HEIGHT = 400;
    const img = new ImageLoader(elephant, WIDTH, HEIGHT);
    // 处理图片数据
    const imageData = await img.load();
    // const positions = [90, 80, 70];
    const positions = ImageLoader.filterImageData(imageData, 3)
    const colors = new Float32Array(positions.length);
    for (let i = 0; i < positions.length / 3; i += 1) {
      const color = new THREE.Color(
        `hsl(${(positions[i * 3 + 2] + positions[i * 3 + 1] + WIDTH) / 5
        }, 60%, 80%)`,
      );
      color.toArray(colors, i * 3); // 顔色轉換為rgb
    }
    this.points = new Points({
      texture: CustomTexture.circularGradient(20),
      vertexShader,
      fragmentShader,
      positions: new Float32Array(positions),
      colors,
      opacities: new Float32Array(positions.length / 3).fill(1),
      sizes: new Float32Array(positions.length / 3).fill(800),
    });
    this.scene.add(this.points.pointObj);
    console.log(this.points.pointObj, this.scene);

    // const spotLight = new THREE.SpotLight(0xf7f7f7);
    // spotLight.position.set(50, 50, 50);
    // spotLight.castShadow = true;
    // this.scene.add(spotLight);

    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.set(30, 12, 12);

    // add the cube to the scene
    this.scene.add(cube);

    this.render();
  }

  render(): ImageParticleRender {
    const { camera, scene, renderer } = this;
    camera.position.set(1000, 0, 0);

    camera.lookAt(new THREE.Vector3());
    scene.add(new THREE.AxesHelper(5000));

    const renderInside = () => {
      renderer.render(scene, camera);
    };
    // camera.force.position.applyHook(0, 0.025);
    // camera.force.position.applyDrag(0.2);
    // camera.force.position.updateVelocity();
    // camera.updatePosition();
    const renderLoop = () => {
      renderInside();
      requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return this;
  }
}
