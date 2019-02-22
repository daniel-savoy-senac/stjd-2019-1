function pintar(hue=60, lum=50){
    document.body.style.background = `hsl(${hue}deg,100%,${lum}%)`;
}

function calcularCor(event){
    let x = event.x;
    let y = event.y;

    let w = window.innerWidth;
    let h = window.innerHeight;

    console.log("POS",event.x," :: ", event.y);
    
    let hue = x/w * 360;
    let lum = (1 - y/h) * 100;
    
    pintar(hue, lum);
}

window.addEventListener("mousemove", calcularCor);
