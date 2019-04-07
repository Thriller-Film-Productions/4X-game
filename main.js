// Canvas setup
const c = document.querySelector("canvas"); // get the only canvas element
const draw = c.getContext('2d'); // get canvas context
c.width = document.body.clientWidth; // make canvas full screen
c.height = document.body.clientHeight;
// add an off screen canvas for image rotation and such
const osC = document.createElement('canvas');
osC.width = document.body.clientWidth;
osC.height = document.body.clientWidth;
osC.style.position = "absolute";
osC.id = 'off-screen-canvas';
osC.hidden = false;
const osDraw = osC.getContext('2d');
document.body.appendChild(osC);
// define global variables and run setup
let map = new Mapper(10, 10); // testing
osDraw.save()
osDraw.translate(c.width/2,0);
osDraw.rotate(Math.PI/4); //rotate 45 degrees
osDraw.transform(1,-0.35,-0.35,1,0,0); //skew
map.draw(osDraw);


let assets = [];
let keys = [];
setup();

async function setup() {
    window.addEventListener('keydown', e => {
        keys[e.keyCode] = true;
        checkCombinations();
    }, false);
    window.addEventListener('keyup', e => {
        keys[e.keyCode] = false;
        checkCombinations();
    }, false);

    // load img assets into array in background
    window.addEventListener('load',()=>{
        setupAssets();
    });
    window.addEventListener('resize',(ev)=>{

    });
    drawLoop()
}

function setupAssets() {
    let imgdiv = document.getElementById('loaded-images');
    for (let i = 0; i < imgdiv.childElementCount; i++) {
        assets.push({name:imgdiv.children[i].name,img:imgdiv.children[i]})
    }
}

function drawLoop() {
    draw.clearRect(0,0,c.width,c.height);
    osDraw.clearRect(-osC.width,-osC.height,osC.width*10,osC.height*10);
    map.draw(osDraw);
    draw.drawImage(osC,0,0);
    // draw.fillStyle = "rgb(0, 0, 0)";
    // draw.beginPath();
    // draw.arc(0, 0, 100, 0, Math.PI * 2);
    // draw.fill()
    (drawLoopy==true) ? requestAnimationFrame(drawLoop) : null;
}

function noLoop() {
    drawLoopy = false;
}

function checkCombinations() {
    // osDraw.clearRect(-Infinity,-Infinity,Infinity,Infinity);
    (keys[87]) ? osDraw.translate(-10,-10) : null;
    (keys[65]) ? osDraw.translate(-10,5) : null;
    (keys[83]) ? osDraw.translate(10,10) : null;
    (keys[68]) ? osDraw.translate(10,-5) : null;
}