import * as THREE from 'three';
import { YRender } from '../../types';

export default class ExampleRender {
  readonly canvas: HTMLCanvasElement;

  readonly renderer: THREE.WebGLRenderer;

  readonly scene: THREE.Scene;

  readonly camera: THREE.PerspectiveCamera;

  constructor(id: string) {
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
  }

  reReisize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(): void {
    // eslint-disable-next-line max-len
    // const renderBack = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
    // this.renderer.setRenderTarget(renderBack);
    this.renderer.render(this.scene, this.camera);
  }

  init(): ExampleRender {
    this.renderer.setClearColor(0xEEEEEE);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the ground plane
    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    this.scene.add(plane);

    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    this.scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    this.scene.add(sphere);

    // position and point the camera to the center of the scene
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    // add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);

    // add spotlight for the shadows
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
    return this;
  }
}
