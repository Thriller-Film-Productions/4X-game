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
osDraw.transform(1, 0.35, 0.35, 1, 0, 0); //skew


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
        console.log(ev.clientX, ev.clientY)
        let t = translate((c.width / 2) - ev.clientX, (c.height / 2) - ev.clientY, -mapInfo.x + (osC.width / 2), -mapInfo.y + (osC.height / 2)); // Inverts translation
        console.log(t);
        osDraw.restore();
        osDraw.fillStyle = "black";
        osDraw.beginPath();
        osDraw.arc(t[0], t[1], 2500, 0, 2 * Math.PI);
        osDraw.fill();
        osDraw.closePath();
        let tr = shear(t[0], t[1]); // Inverts shearing/skewing
        console.log(tr);
        // osDraw2.fillStyle = "rgb(125,125,125)";
        // osDraw2.beginPath();
        // osDraw2.arc(tr[0], tr[1], 10000, 0, 2 * Math.PI);
        // osDraw2.fill();
        // osDraw2.closePath();
        let r = rotate(tr[0], tr[1], osC.width / 2, 0) // reverses rotation
        // r = translate(tr[0], tr[1], -osC2.width / 1, -osC2.height / 1)
        // r = tr
        console.log(r);
        osDraw2.fillStyle = "white";
        osDraw2.beginPath();
        osDraw2.arc(r[0], r[1], 1000, 0, 2 * Math.PI);
        osDraw2.fill();
        osDraw2.closePath();
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

function shear(x, y) {
    return [x + (1 / -0.35) * y, x * (1 / -0.35) + y]
}

function rotate(x, y, xc, yc) {
    // let polar = [Math.atan2(y, x), Math.sqrt(x * x + y * y)]
    // polar[0] += r;
    // return [Math.cos(polar[0]) * polar[1], Math.sin(polar[0]) * polar[1]];
    return [(((x - xc) - (y - yc)) / Math.pow(2, 1 / 2)) + xc, (((x - xc) + (y - yc)) / Math.pow(2, 1 / 2)) + yc]
}

function translate(x1, y1, x2, y2) {
    return [x1 + x2, y1 + y2]
}