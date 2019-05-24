let scene,
    camera,
    aspect,
    fovy,
    near,
    far,
    renderer,
    cube;


function main(){
    // 1 - Setup da Cena / Camera e Renderer
    setup();

    // 2.0 - Criar cubo
    cube = getCubeData();
    // 2.1 - Adicionar à cena
    scene.add( cube );

    // 3 - Posicionar câmera
    camera.position.z = 5;

    //4 - Inicia Loop de Redesenho
    animate();
}

function animate() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

function getCubeData(){
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    return cube;
}

function setup(){
    aspect = window.innerWidth / window.innerHeight;
    fovy = 75;
    near = 0.1;
    far = 1000;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fovy,aspect,near,far);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

main();