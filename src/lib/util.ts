import {Vector3} from 'three';

export class PolarCoordinates {
  radius: number; // >= 0

  radZ: number; // 0 - 2Π

  radX: number; // 0 - 2Π

  constructor(radius: number, radZ: number, radX: number) {
    this.radius = radius;
    this.radZ = radZ;
    this.radX = radX;
  }

  static TO_CARTESIAN_COORDINATES(radius: number, radZ: number, radX: number): Vector3 {
    const x = radius * Math.sin(radZ) * Math.cos(radX);
    const y = radius * Math.sin(radZ) * Math.sin(radX);
    const z = radius * Math.cos(radZ);
    return new Vector3(x, y, z);
  }

  toVector3(): Vector3 {
    const {radius, radZ, radX} = this;
    return PolarCoordinates.TO_CARTESIAN_COORDINATES(radius, radZ, radX);
  }
}

export default {
  getRandomInt(min: number, max: number) { // 随机数
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRadian(degrees: number): number { // 角度 => 弧度
    return (degrees * Math.PI) / 180;
  },
  getDegree(radian: number): number { // 角度
    return (radian / Math.PI) * 180;
  },
};
