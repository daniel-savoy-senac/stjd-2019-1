precision highp float;

varying vec2 vertexPos;

uniform vec3 color;

void main() {
    float c = (vertexPos.x + 1.0) / 2.0;
    vec3 shade = color * c; 
    gl_FragColor = vec4(shade, 1.0);
}