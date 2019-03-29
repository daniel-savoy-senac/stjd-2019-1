precision highp float;

varying vec4 vertexPos;

uniform vec3 color;

void main() {
    vec4 light = vec4(0.0, 0.0, 0.0, 1.0);
    float c = distance(light, vertexPos) / 4.0;
    vec3 shade = color * c; 
    gl_FragColor = vec4(shade, 1.0);
}