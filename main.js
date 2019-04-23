// define global variables and run setup
let scale = 1;
let map; // testing
let mapInfo = {
    x: 0,
    y: 0,
};

let assets = [];
let keys = [];

// Inputs
let mouseX = 0;
let mouseY = 0;

setup();

async function setup() {
    setInterval(() => {
        checkCombinations();
    }, 30);
    window.addEventListener('keydown', e => {
        keys[e.keyCode] = true;
    }, false);
    window.addEventListener('keyup', e => {
        keys[e.keyCode] = false;
    }, false);
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    c.addEventListener('mousedown', (ev) => {
        let t = translate((ev.clientX - (c.width / 2)) * scale, (ev.clientY - (c.height / 2)) * scale, -mapInfo.x, -mapInfo.y + (osC.height / 2)); // Inverts translation
        let matrixI = [
            [0.5237827897071838, 1.0878565311431885, -3998.033935546875],
            [-0.5237827897071838, 1.0878565311431885, 3998.033935546875],
            [0, 0, 1]
        ];
        let point = [0, 0, 1];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                point[i] += matrixI[i][j] * t[j];
            }
            if (i == 0) {
                point[i] += 4000;
            } else if (i == 1) {
                point[i] += -4000;
            }
        }
        let square = map.whichSquare(point[0], point[1], true);
        map.highlight(square[0], square[1]);
    });
    // load img assets into array in background
    window.addEventListener('load', () => {
        document.querySelector('#loading').style.opacity = 1;
        document.querySelector('#loading').style.transition = "opacity 1s ease-in-out";
        document.querySelector('#loading').style.opacity = 0;
        setTimeout(()=>{document.querySelector('#loading').style.display = "none";},6000);
        setupAssets();
        map = new Mapper(256, 256, [1.5, 1.3, 1.7, 0.5, 1]); // [grassland, forest, ocean, desert, mountains]
        drawMap();
        draw.translate(c.width / 2, c.height / 2);
        requestAnimationFrame(drawLoop);
    });
    window.addEventListener('resize', (ev) => {
        c.width = document.body.clientWidth;
        c.height = document.body.clientHeight;
        mapInfo.x = 0;
        mapInfo.y = 0;
        scale = 1;
        draw.restore();
        draw.translate(c.width / 2, c.height / 2);
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
}

function drawMap() {
    map.draw(osDraw2);
    redraw();
}

function redraw() {
    mixed2dDraw.drawImage(osC2, 0, 0);
    map.draw3d();
    // osDraw.clearRect(0,0,osC.width,osC.height); // this makes things HECKING SLOW by like 150ms on my comp
    osDraw.drawImage(mixed2dC, 0, 0);
    osDraw.drawImage(mixed3dC, 0, 0);
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
    (keys[87] && mapInfo.y < 5000) ? mapInfo.y += 10 * scale: null;
    (keys[65] && mapInfo.x < 9000) ? mapInfo.x += 10 * scale: null;
    (keys[83] && mapInfo.y < 5000) ? mapInfo.y += -10 * scale: null;
    (keys[68] && mapInfo.x < 9000) ? mapInfo.x += -10 * scale: null;
    if (keys[61] && scale > 0.5) {
        draw.scale(1.1, 1.1);
        scale /= 1.1;
    }
    if (keys[173] && scale < 13) {
        draw.scale(1 / 1.1, 1 / 1.1);
        scale /= 1 / 1.1;
    }
}

function translate(x1, y1, x2, y2) {
    return [x1 + x2, y1 + y2, 1];
}

async function updateOsDraw() {
    osDraw.drawImage(mixed2dC,0,0);
    osDraw.drawImage(mixed3dC,0,0);
}