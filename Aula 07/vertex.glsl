precision highp float;

// Posição do Vértice
attribute vec3 position;

// Normal do Vértice
attribute vec3 normal;

// Posição do Vértice em relação à Camera
varying vec4 vertexPos;

// Posição da Normal
varying vec4 vertexNormal;

// fovy, aspect, near, far 
uniform mat4 projection;

// eye, up, certer/lookAt
uniform mat4 view;

// posição, rotação, escala do modelo (world)
uniform mat4 model;

void main() {
    vertexPos = view * model * vec4(position, 1.0);
    vertexNormal = view * model * vec4(normal, 0.0);
    gl_Position = projection * vertexPos;
}