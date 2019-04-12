let drawLoopy = true;

let rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
let getRandomItem = function (list, weight) {
    let total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });

    let random_num = rand(0, total_weight);
    let weight_sum = 0;
    //console.log(random_num)

    for (let i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return i;
        }
    }
};

let generateMatrix = (rows,cols)=>{
    let matrix = []
    for(let i=0;i<rows;i++) {
        let thisRow = [];
        for(let j=0;j<cols;j++) {
            thisRow.push(null);
        } 
        matrix.push(thisRow);
    } 
    return matrix;
};

class Mapper {
    constructor(rows, cols, distributionArray) {
        this.terrain_types = ["Grassland", "Forest", "Ocean", "Desert", "Mountains", "River", "City - center", "City - suburb", "City - sparse"];
        this.rows = rows;
        this.cols = cols;
        this.rivers = generateMatrix(this.rows,this.cols);
        this.cities = generateMatrix(this.rows,this.cols);
        this.matrix = generateMatrix(this.rows,this.cols);
        this.highlighted = [null,null];
        this.distrib = distributionArray || [1, 1, 1, 1, 1];
        let matrixNew = generateMatrix(this.rows,this.cols);
        this.randomize();
        //takes randomized map and tries to put some sense into it
        for (let sigh = 0; sigh < 5; sigh++) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let index = () => {
                        let surrounding = this.surrounding(i, j);
                        let output;
                        let probability = [0, 0, 0, 0, 0];
                        let count = [0, 0, 0, 0, 0];
                        for (let k = 0; k < surrounding.length; k++) {
                            switch (surrounding[k]) {
                                case "Grassland":
                                    probability[0] += 35;
                                    count[0] += 1;
                                    break;
                                case "Forest":
                                    (count[1] > 2) ? probability[1] += 80: probability[1] += 25;
                                    count[1] += 1;
                                    break;
                                case "Ocean":
                                    (count[2] > 2) ? probability[2] += 1000: probability[2] += 10;
                                    count[2] += 1;
                                    break;
                                case "Desert":
                                    (count[3] > 4) ? probability[3] += 500: null;
                                    (count[3] > 3) ? probability[3] += 500: null;
                                    (count[3] > 1) ? probability[3] += 70: probability[3] += 20;
                                    count[3] += 1;
                                    break;
                                case "Mountains":
                                    (k == 0 || k == 4) ? probability[4] += 100: null;
                                    count[4] += 1;
                                    break;
                            }
                            // console.log(probability);
                        }
                        output = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 4), probability);
                        return output;
                    };
                    matrixNew[i][j] = this.terrain_types[index()];
                }
            }
            this.matrix = matrixNew;
        }
    }
    draw(canvasContext) {
        let canvas = document.querySelector('canvas');
        if (canvasContext == osDraw) {
            canvas = document.getElementById('off-screen-canvas')
        } else if (canvasContext == osDraw2) {
            canvas = document.getElementById('off-screen-canvas-2');
        } else if (canvasContext == osDraw3) {
            canvas = document.getElementById('off-screen-canvas-3');
        } else {
            canvasContext = draw;
        } // if no canvasContext is given, automatically draws on the visible canvas

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                switch (this.matrix[i][j]) {
                    case "Grassland":
                        canvasContext.drawImage(assets.find((element) => element.name === "Grassland").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Forest":
                        canvasContext.drawImage(assets.find((element) => element.name === "Forest").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Ocean":
                        canvasContext.drawImage(assets.find((element) => element.name === "Ocean").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Desert":
                        canvasContext.drawImage(assets.find((element) => element.name === "Desert").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Mountains":
                        canvasContext.fillStyle = "rgb(200,200,200)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
                switch (this.rivers[i][j]) {
                    case "River":
                        canvasContext.fillStyle = "rgb(0,0,200)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
                switch (this.cities[i][j]) {
                    case "City - center":
                        canvasContext.drawImage(assets.find((element) => element.name === "Test_image1").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "City - suburb":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "City - sparse":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
                canvasContext.strokeStyle = "rgb(51, 51, 51)";
                canvasContext.lineWidth = 2;
                canvasContext.strokeRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
            }
        }
    }
    // checks the surrounding hexes of a point and returns an array
    surrounding(row, col) {
        // pushes in a clockwise order
        let output = [];
        try {
            output.push(this.matrix[row - 1][col])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row - 1][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col - 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row][col - 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row - 1][col - 1])
        } catch (err) {
            output.push(null);
        }
        return output;
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let index = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 4), this.distrib);
                this.matrix[i][j] = this.terrain_types[index];
            }
        }
    }
    setCity(row, col, tier) {
        this.cities[row][col] = this.terrain_types.slice(6, 9)[tier - 1];
    }
    whichSquare(x,y,unshifted) {
        (unshifted !== false) ? unshifted = true : unshifted = false;
        let row,col;
        if (unshifted == true) {
            row = Math.floor((this.rows/8000)*x); // how many boxes along the x axis;
            col = Math.floor((this.cols/8000)*y); // how many boxes along the y axis;
        } else {
            let coor = [x,y,1];
            let matrixI = [
                [0.5237827897071838,1.0878565311431885,-3998.033935546875],
                [-0.5237827897071838,1.0878565311431885,3998.033935546875],
                [0,0,1]
            ];
            let point = [0,0,1];
            for (let i=0;i<3;i++) {
                for (let j=0;j<3;j++) {
                    point[i] += matrixI[i][j]*coor[j];
                }
                if (i==0) {
                    point[i] += 4000;
                } else if (i==1) {
                    point[i] += -4000;
                }
            }
            let square = [Math.floor((this.rows/8000)*point[0]),Math.floor((this.rows/8000)*point[1])];
            row = square[0];
            col = square[1];
        }
        return [row,col];
    }
    highlight(row,col) {            
        mixed2dDraw.drawImage(osC2,0,0);
        mixed2dDraw.strokeStyle = "rgb(153, 255, 255)";
        mixed2dDraw.lineWidth = (scale/2)+5;
        if (this.highlighted != [row,col]) {
            this.highlighted = [row,col];
            mixed2dDraw.strokeRect(row * mixed2dC.width / this.rows, col * mixed2dC.height / this.cols, mixed2dC.width / this.rows, mixed2dC.height / this.cols);
        } else {
            this.highlighted == [null,null];
        }
        osDraw.drawImage(mixed2dC,0,0);
    }
}