/*
  attribute变量是只能在vertex shader中使用的变量。（它不能在fragment shader中声明attribute变量，也不能被fragment shader中使用）
  一般用attribute变量来表示一些顶点的数据，如：顶点坐标，法线，纹理坐标，顶点颜色等。
*/
attribute vec3 pointColor;
attribute float pointOpacity;
attribute float pointSize;

/*
  varying变量是vertex和fragment shader之间做数据传递用的。
  一般vertex shader修改varying变量的值，然后fragment shader使用该varying变量的值。
  因此varying变量在vertex和fragment shader二者之间的声明必须是一致的
*/
varying vec3 color;
varying float opacity;

void main() {
  color = pointColor;
  opacity = pointOpacity;
  // modelViewMatrix 模型矩阵
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  // gl_PointSize也是只能用在顶点语言中，顶点着色器用它来写入将要光栅化的点的尺寸，单位是像素
  gl_PointSize = pointSize * (300.0 / length(mvPosition.xyz));
  // projectionMatrix 投影矩阵
  gl_Position = projectionMatrix * mvPosition;
}
