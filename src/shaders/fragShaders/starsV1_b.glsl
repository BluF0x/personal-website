/*
* The star shader uses the Voronoi texture to create the star shapes
*/
#define PI 3.14159265358979323846


varying vec3 vPosition;
varying vec2 v_uv;

uniform vec2 uResolution;
// uniform float uScale;
uniform float uTime;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),
    dot(p,vec2(269.5,183.3))))
    *43758.5453);
}

void main() {
    float uScale = 30.0;
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    st.x *= uResolution.x/uResolution.y;
    vec3 color = vec3(.0);

    vec3 color1 = vec3(0.3176, 0.1765, 0.9569);
    vec3 color2 = vec3(0.0667, 0.0431, 0.3255);

    vec3 background = mix(color2, color1, v_uv.y);


    // Scale
    st *= uScale;

    // Tile the space
    vec2 i_st = floor(st);
    st = fract(st);

    float angle =PI*0.25;

    // st -= 0.1;
    // st =  mat2(cos(angle),-sin(angle),
    //         sin(angle),cos(angle)) * st;

    // st += .2;

    float m_dist = 1.;  // minimum distance

    float expoent = 0.3;

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random2(i_st + neighbor);

            float timer = uTime / 30.;
            point = 0.5 + 0.5*sin(timer+ 5.2831*point);

			// Vector between the pixel and the point
            vec2 diff = neighbor + point - st;

            // diff += 1.9;

            // Minkowski distance. Gives the star effect
            float dist = pow(sqrt(pow(abs(diff.x), expoent) + pow(abs(diff.y), expoent)), 1./ expoent);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // st *= 100.;

    // Draw the min distance (distance field)
    color += m_dist;

    color = 1. - color;

    vec3 test = vec3(uTime);
    color = max(background, color);

    // Draw cell center
    // color += 1.-step(.02, m_dist);

    // Draw grid
    // color.r += step(.98, st.x) + step(.98, st.y);

    // Show isolines
    // color -= step(.7,abs(sin(27.0*m_dist)))*.5;

    

    gl_FragColor = vec4(color,1.0);


}