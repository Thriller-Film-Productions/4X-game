class Unit {
    constructor(level, type, start, speed) {
        this.start = start;
        this.type = type;
        this.level = level;
        this.speed = speed;
    }

}

function finder(x1, y1, x2, y2, allow) {
    /*
     x1 and y1 are the coordinates of the start position
     x2 and y2 are the end coordinates
     Allow is an array of all tiles that can be walked on
    */
    let grid = new PF.Grid(256, 256);
    for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {
            grid.setWalkableAt(i, j, allow.indexOf(map.matrix[i][j]) > -1);
        }
    }

    let findery = new PF.AStarFinder();
    let found = findery.findPath(x1, y1, x2, y2, grid);
    // console.log(found)
    mixed2dDraw.strokeStyle = "rgb(51, 51, 51)";
    mixed2dDraw.lineWidth = 5;
    mixed2dDraw.beginPath();
    let hConst = mixed2dC.height / 256;
    let wConst = mixed2dC.width / 256;
    mixed2dDraw.moveTo(x1 * wConst+wConst/2, y1 * hConst+hConst/2);
    for (let i = 0; i < found.length; i++) {
        mixed2dDraw.lineTo(found[i][0] * wConst+wConst/2, found[i][1] * hConst+hConst/2);
    }
    mixed2dDraw.stroke();
}

setInterval(() => {
    if (map.highlighted[0]) {
        let t = translate((mouseX - (c.width / 2))*scale, (mouseY - (c.height / 2))*scale, -mapInfo.x, -mapInfo.y + (osC.height / 2)); // Inverts translation
        let out = map.whichSquare(t[0], t[1], false);
        // mixed2dDraw.drawImage(osC2, 0, 0);
        map.highlight(map.highlighted[0], map.highlighted[1])
        finder(map.highlighted[0], map.highlighted[1], out[0], out[1], ["Grassland", "Desert", "Forest"]);
        osDraw.drawImage(mixed2dC, 0, 0);
    }
}, 500)