/* Variávei globais */

let {mat4, vec4, vec3, vec2} = glMatrix;

const SPEED = 0.1;

const COS_45 = Math.cos(Math.PI * 0.25);

let ku = 0, 
    kd = 0, 
    kl = 0, 
    kr = 0,
    pos = [0,0,0];

let frame = 0,
    canvas,
    gl,
    vertexShaderSource,
    fragmentShaderSource,
    vertexShader,
    fragmentShader,
    shaderProgram,
    data,
    positionAttr,
    positionBuffer,
    width,
    height,
    projectionUniform,
    projection,
    loc = [0, 0, 0],
    modelUniform,
    model,
    model2,
    viewUniform,
    view,
    eye = [0, 0, 0],
    colorUniform,
    color1 = [1, 0, 0],
    color2 = [0, 0, 1],
    color3 = [0, .7, 0],
    color4 = [1, 0, 1],
    color5 = [1, .6, 0],
    color6 = [0, 1, 1];

function resize() {
    if (!gl) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    gl.viewport(0, 0, width, height);
    let aspect = width / height;
    let near = 0.001;
    let far = 1000;
    let fovy = 1.3;
    projectionUniform = gl.getUniformLocation(shaderProgram, "projection");
    projection = mat4.perspective([], fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectionUniform, false, projection);
}


function getCanvas() {
    return document.querySelector("canvas");
}

function getGLContext(canvas) {
    let gl = canvas.getContext("webgl");
    gl.enable(gl.DEPTH_TEST);
    return gl;
}

function compileShader(source, type, gl) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.error("ERRO NA COMPILAÇÃO", gl.getShaderInfoLog(shader));
    return shader;
}

function linkProgram(vertexShader, fragmentShader, gl) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.error("ERRO NA LINKAGEM");
    return program;
}

function getData() {
    let p = {
        a: [-1, 1, -1],
        b: [-1, -1, -1],
        c: [1, 1, -1],
        d: [1, -1, -1],
        e: [-1, 1, 1],
        f: [1, 1, 1],
        g: [-1, -1, 1],
        h: [1, -1, 1]
    };

    let faces = [
        // FRENTE
        ...p.a, ...p.b, ...p.c,
        ...p.d, ...p.c, ...p.b,

        // TOPO
        ...p.e, ...p.a, ...p.f,
        ...p.c, ...p.f, ...p.a,

        // BAIXO
        ...p.b, ...p.g, ...p.d,
        ...p.h, ...p.d, ...p.g,

        // ESQUERDA
        ...p.e, ...p.g, ...p.a,
        ...p.b, ...p.a, ...p.g,

        // DIREITA
        ...p.c, ...p.d, ...p.f,
        ...p.h, ...p.f, ...p.d,

        //FUNDO
        ...p.f, ...p.h, ...p.e,
        ...p.g, ...p.e, ...p.h
    ];

    return { "points": new Float32Array(faces)};
}

async function main() {
    // 1 - Carregar tela de desenho
    canvas = getCanvas();

    // 2 - Carregar o contexto (API) WebGL
    gl = getGLContext(canvas);

    // 3 - Ler os arquivos de shader
    vertexShaderSource = await fetch("vertex.glsl").then(r => r.text());
    console.log("VERTEX", vertexShaderSource);

    fragmentShaderSource = await fetch("fragment.glsl").then(r => r.text());
    console.log("FRAGMENT", fragmentShaderSource);

    // 4 - Compilar arquivos de shader
    vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER, gl);
    fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, gl);

    // 5 - Linkar o programa de shader
    shaderProgram = linkProgram(vertexShader, fragmentShader, gl);
    gl.useProgram(shaderProgram);

    // 6 - Criar dados de parâmetro
    data = getData();

    // 7 - Transferir os dados para GPU
    positionAttr = gl.getAttribLocation(shaderProgram, "position");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 0, 0);

    // 7.1 - PROJECTION MATRIX UNIFORM
    resize();
    window.addEventListener("resize", resize);

    // 7.2 - VIEW MATRIX UNIFORM
    eye  = [-5, 3, 0];
    let up = [0, 1, 0];
    let center = [0, 0, 0];
    view = mat4.lookAt([], eye, center, up);
    viewUniform = gl.getUniformLocation(shaderProgram, "view");
    gl.uniformMatrix4fv(viewUniform, false, view);

    // 7.3 - MODEL MATRIX UNIFORM
    model = mat4.create();
    modelUniform = gl.getUniformLocation(shaderProgram, "model");
    
    model2 = mat4.fromTranslation([], pos);


    // 7.4 - COLOR UNIFORM
    colorUniform = gl.getUniformLocation(shaderProgram, "color");
    //gl.uniform2f(locationUniform, loc[0], loc[1]);

    // 8 - Chamar o loop de redesenho
    render();

}

function render() {
    frame ++;

    let time = frame / 100;

    let hor = (kl + kr) * SPEED;
    let ver = (ku + kd) * SPEED;

    if(hor !== 0 && ver !== 0) {
        hor *= COS_45;
        ver *= COS_45;
    }

    pos[0] += hor;
    pos[1] += ver;

    model2 = mat4.fromTranslation([], pos);


    eye  = [Math.sin(time) * 5, 3, Math.cos(time) * 5];
    let up = [0, 1, 0];
    let center = [0, 0, 0];
    view = mat4.lookAt([], eye, center, up);
    gl.uniformMatrix4fv(viewUniform, false, view);


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.POINTS
    // gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP
    // gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN 
    //gl.drawArrays(gl.TRIANGLES, 0, data.points.length / 2);
    
    // CUBO 01
    gl.uniformMatrix4fv(modelUniform, false, model);
    gl.uniform3f(colorUniform, color1[0], color1[1], color1[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // CUBO 02
    gl.uniformMatrix4fv(modelUniform, false, model2);
    gl.uniform3f(colorUniform, color2[0], color2[1], color2[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
    
    window.requestAnimationFrame(render);
}

function follow(evt) {
    let locX = evt.x / window.innerWidth * 2 - 1;
    let locY = evt.y / window.innerHeight * -2 + 1;
    loc = [locX, locY];
}

function keyUp(evt){
    if(evt.key === "ArrowDown") return kd = 0;
    if(evt.key === "ArrowUp") return ku = 0;
    if(evt.key === "ArrowLeft") return kl = 0;
    if(evt.key === "ArrowRight") return kr = 0;
}

function keyDown(evt){
    if(evt.key === "ArrowDown") return kd = -1;
    if(evt.key === "ArrowUp") return ku = 1;
    if(evt.key === "ArrowLeft") return kl = -1;
    if(evt.key === "ArrowRight") return kr = 1;
}


// keypress, keydown, keyup
window.addEventListener("load", main);

window.addEventListener("mousemove", follow);

window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);