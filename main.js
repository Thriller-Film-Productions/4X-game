// Canvas setup
const c = document.querySelector("canvas"); // get the only canvas element
const draw = c.getContext('2d'); // get canvas context
c.width = document.body.clientWidth; // make canvas full screen
c.height = document.body.clientHeight;
// add an off screen canvas for image rotation and such
const osC = document.createElement('canvas');
osC.hidden = true;
osC.id = "off-screen-canvas";
const osDraw = osC.getContext('2d');
osC.width = document.body.clientWidth;
osC.height = document.body.clientWidth;
document.body.appendChild(osC);
// define global variables and run setup
let map = new Mapper(10, 10); // testing
// osDraw.translate(osC.width/2,0);
// osDraw.rotate(Math.PI*1/6);
// osDraw.transform(1,1,0,0,0,0);
map.draw(osDraw);
draw.drawImage(osC,0,0);
let assets = [];
let assetsAmount = 2;
setup();

function setup() {
    // load img assets into array
    for(let i = 0;i<assetsAmount;i++) {
        
    }
}

function drawLoop() {
    draw.fillStyle = "rgb(0, 0, 0)"
    draw.beginPath();
    draw.arc(0, 0, 100, 0, Math.PI * 2);
    draw.fill()
    requestAnimationFrame(drawLoop);
}