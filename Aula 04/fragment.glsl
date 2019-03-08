precision highp float;

varying vec2 vertexPos;

void main() {
    float c = (vertexPos.x + 1.0) / 2.0;
    gl_FragColor = vec4(c, 0.0, 0.0, 1.0);
}