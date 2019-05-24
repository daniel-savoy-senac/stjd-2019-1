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

    // 3 - Criar luzes
    createLights();

    // 4 - Posicionar câmera
    camera.position.z = 5;
    camera.position.y = 3;
    camera.lookAt(0,0,0);

    //5 - Inicia Loop de Redesenho
    animate();
}

function animate() {
    cube.rotateY(Math.PI/30);
    cube.position.x += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

function createLights(){
    var ambient = new THREE.AmbientLight( 0x404040 );
    scene.add( ambient );

    var point = new THREE.PointLight( 0xffffff, 1, 100 );
    point.position.set( 50, 50, 50 );
    scene.add( point );
}

function getCubeData(){
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
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