attribute vec3 pointColor;
attribute float pointOpacity;
attribute float pointSize;

varying vec3 color;
varying float opacity;

void main() {
  color = pointColor;
  opacity = pointOpacity;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = pointSize * (333.0 / length(modelViewPosition.xyz));
  gl_Position = modelViewPosition * projectionMatrix;
}
