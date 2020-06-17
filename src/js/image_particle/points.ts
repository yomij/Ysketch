export default class Points {
  readonly DENSITY = 3;

  readonly imgData: ImageData;

  readonly vertices: number[];

  positions: Float32Array; // 坐标点数组 有值

  colors: Float32Array; //

  opacities: Float32Array;

  sizes: Float32Array;

  constructor(imgData: ImageData) {
    this.imgData = imgData;
    this.vertices = this.getVertices();
    this.positions = new Float32Array(this.vertices);
    this.colors = new Float32Array(this.vertices.length);
    this.opacities = new Float32Array(this.vertices.length / 3);
    this.sizes = new Float32Array(this.vertices.length / 3);
  }

  getVertices(): number[] {
    const points = [];
    const {data, width, height} = this.imgData;
    for (let x = 0; x < width / this.DENSITY; x += 1) {
      for (let y = 0; y < height / this.DENSITY; y += 1) {
        if (data[(x * this.DENSITY + y * width)] > 200) {
          points.push(0, width / 2 - x, height / 2 - y);
        }
      }
    }
    return points;
  }

}
