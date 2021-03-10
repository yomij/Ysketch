// uniform变量是外部程序传递给（vertex和fragment）shader的变量
uniform sampler2D pointTexture;

varying vec3 color;
varying float opacity;

void main() {
  gl_FragColor = vec4(color, opacity) * texture2D(pointTexture, gl_PointCoord);
}
