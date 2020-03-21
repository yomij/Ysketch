import {YRender} from "../../types";
import * as THREE from "three";
import ImageLoader from "./image_loader";

const elephant = require('../../static/elephant.png').default;

export default class ImageParticleRender implements YRender {
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
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	init(): ImageParticleRender {
		const img = new ImageLoader(elephant, 400, 400)
		console.log(img)
		return this
	}
}

