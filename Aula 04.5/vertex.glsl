precision highp float;

attribute vec2 position;

varying vec2 vertexPos;

uniform float aspect;

void main() {
    vertexPos = position;
    gl_Position = vec4(position.x / aspect, position.y, 0.0, 1.0);
}