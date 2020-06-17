import * as THREE from 'three';

export default {
  // 圆形渐变 半径
  circularGradient(radius: number): THREE.Texture {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(radius / 2, radius / 2, radius / 4, radius, radius, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, .25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 1)');
    ctx.fillStyle = grad;
    return new THREE.Texture(canvas);
  },
};
