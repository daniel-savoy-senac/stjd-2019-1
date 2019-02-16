function pintar(hue=60){
    document.body.style.background = `hsl(${hue}deg,100%,50%)`;
}

function calcularCor(event){
    let x = event.x;
    let y = event.y;

    let w = window.innerWidth;
    let h = window.innerHeight;

    console.log("POS",event.x," :: ", event.y);
    
    let cor = event.x; //Math.random()*360;
    
    pintar(cor);
}

window.addEventListener("mousemove", calcularCor);
