class Unit {
    constructor(level, type, start, speed) {
        this.start = start;
        this.type = type;
        this.level = level;
        this.speed = speed;
    }

}

function finder(x1, y1, x2, y2) {
    allow = ["Grassland", "Forest", "Desert"]; // Tiles where units travel normally

    let grid = new PF.Grid(256, 256);
    for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {
            grid.setWalkableAt(i, j, allow.indexOf(map.matrix[i][j]));
        }
    }

    let findery = new PF.AStarFinder();
    let found = findery.findPath(x1, y1, x2, y2, grid);
    console.log(found)
    osDraw2.strokeStyle = "rgb(51, 51, 51)";
    osDraw2.lineWidth = 100;
    osDraw2.beginPath();
    let hConst = osC2.height/256;
    let wConst = osC2.width/256;
    osDraw2.moveTo(x1*wConst, y1*hConst);
    for (let i = 0; i < found.length; i++) {
        osDraw2.lineTo(found[i][0]*wConst, found[i][1]*hConst);
    }
    osDraw2.stroke();
    // // DIJSTRAS ALGORITHM
    // let set = [];
    // let current = [x1, y1];
    // for (let i = 0; i < map.rows; i++) { //Fill the set of grid squares
    //     for (let j = 0; j < map.cols; j++) {
    //         if (i == x1 && j == y1) {
    //             set.push([i, j, 0, false]);
    //         } else {
    //             set.push([i, j, Infinity, false])
    //         }
    //     }
    // }
    // if (!set[getElem(current[0] - 1, current[1])][4] && set[getElem(current[0] - 1, current[1])][3] > set[getElem(current[0], current[1])][3] + 1 && (allow.indexOf(map.matrix[current[0] - 1][current[1]]) > -1)) { // Test whether to replace distance value
    //     set[getElem(current[0] - 1)] = set[getElem(current[0], current[1])[3]] + 1; // Replace distance value
    // }
    // if (!set[getElem(current[0] + 1, current[1])][4] && set[getElem(current[0] + 1, current[1])][3] > set[getElem(current[0], current[1])][3] + 1 && (allow.indexOf(map.matrix[current[0] + 1][current[1]]) > -1)) { // Test whether to replace distance value
    //     set[getElem(current[0] - 1)] = set[getElem(current[0], current[1])[3]] + 1; // Replace distance value
    // }
    // if (!set[getElem(current[0], current[1] - 1)][4] && set[getElem(current[0], current[1] - 1)][3] > set[getElem(current[0], current[1])][3] + 1 && (allow.indexOf(map.matrix[current[0]][current[1] - 1]) > -1)) { // Test whether to replace distance value
    //     set[getElem(current[0] - 1)] = set[getElem(current[0], current[1])[3]] + 1; // Replace distance value
    // }
    // if (!set[getElem(current[0], current[1] + 1)][4] && set[getElem(current[0], current[1] + 1)][3] > set[getElem(current[0], current[1])][3] + 1 && (allow.indexOf(map.matrix[current[0]][current[1] + 1]) > -1)) { // Test whether to replace distance value
    //     set[getElem(current[0] - 1)] = set[getElem(current[0], current[1])[3]] + 1; // Replace distance value
    // }
}