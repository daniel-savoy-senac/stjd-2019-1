precision highp float;

attribute vec2 position;

varying vec2 vertexPos;

float aspect = 800.0 / 600.0;

void main() {
    vertexPos = position;
    gl_Position = vec4(position.x / aspect, position.y, 0.0, 1.0);
}