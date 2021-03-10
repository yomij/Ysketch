import * as THREE from 'three';

export default class CustomTexture {
  static circularGradient(radius: number): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = radius * 2;
    canvas.height = radius * 2;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(radius, radius, radius / 4, radius, radius, radius);
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, .25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.arc(radius, radius, radius, 0, Math.PI / 180, true);
    ctx.fill();
    const texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
  }
}
