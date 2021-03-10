import * as THREE from 'three';
import util, {PolarCoordinates} from '../../lib/util';

export default class Mover {
  // 当前位置 Float32Array
  positions: Float32Array;

  // 初始位置
  initPositions: Array<THREE.Vector3> = [];

  // 当前位置 Vector3
  positionVectors: Array<THREE.Vector3> = [];

  // 速度
  velocityVectors: Array<THREE.Vector3> = [];

  // 减速系数
  decelerationFactor: number;

  // 归位系数
  homingCoefficient: number;

  // 是否在移动中
  moving: Array<boolean> = [];

  constructor(
    positions: Float32Array,
    decelerationFactor = 0,
    homingCoefficient = 0,
  ) {
    this.positions = positions;
    this.decelerationFactor = decelerationFactor;
    this.homingCoefficient = homingCoefficient;
    // 初始化数据
    for (let i = 0; i < this.positions.length / 3; i += 1) {
      const p = new THREE.Vector3(
        this.positions[i * 3],
        this.positions[i * 3 + 1],
        this.positions[i * 3 + 2],
      );
      this.initPositions.push(p);
      this.positionVectors.push(p.clone());
      this.velocityVectors.push(new THREE.Vector3());
      this.moving[i] = true;
    }
  }

  get size() {
    return this.initPositions.length;
  }

  startMoving() {
    for (let i = 0; i < this.size; i += 1) {
      const radius = util.getRandomInt(20, 60);
      const radZ = util.getRadian(util.getRandomInt(0, 360));
      const radX = util.getRadian(util.getRandomInt(0, 360));
      const v3 = PolarCoordinates.TO_CARTESIAN_COORDINATES(radius, radZ, radX);
      // 初始速度
      this.velocityVectors[i].add(v3);
      // 标记为向外移动
      this.moving[i] = true;
    }
  }

  updateMover(cb?: ((i: number) => void)) {
    for (let i = 0; i < this.size; i += 1) {
      // 当向外移动速度小于1 开始回归
      if (this.velocityVectors[i].length() < 1) {
        this.moving[i] = false;
      }
      if (this.moving[i]) {
        this.decelerate(i, this.decelerationFactor / 10);
      } else {
        this.regress(i, this.homingCoefficient); // 归位
        this.decelerate(i, this.decelerationFactor);
      }
      // 更新标点位置
      this.updatePosition(i);
      // eslint-disable-next-line no-unused-expressions
      cb && cb(i);
    }
  }

  // 更新位置
  updatePosition(index = 0) {
    const p = this.positionVectors[index].add(this.velocityVectors[index]);
    this.positions[index * 3] = p.x;
    this.positions[index * 3 + 1] = p.y;
    this.positions[index * 3 + 2] = p.z;
  }

  // 减速
  decelerate(index = 0, coefficient = 0) {
    this.velocityVectors[index].multiplyScalar(1 - coefficient);
  }

  // 回归
  regress(index = 0, coefficient = 0) {
    const v = this.initPositions[index].clone().sub(this.positionVectors[index]);
    v.multiplyScalar(coefficient);
    this.velocityVectors[index].add(v);
  }
}
