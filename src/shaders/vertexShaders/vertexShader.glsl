varying vec3 vPosition;
varying vec2 v_uv;

void main() {
    vPosition = position;
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
