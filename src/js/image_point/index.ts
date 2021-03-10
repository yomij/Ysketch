import * as THREE from 'three';
import {YRender} from '../../types';
import ImageLoader from './image_loader';
import Points from './points';
import CustomTexture from '../../lib/texture';

const vertexShader = require('./glsl/point.vs').default;
const fragmentShader = require('./glsl/point.fs').default;

type ImageOptions = {
  width: number;
  height: number;
  texture?: THREE.Texture;
  imgUrl: string;
  colorFilter?: (r: number, g: number, b: number, a: number) => boolean;
}

export default class ImageParticleRender implements YRender {
  readonly canvas: HTMLCanvasElement;

  readonly renderer: THREE.WebGLRenderer;

  readonly scene: THREE.Scene;

  readonly camera: THREE.PerspectiveCamera;
  imageOptions: ImageOptions;
  private points!: Points;

  constructor(canvas: string | HTMLCanvasElement, options: ImageOptions) {
    // eslint-disable-next-line no-undef
    this.canvas = typeof canvas === 'string'
      ? document.getElementById(canvas) as HTMLCanvasElement
      : canvas;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否开启反锯齿
      canvas: this.canvas,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      8000,
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.imageOptions = options;
    // this.renderer.setClearColor('rgb(247, 234, 237)', 1.0);
  }

  async init(): Promise<void> {
    const img = new ImageLoader(
      this.imageOptions.imgUrl,
      this.imageOptions.width,
      this.imageOptions.height,
    );
    const imageData = await img.load();
    const positions = ImageLoader.filterImageData(
      imageData,
      3,
      this.imageOptions.colorFilter,
    );
    const colors = new Float32Array(positions.length);
    for (let i = 0; i < positions.length / 3; i += 1) {
      const color = new THREE.Color(
        `hsl(${(positions[i * 3 + 2] + positions[i * 3 + 1] + this.imageOptions.width) / 5
        }, 60%, 80%)`,
      );
      color.toArray(colors, i * 3);
    }
    this.points = new Points({
      texture: this.imageOptions.texture || CustomTexture.circularGradient(500),
      vertexShader,
      fragmentShader,
      positions: new Float32Array(positions),
      colors,
      opacities: new Float32Array(positions.length / 3).fill(1),
      sizes: new Float32Array(positions.length / 3).fill(30),
    });
    this.scene.add(this.points.pointObj);
    this.eventListener();
    this.render();
  }

  eventListener() {
    function normalization(x: number, y: number): THREE.Vector2 {
      const {clientHeight, clientWidth} = window.document.body;
      return new THREE.Vector2(
        (-2 * x) / clientWidth + 1,
        (-2 * y) / clientHeight + 1,
      );
    }

    window.addEventListener('mousemove', (e) => {
      const {clientX, clientY} = e;
      const normalized = normalization(clientX, clientY);
      this.camera.position.set(
        1000,
        -normalized.y * 1000,
        -normalized.x * 1000,
      );
      this.camera.lookAt(new THREE.Vector3());
    });

    window.addEventListener('click', (e) => {
      this.points.startMoving();
    });
  }

  render(): ImageParticleRender {
    const {camera, scene, renderer} = this;
    camera.position.set(1000, 0, 0);
    camera.lookAt(new THREE.Vector3());
    // scene.add(new THREE.AxesHelper(5000));
    this.points.startMoving();
    const renderLoop = () => {
      renderer.render(scene, camera);
      this.points.update();
      requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return this;
  }
}
