import * as THREE from 'three';

export default class CustomTexture {
  static circularGradient(radius: number): THREE.Texture {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(radius / 2, radius / 2, radius / 4, radius, radius, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, .25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 1)');
    ctx.fillStyle = grad;
    const texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
  }
}
