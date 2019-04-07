// Canvas setup
const c = document.querySelector("canvas"); // get the only canvas element
const draw = c.getContext('2d'); // get canvas context
c.width = document.body.clientWidth; // make canvas full screen
c.height = document.body.clientHeight;
// add an off screen canvas for image rotation and such
const osC = document.createElement('canvas');
osC.width = 15500;
osC.height = 7500;
osC.style.position = "absolute";
osC.id = 'off-screen-canvas';
osC.hidden = false;
const osDraw = osC.getContext('2d');
document.body.appendChild(osC);
const osC2 = document.createElement('canvas');
osC2.width = 8000;
osC2.height = 8000;
osC2.style.position = "absolute";
osC2.id = 'off-screen-canvas-2';
osC2.hidden = false;
const osDraw2 = osC2.getContext('2d');
document.body.appendChild(osC2);
let scale = 1;
// define global variables and run setup
let map; // testing
let mapInfo = {
    x: 0,
    y: 0,
    scale: 1
};
osDraw.save();
osDraw.translate(osC.width / 2, 0);
osDraw.rotate(Math.PI / 4); //rotate 45 degrees
osDraw.transform(1, -0.35, -0.35, 1, 0, 0); //skew
osDraw.save();

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
    c.addEventListener('mousedown', (ev) => {

    })
    // load img assets into array in background
    window.addEventListener('load', () => {
        setupAssets();
    });
    window.addEventListener('resize', (ev) => {
        c.width = document.body.clientWidth;
        c.height = document.body.clientHeight;
    });
    drawLoop();
}

function setupAssets() {
    let imgdiv = document.getElementById('loaded-images');
    for (let i = 0; i < imgdiv.childElementCount; i++) {
        assets.push({
            name: imgdiv.children[i].name,
            img: imgdiv.children[i]
        });
    }
    map = new Mapper(256, 256, [1.5, 1.3, 2, 1, 1]);
    map.draw(osDraw2);
    osDraw.drawImage(osC2, 0, 0);
    draw.translate(c.width / 2, c.height / 2);
    requestAnimationFrame(drawLoop)
}

function drawLoop() {
    draw.clearRect(-osC.width, -osC.height, osC.width * 10, osC.height * 10);
    draw.drawImage(osC, (-osC.width / 2) + mapInfo.x, (-osC.height / 2) + mapInfo.y);
    // draw.fillStyle = "rgb(0, 0, 0)";
    // draw.beginPath();
    // draw.arc(0, 0, 100, 0, Math.PI * 2);
    // draw.fill()
    (drawLoopy == true) ? requestAnimationFrame(drawLoop): null;
}

function noLoop() {
    drawLoopy = false;
}

function checkCombinations() {
    // osDraw.clearRect(-Infinity,-Infinity,Infinity,Infinity);
    (keys[87]) ? mapInfo.y += 10 * scale: null;
    (keys[65]) ? mapInfo.x += 10 * scale: null;
    (keys[83]) ? mapInfo.y += -10 * scale: null;
    (keys[68]) ? mapInfo.x += -10 * scale: null;
    if (keys[61] && scale > 0.5) {
        draw.scale(1.1, 1.1);
        scale /= 1.1;
    }
    if (keys[173] && scale < 13) {
        draw.scale(1 / 1.1, 1 / 1.1);
        scale /= 1 / 1.1;
    }
}