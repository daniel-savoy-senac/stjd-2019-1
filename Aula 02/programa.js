/* Variávei globais */

let canvas,
    gl,
    vertexShaderSource,
    fragmentShaderSource;

function getCanvas(){
    return document.querySelector("canvas");
}

function getGLContext(canvas) {
    let gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    return gl;
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
// 5 - Linkar o programa de shader
// 6 - Criar dados de parâmetro
// 7 - Transferir os dados para GPU
// 8 - Chamar o loop de redesenho

}

window.addEventListener("load", main);