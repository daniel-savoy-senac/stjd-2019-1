precision highp float;

varying vec4 vertexPos;

varying vec4 vertexNormal;

uniform vec3 color;

void main() {
    vec4 light = vec4(10.0, 10.0, 10.0, 1.0);
    vec4 L = normalize(light - vertexPos);
    vec4 N = normalize(vertexNormal);
    float Lambert = max(dot(L,N), 0.0);
    vec3 shade = color * Lambert; 
    gl_FragColor = vec4(shade, 1.0);
}