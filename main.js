// define global variables and run setup
let scale = 1;
let map; // testing
let mapInfo = {
    x: 0,
    y: 0,
    scale: 1
};

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
        let t0 = performance.now();
        let t = translate((ev.clientX - (c.width / 2))*scale, (ev.clientY - (c.height / 2))*scale, -mapInfo.x, -mapInfo.y + (osC.height / 2)); // Inverts translation
        let matrixI = [
            [0.5237827897071838,1.0878565311431885,-3998.033935546875],
            [-0.5237827897071838,1.0878565311431885,3998.033935546875],
            [0,0,1]
        ];
        let point = [0,0,1];
        for (let i=0;i<3;i++) {
            for (let j=0;j<3;j++) {
                point[i] += matrixI[i][j]*t[j];
            }
            if (i==0) {
                point[i] += 4000;
            } else if (i==1) {
                point[i] += -4000;
            }
        }
        let square = map.whichSquare(point[0],point[1]);
        map.highlight(square[0],square[1]);
        let t1 = performance.now();
        console.log(t1-t0);
    });
    // load img assets into array in background
    window.addEventListener('load', () => {
        setupAssets();
        map = new Mapper(256, 256,[1.5, 1.3, 1.7, 0.5, 1]); // [grassland, forest, ocean, desert, mountains]
        drawMap();
        draw.translate(c.width / 2, c.height / 2);
        requestAnimationFrame(drawLoop);
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
}

function drawMap() {
    map.draw(osDraw2);
    osDraw.drawImage(osC2, 0, 0);
}

function drawLoop() {
    draw.clearRect(-osC.width, -osC.height, osC.width * 10, osC.height * 10);
    draw.drawImage(osC, (-osC.width / 2) + mapInfo.x, (-osC.height / 2) + mapInfo.y);
    draw.drawImage(osChighlight, (-osC.width / 2) + mapInfo.x, (-osC.height / 2) + mapInfo.y);
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