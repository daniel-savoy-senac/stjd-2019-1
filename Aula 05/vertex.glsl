precision highp float;

// Posição do Vértice
attribute vec3 position;

// Posição do Vértice em relação à Camera
varying vec4 vertexPos;

// fovy, aspect, near, far 
uniform mat4 projection;

// eye, up, certer/lookAt
uniform mat4 view;

// posição, rotação, escala do modelo (world)
uniform mat4 model;

void main() {
    vertexPos = view * model * vec4(position, 1.0);
    gl_Position = projection * vertexPos;
}